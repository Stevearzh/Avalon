#!/usr/bin/env python3
import tornado.ioloop

from config import config
from server.main import make_app

app = make_app(config)
app.listen(config.server_port)
tornado.ioloop.IOLoop.current().start()
