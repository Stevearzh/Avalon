import re
import pandas
from functools import reduce

from ..utils import access_db, last_week, strip_irc_chars

# close "A value is trying to be set on a copy of a slice from a DataFrame." warning
pandas.options.mode.chained_assignment = None

def last_week_data(channel, server, port, name, user, pwd, mask_dict=None):
    def date_db(year, month, day):
        db = access_db(server, port, name, '%s:%s-%s' % (name, year, month), user, pwd)
        return db.my_collection.find({ 'date': '%s-%s-%s' % (year, month, day), 'channel': channel })

    def db_append(host, nd):
        result = host.append(pandas.DataFrame(nd), ignore_index=True)
        return result

    def get_nick_from_message(message):
        result = re.search(R'^\[(\w+)\]', message)
        return result.group(1) if result else None

    days_list = last_week()

    d0 = days_list[0]
    init_df = pandas.DataFrame(list(date_db(d0.year, d0.month, d0.day)))
    df = reduce(lambda rd, d: db_append(rd, list(date_db(d.year, d.month, d.day))), days_list[1:], init_df)

    # strip special irc chars
    df['message'] = df['message'].map(lambda message: strip_irc_chars(message))

    # get teleboto dataframe
    tdf = df[df['nick'] == 'teleboto']
    tdf['nick'] = tdf['message'].map(lambda message: get_nick_from_message(message)) # real nick
    tdf['message'] = tdf['message'].map(lambda message: re.sub(R'^\[(\w+)\]', '', message).strip()) # remove nick from message
    # write data back
    df['nick'].update(tdf['nick'])
    df['message'].update(tdf['message'])

    # replace mask to real nick
    if mask_dict:
        df['nick'] = df['nick'].map(lambda nick: mask_dict[nick] if nick in mask_dict else nick)
    
    return df[['channel', 'date', 'time', 'nick', 'message']]    

def top_n_talkaholic(n, df):
    new_df = df.groupby(['nick']).size().reset_index(name='times').sort_values(['times'], ascending=[False])
    return new_df.iloc[:n].reset_index()[['nick', 'times']]
