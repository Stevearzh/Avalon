package logbot

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"

	"gopkg.in/yaml.v2"

	irc "github.com/fluffle/goirc/client"
)

// LogBot is the log bot type
type Bot struct{}

// yaml type
type config struct {
	Logbot struct {
		Nick     string   `yaml:"nick"`
		User     string   `yaml:"user"`
		Server   string   `yaml:"server"`
		Channels []string `yaml:"channels"`
	}
}

func (c *config) getConf(path string) *config {
	yamlFile, err := ioutil.ReadFile(path)
	if err != nil {
		log.Printf("yamlFile.Get err   #%v ", err)
	}
	err = yaml.Unmarshal(yamlFile, c)
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}

	return c
}

// Run method init and run the log bot
func (bot *Bot) Run(confPath string) {
	var conf config
	conf.getConf(confPath)

	// create new IRC connection
	c := irc.SimpleClient(conf.Logbot.Nick, conf.Logbot.User)
	c.EnableStateTracking()
	c.HandleFunc("connected", func(conn *irc.Conn, line *irc.Line) {
		for _, channel := range conf.Logbot.Channels {
			fmt.Printf("Join channel %s\n", channel)
			conn.Join(channel)
		}
	})

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
		if err := c.ConnectTo(conf.Logbot.Server); err != nil {
			fmt.Printf("Connection error: %s\n", err)
			return
		}

		// wait on quit channel
		<-quit
	}
}
