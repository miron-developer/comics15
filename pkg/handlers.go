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
		w.Header().Set("Access-Control-Allow-Origin", "*")
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
		app.eHandler(w, app.parseHTMLFiles(w, "index.html", nil), "Can't load this page", 500)
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
