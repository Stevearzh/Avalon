package main

import (
	"flag"
	"fmt"
	"strings"

	irc "github.com/fluffle/goirc/client"
)

var host *string = flag.String("host", "irc.freenode.net:8000", "IRC server")
var channel *string = flag.String("channel", "#linuxba", "IRC channel")

func main() {
	flag.Parse()

	// create new IRC connection
	c := irc.SimpleClient("GoBzzzt", "bzzzt")
	c.EnableStateTracking()
	c.HandleFunc("connected",
		func(conn *irc.Conn, line *irc.Line) { conn.Join(*channel) })

	// Set up a handler to notify of disconnect events.
	quit := make(chan bool)
	c.HandleFunc("disconnected",
		func(conn *irc.Conn, line *irc.Line) { quit <- true })

	// handle privmsg
	c.HandleFunc(irc.PRIVMSG, func(conn *irc.Conn, line *irc.Line) {
		channel := line.Args[0]
		message := line.Args[1]
		nick := line.Nick
		time := line.Time

		if strings.HasPrefix(channel, "#") {
			fmt.Printf("%d-%d-%d %d:%d:%d\n", time.Year(), time.Month(), time.Day(), time.Hour(), time.Minute(), time.Second())
			fmt.Printf("%s@%s: %s\n\n", nick, channel, message)
		} else {
			conn.Privmsg(nick, "Sorry, this bot is for log only.")
		}
	})

	reallyquit := false

	for !reallyquit {
		// connect to server
		if err := c.ConnectTo(*host); err != nil {
			fmt.Printf("Connection error: %s\n", err)
			return
		}

		// wait on quit channel
		<-quit
	}
}
