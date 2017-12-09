From python:3.6.1

RUN mkdir /avalon && mkdir /avalon/server
COPY server /avalon/server
ADD run_server.py /avalon

WORKDIR /avalon
RUN pip install -r server/requirements.txt

CMD ["sh", "-c", "./run_server.py"]
