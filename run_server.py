#!/usr/bin/env python3
import tornado.ioloop

from server.main import make_app

app = make_app()
app.listen(8888)
tornado.ioloop.IOLoop.current().start()
