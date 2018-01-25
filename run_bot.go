package main

import "github.com/Stevearzh/Avalon/logbot"

func main() {
	var bot logbot.BotType

	bot.GetConf("./config/config.yaml")
	bot.Run()
}
