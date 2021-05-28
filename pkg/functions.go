package pkg

import (
	"fmt"
	"html/template"
	"net/http"
)

// write in log each request
func logingReq(r *http.Request) string {
	return fmt.Sprintf("%v %v: '%v'\n", r.RemoteAddr, r.Method, r.URL)
}

// handle error and write it responseWriter
func (app *Application) eHandler(w http.ResponseWriter, e error, msg string, code int) bool {
	if e != nil {
		http.Error(w, msg, code)
		app.ELog.Println(e)
		return true
	}
	return false
}

func (app *Application) parseHTMLFiles(w http.ResponseWriter, file string, data interface{}) error {
	t, e := template.ParseFiles("assets/" + file)
	if e != nil {
		return e
	}
	return t.Execute(w, data)
}
