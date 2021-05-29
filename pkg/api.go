package pkg

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

type API_RESPONSE struct {
	Err  string      `json:"err"`
	Code int         `json:"code"`
	Data interface{} `json:"data"`
}

const SERVICE_URI = "https://xkcd.com/ID/info.0.json"

// do json and write it
func doJS(w http.ResponseWriter, data interface{}) {
	js, _ := json.Marshal(data)
	w.Header().Set("Content-Type", "Application/json")
	w.Write(js)
}

func (app *Application) GetComics(w http.ResponseWriter, r *http.Request) (interface{}, error) {
	if _, e := strconv.Atoi(r.FormValue("id")); e != nil {
		return nil, errors.New("wrong comics id")
	}

	rq, e := http.Get(strings.Replace(SERVICE_URI, "ID", r.FormValue("id"), 1))
	if e != nil || rq.StatusCode != 200 {
		return nil, errors.New("service not response")
	}

	body, e := ioutil.ReadAll(rq.Body)
	if e != nil {
		return nil, errors.New("wrong comics id")
	}
	return string(body), nil
}
