package logbot

import (
	"fmt"
	"strings"
	"time"

	irc "github.com/fluffle/goirc/client"
	"github.com/go-mgo/mgo"
	"github.com/go-mgo/mgo/bson"
)

// Bot basic
type Bot struct {
	Irc struct {
		Nick     string
		User     string
		Server   string
		Channels []string
	}
	Mongo struct {
		Server   string
		User     string
		Password string
		AuthDb   string
		IrcDb    string
		TimeZone string
	}
}

// message saved into mongodb
type message struct {
	ID      bson.ObjectId `bson:"_id,omitempty"`
	Channel string        `bson:"channel"`
	Date    string        `bson:"date"`
	Time    string        `bson:"time"`
	Nick    string        `bson:"nick"`
	Message string        `bson:"message"`
}

// Run method init and run the log bot
func (bot *Bot) Run() {
	// init the loc to UTC+8
	loc, _ := time.LoadLocation(bot.Mongo.TimeZone)

	// login into mongodb
	mongoSession, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs:    bot.Mongo.Server,
		Timeout:  60 * time.Second,
		Database: bot.Mongo.AuthDb,
		Username: bot.Mongo.User,
		Password: bot.Mongo.Password,
	})

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
		time := time.Now().In(loc)

		if strings.HasPrefix(channel, "#") {
			mongoCollection := mongoSession.DB(bot.Mongo.IrcDb).C(strings.Join(time.Year(), "-", time.Month()))
			mongoCollection.Insert(&message{
				Channel: channel,
				Date:    string.Join(time.Year(), "-", time.Month(), "-", time.Day()),
				Time:    string.Join(time.Hour(), ":", time.Minute(), ":", time.Second()),
				Nick:    nick,
				Message: message,
			})
		} else {
			conn.Privmsg(nick, "Sorry, this bot is for log only.")
		}
	})

	// Set up a handler to notify of disconnect events.
	quit := make(chan bool)
	c.HandleFunc("disconnected",
		func(conn *irc.Conn, line *irc.Line) { quit <- true })

	for true {
		// connect to server
		if err := c.ConnectTo(bot.Irc.Server); err != nil {
			fmt.Printf("Connection error: %s\n", err)
			return
		}

		// wait on quit channel
		<-quit
	}
}
