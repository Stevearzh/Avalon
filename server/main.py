import tornado.web

from .api.channels import ChannelHandler
from .api.times import TimesHandler
from .api.log import LogHandler

def make_app(config):
    return tornado.web.Application([
        (r'/api/channels', ChannelHandler(config.showed_channels)),
        (r'/api/times', TimesHandler(config)),
        (r'/api/irc-logs', LogHandler(config)),
        (r'^/(?!api/)(.*)$', tornado.web.StaticFileHandler, {
        	'path': config.public_root,
        	'default_filename': 'index.html'
        })
    ], **config.server_settings)
