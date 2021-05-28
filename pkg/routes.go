package pkg

import "net/http"

func (app *Application) SetRoutes() http.Handler {
	appMux := http.NewServeMux()
	appMux.HandleFunc("/", app.HIndex)

	// api routes
	apiMux := http.NewServeMux()
	apiMux.HandleFunc("/", app.HIndex)
	apiMux.HandleFunc("/news", app.HNews)
	appMux.Handle("/api/", http.StripPrefix("/api", apiMux))

	// assets define
	assets := http.FileServer(http.Dir("assets"))
	appMux.Handle("/assets/", http.StripPrefix("/assets/", assets))

	// middlewares
	muxHanlder := app.AccessLogMiddleware(appMux)
	muxHanlder = app.SecureHeaderMiddleware(muxHanlder)
	return muxHanlder
}
