import { BaseAction } from '../../../common-app';
import { actionIds } from '../const';
import * as Model from './model';

export type LobbyReducer = (state: Model.LobbyState, action: BaseAction) => Model.LobbyState;

export const lobbyDefaultState = (): Model.LobbyState => ({
  rooms: [],
  candidateRoom: '',
  candidateNickname: '',
});

export const lobbyReducer: LobbyReducer = (state = lobbyDefaultState(), action) => {
  switch (action.type) {
    case actionIds.FETCH_ROOM_LIST_SUCCESS:
      return handleUpdateRoomListSuccess(state, action.payload as Model.Room[]);
    case actionIds.UPDATE_CANDIDATE_ROOM:
      return handleUpdateCandidateRoom(state, action.payload as string);
    case actionIds.UPDATE_CANDIDATE_NICKNAME:
      return handleUpdateCandidateNickname(state, action.payload as string);
  }

  return state;
};

const handleUpdateRoomListSuccess = (
  state: Model.LobbyState,
  rooms: Model.Room[]
): Model.LobbyState => ({
  ...state,
  rooms,
});

const handleUpdateCandidateRoom = (
  state: Model.LobbyState,
  candidateRoom: string
): Model.LobbyState => ({
  ...state,
  candidateRoom,
});

const handleUpdateCandidateNickname = (
  state: Model.LobbyState,
  candidateNickname: string
): Model.LobbyState => ({
  ...state,
  candidateNickname,
});
