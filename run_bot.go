package main

import "./bot"

func main() {
	var bot logbot.Bot
	bot.Run("./config/config.yaml")
}
