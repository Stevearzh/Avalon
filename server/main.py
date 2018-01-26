import os
import tornado.web

from .api.channels import ChannelHandler
from .api.times import TimesHandler
from .api.log import LogHandler

def RootHandler(config):
    class RootClass(tornado.web.RequestHandler):
        def get(self, *args):
            self.render('index.html')
    return RootClass

def make_app(config):
    return tornado.web.Application([
        (r'/api/channels', ChannelHandler(config.server.channels)),
        (r'/api/times', TimesHandler(config)),
        (r'/api/irc-logs', LogHandler(config)),        
        (r'/dist/(.*)', tornado.web.StaticFileHandler, {
        	'path': os.path.join(os.path.dirname(__file__), config.server.dist)
        }),
        (r'/(.*)', RootHandler(config)),
    ], **dict(
        debug=True,
        static_path=os.path.join(os.path.dirname(__file__), config.server.public),
        template_path=os.path.join(os.path.dirname(__file__), config.server.public)
    ))
