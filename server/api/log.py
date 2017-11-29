import os
import time
import pymongo
import tornado.web
from tornado.escape import json_encode

def access_db(self, server, port, name, table, auth, user, pwd):
    if not auth:
        return pymongo.MongoClient('mongodb://%s:%s/%s' %
            (server, port, name))[table]
    else:
        return pymongo.MongoClient('mongodb://%s:%s@%s:%s/%s' %
            (user, pwd, server, port, name))[table]

def LogHandler(config):
	
	class LogClass(tornado.web.RequestHandler):

	return LogClass
