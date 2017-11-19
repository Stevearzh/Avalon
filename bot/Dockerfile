From python:3.6.1

RUN mkdir /avalon && mkdir /avalon/bot
ADD bot/requirements.txt /avalon
ADD bot/logbot.py /avalon/bot
ADD run_bot.py /avalon


WORKDIR /avalon
RUN pip install -r requirements.txt

CMD ["sh", "-c", "./run_bot.py"]
