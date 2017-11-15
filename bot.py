#!/usr/bin/env python3

import irc.bot
import pymongo
import time
import os

from config import config

class Avalon(irc.bot.SingleServerIRCBot):
    def __init__(self, channel_list, nickname, irc_server, irc_port, db_name,
        db_multi=False, db_server='localhost', db_port=27017, db_auth=False,
        db_user='', db_pwd='', time_zone=False):

        irc.bot.SingleServerIRCBot.__init__(self, [(irc_server, irc_port)], nickname, nickname)

        self.channel_list = channel_list
        self.db_name = db_name
        self.db_multi = db_multi
        self.db_server = db_server
        self.db_port = db_port
        self.db_auth = db_auth
        self.db_user = db_user
        self.db_pwd = db_pwd

        # set timezone
        if time_zone:
            os.environ['TZ'] = time_zone
            # Actually set TZ
            time.tzset()

        # use single table in mongodb
        self.db = self.access_db(db_server, db_port, db_name, db_name, db_auth, db_user, db_pwd)

    def access_db(self, server, port, name, table, auth, user, pwd):
        if not auth:
            return pymongo.MongoClient('mongodb://%s:%s/%s' %
                (server, port, name))[table]
        else:
            return pymongo.MongoClient('mongodb://%s:%s@%s:%s/%s' %
                (user, pwd, server, port, name))[table]

    def on_nicknameinuse(self, c, e):
        c.nick(c.get_nickname() + "_")

    def on_welcome(self, c, e):
        for channel in self.channel_list:
            c.join(channel)

    def on_privmsg(self, c, e):
        c.privmsg(e.source.split('!')[0], 'Sorry, this bot is for log only.')

    def on_pubmsg(self, c, e):
        now = time.localtime()

        # use multi tables in mongodb
        if self.db_multi:
            self.db = self.access_db(self.db_server, self.db_port, self.db_name,
                '%s:%d-%d' % (self.db_name, now.tm_year, now.tm_mon),
                self.db_auth, self.db_user, self.db_pwd)

        self.db.my_collection.insert_one({
            'channel': e.target,
            'date': '%s-%s-%s' % (now.tm_year, now.tm_mon, now.tm_mday),
            'time': '%s:%s:%s' % (now.tm_hour, now.tm_min, now.tm_sec),
            'nick': e.source.split('!')[0],
            'message': e.arguments[0]
        })

if __name__ == '__main__':
    bot = Avalon(config.channel_list, config.nickname, config.irc_server,
        config.irc_port, config.db_name, config.db_multi, config.db_server,
        config.db_port, config.db_auth, config.db_user, config.db_pwd, config.time_zone)
    bot.start()
