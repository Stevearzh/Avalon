import pydle
import pymongo
import time
import os

pydle.Client.RECONNECT_MAX_ATTEMPTS = 1000

class Logbot(pydle.Client):
    def __init__(self, channel_list, nickname, irc_server, irc_port, 
        db_name, db_multi=False, db_server='localhost', db_port=27017,
        db_auth=False, db_user='', db_pwd='', time_zone=False):

        pydle.Client.__init__(self, nickname)
        pydle.Client.connect(self, irc_server, irc_port)

        self.channel_list = channel_list
        self.nickname = nickname
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

    def on_connect(self):
        for channel in self.channel_list:
            self.join(channel)

    def on_message(self, source, target, message):
        now = time.localtime()

        # use multi tables in mongodb
        if self.db_multi:
            self.db = self.access_db(self.db_server, self.db_port, self.db_name,
                '%s:%d-%d' % (self.db_name, now.tm_year, now.tm_mon),
                self.db_auth, self.db_user, self.db_pwd)

        # make sure it's not a privmsg
        if source != self.nickname:
            self.db.my_collection.insert_one({
                'channel': source,
                'date': '%s-%s-%s' % (now.tm_year, now.tm_mon, now.tm_mday),
                'time': '%s:%s:%s' % (now.tm_hour, now.tm_min, now.tm_sec),
                'nick': target,
                'message': message
            })
        else:
            self.message(target, 'Sorry, this bot is for log only.')
