import pandas
from functools import reduce

from ..utils import access_db, last_week

def last_week_data(channel, server, port, name, user, pwd):
    def date_db(year, month, day):
        db = access_db(server, port, name, '%s:%s-%s' % (name, year, month), user, pwd)
        return db.my_collection.find({ 'date': '%s-%s-%s' % (year, month, day), 'channel': channel })

    def db_append(host, nd):
        result = host.append(pandas.DataFrame(nd), ignore_index=True)
        return result

    days_list = last_seven_days()

    d0 = days_list[0]
    init_df = pandas.DataFrame(list(date_db(d0.year, d0.month, d0.day)))
    df = reduce(lambda rd, d: db_append(rd, list(date_db(d.year, d.month, d.day))), days_list[1:], init_df)
    return df[['channel', 'date', 'time', 'nick', 'message']]

def top_n_talkaholic(n, df):
    new_df = df.groupby(['nick']).size().reset_index(name='times').sort_values(['times'], ascending=[False])
    return new_df.iloc[:n].reset_index()[['nick', 'times']]
