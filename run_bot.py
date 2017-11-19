#!/usr/bin/env python3

from bot.logbot import Logbot
from config import config

bot = Logbot(config.channel_list, config.nickname, config.irc_server,
    config.irc_port, config.db_name, config.db_multi, config.db_server,
    config.db_port, config.db_auth, config.db_user, config.db_pwd, config.time_zone)
bot.start()
