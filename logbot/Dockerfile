FROM golang:1.9.3

RUN mkdir $GOPATH/src/github.com && \
    mkdir $GOPATH/src/github.com/Stevearzh && \
    mkdir $GOPATH/src/github.com/Stevearzh/Avalon

WORKDIR $GOPATH/src/github.com/Stevearzh/Avalon

ADD . .

RUN go build run_bot.go
    
CMD ["sh", "-c", "./run_bot"]
