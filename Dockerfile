From python:3.6.1

RUN mkdir /avalon
ADD bot.py /avalon
ADD requirements.txt /avalon

WORKDIR /avalon
RUN pip install -r requirements.txt

CMD ["sh", "-c", "./bot.py"]
