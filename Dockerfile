FROM ubuntu:16.04 as builder

RUN apt-get update
RUN apt-get -y install curl git
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN git clone https://github.com/MarcoreJS/terrain-area.git
RUN cd ./terrain-area \
    && npm install

FROM alpine
COPY --from=builder . .

CMD cd ./terrain-area \
    && node index.js --bind 0.0.0.0:$PORT wsgi