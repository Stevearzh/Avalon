package main

import (
	"io/ioutil"
	"log"

	"github.com/Stevearzh/Avalon/logbot"
	"gopkg.in/yaml.v2"
)

// yaml type
type configType struct {
	Irc struct {
		Nick     string   `yaml:"nick"`
		User     string   `yaml:"user"`
		Server   string   `yaml:"server"`
		Channels []string `yaml:"channels"`
	} `yaml:"irc"`
	Mongo struct {
		Server   string `yaml:"server"`
		User     string `yaml:"user"`
		Password string `yaml:"password"`
		AuthDb   string `yaml:"auth_db"`
		IrcDb    string `yaml:"irc_db"`
		TimeZone string `yaml:"time_zone"`
	} `yaml:"mongo"`
}

func (c *configType) getConf(path string) *configType {
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

func main() {
	var config configType
	config.getConf("./config/config.yaml")

	bot := logbot.Bot(config)
	bot.Run()
}
