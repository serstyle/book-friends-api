FROM node:11.12.0-stretch

WORKDIR /usr/src/book_friend_server

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]