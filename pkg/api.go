package pkg

import (
	"encoding/json"
	"net/http"
)

type API_RESPONSE struct {
	Err  string      `json:"err"`
	Code int         `json:"code"`
	Data interface{} `json:"data"`
}

// do json and write it
func doJS(w http.ResponseWriter, data interface{}) {
	js, _ := json.Marshal(data)
	w.Header().Set("Content-Type", "Application/json")
	w.Write(js)
}
