#!/usr/bin/env python3

import irc.bot
import pymongo
import time

from config import config

class Avalon(irc.bot.SingleServerIRCBot):
    def __init__(self, channel_list, nickname, irc_server, irc_port,
        db_name, db_server, db_port, db_auth, db_user, db_pwd):

        irc.bot.SingleServerIRCBot.__init__(self, [(irc_server, irc_port)], nickname, nickname)        
        self.channel_list = channel_list        
        if not db_auth:
            self.db = pymongo.MongoClient(db.server, db.port)[db_name]
        else:
            self.db = pymongo.MongoClient('mongodb://%s:%s@%s:%s/%s' %
                (db_user, db_pwd, db_server, db_port, db_name))[db_name]
        
    def on_nicknameinuse(self, c, e):
        c.nick(c.get_nickname() + "_")

    def on_welcome(self, c, e):
        for channel in self.channel_list:            
            c.join(channel)

    def on_privmsg(self, c, e):        
        c.privmsg(e.source.split('!')[0], 'Sorry, this bot is for log only.')

    def on_pubmsg(self, c, e):
        now = time.localtime()        
        self.db.my_collection.insert_one({
            'channel': e.target,
            'date': '%s-%s-%s' % (now.tm_year, now.tm_mon, now.tm_mday),
            'time': '%s:%s:%s' % (now.tm_hour, now.tm_min, now.tm_sec),
            'nick': e.source.split('!')[0],
            'message': e.arguments[0]
        })

if __name__ == '__main__':
    bot = Avalon(config.channel_list, config.nickname, config.irc_server,
        config.irc_port, config.db_name, config.db_server, config.db_port,
        config.db_auth, config.db_user, config.db_pwd)
    bot.start()
