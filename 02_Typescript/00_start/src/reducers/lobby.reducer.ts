import { BaseAction, actionIds } from '../actions';
import { Model } from '../store';

type LobbyReducer = (state: Model.LobbyState, action: BaseAction) => Model.LobbyState;

const defaultState = (): Model.LobbyState => ({
  rooms: [],
  candidateRoom: '',
  candidateNickname: '',
});

export const lobbyReducer: LobbyReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.UPDATE_ROOM_LIST_SUCCESS:
      return handleUpdateRoomListSuccess(state, action.payload as Model.Room[]);
    case actionIds.UPDATE_CANDIDATE_ROOM:
      return handleUpdateCandidateRoom(state, action.payload as string);
    case actionIds.UPDATE_CANDIDATE_NICKNAME:
      return handleUpdateCandidateNickname(state, action.payload as string);
  }

  return state;
};

export const handleUpdateRoomListSuccess = (
  state: Model.LobbyState,
  rooms: Model.Room[]
): Model.LobbyState => ({
  ...state,
  rooms,
});

export const handleUpdateCandidateRoom = (
  state: Model.LobbyState,
  candidateRoom: string
): Model.LobbyState => ({
  ...state,
  candidateRoom,
});

export const handleUpdateCandidateNickname = (
  state: Model.LobbyState,
  candidateNickname: string
): Model.LobbyState => ({
  ...state,
  candidateNickname,
});
