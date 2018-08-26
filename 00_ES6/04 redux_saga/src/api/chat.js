import ioClient from 'socket.io-client';

export const messageFactory = (nickname, room, text) => ({
  channel: room,
  user: nickname,
  text
})

export const createSocket = ({url, channel, options}) => 
    ioClient(`${url}/${channel}`, options);