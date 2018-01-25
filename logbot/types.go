package logbot

import (
	"io/ioutil"
	"log"
	"time"

	"gopkg.in/mgo.v2/bson"
	yaml "gopkg.in/yaml.v2"
)

type ircType struct {
	Nick     string        `yaml:"nick"`
	User     string        `yaml:"user"`
	Server   string        `yaml:"server"`
	Channels []string      `yaml:"channels"`
	Ping     time.Duration `yaml:"ping"`
}

type mongoType struct {
	Server   string `yaml:"server"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	AuthDb   string `yaml:"auth_db"`
	IrcDb    string `yaml:"irc_db"`
	TimeZone string `yaml:"time_zone"`
}

// BotType is basic bot type
type BotType struct {
	Irc   ircType   `yaml:"irc"`
	Mongo mongoType `yaml:"mongo"`
}

// MessageType saved into mongodb
type MessageType struct {
	ID      bson.ObjectId `bson:"_id,omitempty"`
	Channel string        `bson:"channel"`
	Date    string        `bson:"date"`
	Time    string        `bson:"time"`
	Nick    string        `bson:"nick"`
	Message string        `bson:"message"`
}

// GetConf read config yaml file
func (c *BotType) GetConf(path string) *BotType {
	yamlFile, err := ioutil.ReadFile(path)
	if err != nil {
		log.Fatalf("yamlFile.Get err   #%v\n", err)
	}

	err = yaml.Unmarshal(yamlFile, c)
	if err != nil {
		log.Fatalf("Unmarshal: %v\n", err)
	}

	return c
}
