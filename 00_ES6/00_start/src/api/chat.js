import ioClient from 'socket.io-client';


export const messageFactory = (channel, user) => ({
    compose: (text) => ({
        channel,
        user,
        text,  
    }),
});

export const createSocket = ({url, channel, options}) => 
    ioClient(`${url}/${channel}`, options);