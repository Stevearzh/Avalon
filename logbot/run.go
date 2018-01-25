package logbot

import (
	"fmt"
	"log"
	"strings"
	"time"

	irc "github.com/fluffle/goirc/client"
	mgo "gopkg.in/mgo.v2"
)

// Run method init and run the log bot
func (bot *BotType) Run() {
	// init the loc to time_zone
	loc, _ := time.LoadLocation(bot.Mongo.TimeZone)

	// login into mongodb
	mongoSession, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs:    []string{bot.Mongo.Server},
		Timeout:  60 * time.Second,
		Database: bot.Mongo.AuthDb,
		Username: bot.Mongo.User,
		Password: bot.Mongo.Password,
	})
	if err != nil {
		log.Fatalf("Error connect to mongodb: %v\n", err)
	}

	// create new IRC connection
	c := irc.SimpleClient(bot.Irc.Nick, bot.Irc.User)
	c.EnableStateTracking()
	c.HandleFunc("connected", func(conn *irc.Conn, line *irc.Line) {
		for _, channel := range bot.Irc.Channels {
			conn.Join(channel)
		}
	})

	// handle privmsg
	c.HandleFunc(irc.PRIVMSG, func(conn *irc.Conn, line *irc.Line) {
		channel := line.Args[0]
		message := line.Args[1]
		nick := line.Nick
		now := time.Now().In(loc)

		if strings.HasPrefix(channel, "#") {
			mongoCollection := mongoSession.DB(bot.Mongo.IrcDb).C(now.Format("2006-01"))
			err := mongoCollection.Insert(&MessageType{
				Channel: channel,
				Date:    string(now.Format("2006-01-02")),
				Time:    string(now.Format("15:04:05")),
				Nick:    nick,
				Message: message,
			})

			if err != nil {
				log.Printf("Error save msg into mongodb: %v\n", err)
			}

			log.Printf("MESSAGE: %s %s: %s\n", channel, nick, message)
		} else {
			conn.Privmsg(nick, "Sorry, this bot is for log only.")
		}
	})

	// setup a ticker to ping server per n seconds
	ticker := time.NewTicker(bot.Irc.Ping * time.Second)
	go func() {
		for range ticker.C {
			log.Printf("CLIENT PING")
			c.Ping("AM I STILL ONLINE")
		}
	}()

	// Set up a handler to notify of disconnect events.
	quit := make(chan bool)
	c.HandleFunc("disconnected", func(conn *irc.Conn, line *irc.Line) {
		log.Printf("Disconnect from irc server: %s\n", bot.Irc.Server)
		quit <- true
	})

	// print server ping log
	c.HandleFunc(irc.PING, func(conn *irc.Conn, line *irc.Line) {
		log.Println("SERVER PING")
	})

	// print server pong log
	c.HandleFunc(irc.PONG, func(conn *irc.Conn, line *irc.Line) {
		log.Println("SERVER PONG")
	})

	for true {
		// connect to server
		if err := c.ConnectTo(bot.Irc.Server); err != nil {
			fmt.Printf("Connection error: %s\n", err)
		}

		// wait on quit channel
		<-quit
	}
}
