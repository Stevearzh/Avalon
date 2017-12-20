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
        (r'/api/channels', ChannelHandler(config.showed_channels)),
        (r'/api/times', TimesHandler(config)),
        (r'/api/irc-logs', LogHandler(config)),        
        (r'/dist/(.*)', tornado.web.StaticFileHandler, {
        	'path': config.dist_path
        }),
        (r'/(.*)', RootHandler(config)),
    ], **config.server_settings)
