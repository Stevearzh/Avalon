# df should be a pandas DataFrame
def top_n_talkaholic(n, df):
    new_df = df.groupby(['nick']).size().reset_index(name='times').sort_values(['times'], ascending=[False])
    return new_df.iloc[:n].reset_index()[['nick', 'times']]
