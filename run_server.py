#!/usr/bin/env python3
import tornado.ioloop
import yaml

from server.main import make_app

# change dict to object
class obj(object):
    def __init__(self, d):
        for a, b in d.items():
            if isinstance(b, (list, tuple)):
               setattr(self, a, [obj(x) if isinstance(x, dict) else x for x in b])
            else:
               setattr(self, a, obj(b) if isinstance(b, dict) else b)

with open('config/config.yaml') as f:
    read_data = f.read()
config = obj(yaml.load(read_data))

app = make_app(config)
app.listen(config.server.port)
tornado.ioloop.IOLoop.current().start()
