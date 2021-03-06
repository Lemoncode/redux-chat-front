import { push } from 'connected-react-router';
import { actionIds } from '../common';
import { canEnrollRoom } from '../api/rooms';
import { messageFactory } from '../api/chat';

export const storeSessionInfo = (nickname, room) => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: { nickname, room }
})

export const canEnrollRequest = (nickname, room) => (dispatch) => {
  return canEnrollRoom(room, nickname).then((succeeded) => {
    if (succeeded === true) {
      console.log(`*** Join Room Request succeeded
      Nickname: ${nickname}
      Room: ${room}`);
      dispatch(storeSessionInfo(nickname, room));
      dispatch(push('/chat'));
    } else {
      // We could leverage this to the reducer
      console.log(`Join room request failed try another nickname`);
    }
  });
  // For the sake of the sample no Error handling, we could add it here
}

export const enrollRoomRequest = (nickname, room) => ({
  type: actionIds.ENROLL_ROOM_REQUEST,
  payload: { nickname, room }
});

export const disconnectRoomRequest = () => ({
  type: actionIds.DISCONNECT,  
});

export const onDisconnect = () => ({
  type: actionIds.ON_DISCONNECT,  
});

export const onMessageReceived = (message) => ({
  type: actionIds.MESSAGE_RECEIVED, 
  payload: message,
});

export const onMessageListReceived = (messageList) => ({
  type: actionIds.MESSAGE_LIST_RECEIVED, 
  payload: messageList,
});

export const sendMessage = (nickname, room, text) => ({
  type: actionIds.SEND_MESSAGE, 
  payload: messageFactory(nickname, room, text),
});

export const updateSearchTerm = (searchTerm) => ({
  type: actionIds.UPDATE_SEARCH_TERM,
  payload: searchTerm,
});