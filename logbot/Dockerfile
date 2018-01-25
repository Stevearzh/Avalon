FROM golang:1.9.3

ADD . $GOPATH/src/github.com/Stevearzh/Avalon

WORKDIR $GOPATH/src/github.com/Stevearzh/Avalon

RUN go build run_bot.go 
    
CMD ["./run_bot"]
