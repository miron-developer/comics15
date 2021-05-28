###################################################################################################
#                                                                                                 #
#                                   Miron-developer                                               #
#                                   Comics reading                                                #
#                                                                                                 #
###################################################################################################

FROM golang:1.13

COPY . .
WORKDIR /app
RUN go mod download; go build -o cmd/comics15 cmd/main.go

LABEL description="This is comics reading site." \
    authors="Miron-developer" \
    contacts="https://github.com/miron-developer" \
    site="https://comics15.herokuapp.com"

CMD ["cmd/comics15"]

EXPOSE 4430