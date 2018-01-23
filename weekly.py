#!/usr/bin/env python3

from server.statistic.basic import last_week_data, top_n_talkaholic
from config.mask import mask_dict
from config import config

af = last_week_data('#linuxba', config.db_server, config.db_port, config.db_name, config.db_user, config.db_pwd, mask_dict)
print(top_n_talkaholic(10, af))
