import { push } from 'connected-react-router';
import { actionIds } from '../common';
import { canEnrollRoom } from '../api/rooms';

export const storeSessionInfo = (nickname, room) => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: { nickname, room }
})

export const canEnrollRequest = (nickname, room) => (dispatch) => {
  canEnrollRoom(room, nickname).then((succeeded) => {
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
