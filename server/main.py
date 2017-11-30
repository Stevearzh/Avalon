import tornado.web

from .api.channels import ChannelHandler
from .api.times import TimesHandler
from .api.log import LogHandler

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Welcome to Avalon!")

def make_app(config):
    return tornado.web.Application([
        (r'/', MainHandler),
        (r'/api/channels', ChannelHandler(config.showed_channels)),
        (r'/api/times', TimesHandler(config)),
        (r'/api/log', LogHandler(config))
    ])
