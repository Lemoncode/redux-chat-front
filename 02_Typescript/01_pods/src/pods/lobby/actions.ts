import { push } from 'connected-react-router';
import { BaseAction } from '../../common-app';
import { updateSessionInfo } from '../../core';
import { canEnrollRoom } from './api';
import { actionIds } from './const';
import { Model } from './store';

// Target: API
export const canEnrollRequest = (nickname: string, room: string) => (dispatch) => {
  canEnrollRoom(room, nickname).then((succeeded: boolean) => {
    if (succeeded === true) {
      console.log(`*** Join Room Request succeeded
        Nickname: ${nickname}
        Room: ${room}`);
      dispatch(updateSessionInfo(nickname, room));
      dispatch(push('/chat'));
    } else {
      console.log(`Join room request failed try another nickname`);
    }
  });
};

export const updateRoomList = (): BaseAction => ({
  type: actionIds.FETCH_ROOM_LIST,
});

// Target: STORE
export const updateRoomListSuccess = (roomList): BaseAction<Model.Room[]> => ({
  type: actionIds.FETCH_ROOM_LIST_SUCCESS,
  payload: roomList,
});

export const updateRoomListFail = (message): BaseAction<string> => ({
  type: actionIds.FETCH_ROOM_LIST_FAIL,
  payload: message,
});

export const updateCandidateRoom = (candidateRoom): BaseAction<string> => ({
  type: actionIds.UPDATE_CANDIDATE_ROOM,
  payload: candidateRoom,
});

export const updateCandidateNickname = (candidateNickname): BaseAction<string> => ({
  type: actionIds.UPDATE_CANDIDATE_NICKNAME,
  payload: candidateNickname,
});
