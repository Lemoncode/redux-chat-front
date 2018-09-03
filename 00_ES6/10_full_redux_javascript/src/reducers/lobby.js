import { actionIds } from '../common';

const defaultState = () => ({
  rooms: [],
  candidateRoom: '',
  candidateNickname: '',
});

export const lobbyReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.UPDATE_ROOM_LIST_SUCCESS:
      return handleUpdateRoomListSuccess(state, action.payload);
    case actionIds.UPDATE_CANDIDATE_ROOM:
      return handleUpdateCandidateRoom(state, action.payload);
    case actionIds.UPDATE_CANDIDATE_NICKNAME:
      return handleUpdateCandidateNickname(state, action.payload);
  }

  return state;
}

export const handleUpdateRoomListSuccess = (state, rooms) => ({
  ...state,
  rooms,
});

export const handleUpdateCandidateRoom = (state, candidateRoom) => ({
  ...state,
  candidateRoom,
});

export const handleUpdateCandidateNickname = (state, candidateNickname) => ({
  ...state,
  candidateNickname,
});
