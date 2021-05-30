package main

import (
	"comics15/pkg"
	"os"

	"crypto/tls"
	"fmt"
	"net/http"
	"time"
)

func main() {
	port := os.Getenv("PORT")
	app := pkg.InitProg()

	if port != "" {
		app.Port = port
	}

	app.ILog.Println("initialization completed!")

	// server
	srv := http.Server{
		Addr:         ":" + app.Port,
		ErrorLog:     app.ELog,
		Handler:      app.SetRoutes(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
		TLSConfig: &tls.Config{
			PreferServerCipherSuites: true,
			CurvePreferences:         []tls.CurveID{tls.X25519, tls.CurveP256},
			CipherSuites: []uint16{tls.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
				tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, tls.TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305, tls.TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305},
		},
	}

	fmt.Println("server listening on port:", app.Port)
	app.ILog.Println("server listening on port:", app.Port)

	if app.IsHeroku {
		app.ELog.Fatal(srv.ListenAndServe())
		return
	}
	app.ELog.Fatal(srv.ListenAndServeTLS("./tls/cert.pem", "./tls/key.pem"))
}
