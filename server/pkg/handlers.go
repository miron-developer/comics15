package pkg

import (
	"errors"
	"net/http"
)

// SecureHeaderMiddleware set secure header option
func (app *Application) SecureHeaderMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("cross-origin-resource-policy", "cross-origin")
		w.Header().Set("X-XSS-Protection", "1;mode=block")
		w.Header().Set("X-Frame-Options", "deny")
		accessOrigin := "http://localhost:8080"
		if app.IsHeroku {
			accessOrigin = "https://comics15.herokuapp.com"
		}
		w.Header().Set("Access-Control-Allow-Origin", accessOrigin)
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		next.ServeHTTP(w, r)
	})
}

// AccessLogMiddleware logging request
func (app *Application) AccessLogMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if app.CurrentRequestCount < app.MaxRequestCount {
			app.CurrentRequestCount++
			app.ILog.Printf(logingReq(r))
			next.ServeHTTP(w, r)
		} else {
			http.Error(w, "service is overloaded", 529)
			app.ELog.Println(errors.New("rate < curl"))
		}
	})
}

// HIndex for handle '/'
func (app *Application) HIndex(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		w.Write([]byte("this is api for comics15"))
	}
}

/* ------------------------------------------- API ------------------------------------------------ */

func (app *Application) HApi(w http.ResponseWriter, r *http.Request, f func(w http.ResponseWriter, r *http.Request) (interface{}, error)) {
	if r.Method == "GET" {
		data := API_RESPONSE{
			Err:  "ok",
			Code: 200,
			Data: "",
		}

		datas, e := f(w, r)
		if e != nil {
			data.Err = e.Error()
			data.Code = 500
		}
		data.Data = datas
		doJS(w, data)
	}
}

// HComics for handle '/api/comics/'
func (app *Application) HComics(w http.ResponseWriter, r *http.Request) {
	app.HApi(w, r, app.GetComics)
}
