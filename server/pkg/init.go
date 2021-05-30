/*
	Initialize app
*/

package pkg

import (
	"log"
	"os"
	"sync"
)

// Application this is app struct and items
type Application struct {
	m                   sync.Mutex
	ELog                *log.Logger
	ILog                *log.Logger
	Port                string
	CurrentRequestCount int
	MaxRequestCount     int
	IsHeroku            bool
}

// InitProg initialise
func InitProg() *Application {
	logFile, _ := os.Create("logs.txt")

	elog := log.New(logFile, "\033[31m[ERROR]\033[0m\t", log.Ldate|log.Ltime|log.Lshortfile)
	info := log.New(logFile, "\033[34m[INFO]\033[0m\t", log.Ldate|log.Ltime|log.Lshortfile)
	info.Println("loggers is done!")

	return &Application{
		ELog:                elog,
		ILog:                info,
		Port:                "4330",
		CurrentRequestCount: 0,
		MaxRequestCount:     1200,
		IsHeroku:            false,
	}
}
