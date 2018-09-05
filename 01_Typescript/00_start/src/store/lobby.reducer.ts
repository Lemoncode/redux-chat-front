import { BaseAction, actionIds } from '../common';
import { LobbyState } from './model';

type LobbyReducer = (state: LobbyState, action: BaseAction) => LobbyState;

const defaultState = (): LobbyState => ({
  rooms: [],
  candidateRoom: '',
  candidateNickname: '',
});

export const lobbyReducer: LobbyReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.UPDATE_ROOM_LIST_SUCCESS:
      return handleUpdateRoomListSuccess(state, action.payload as string[]);
    case actionIds.UPDATE_CANDIDATE_ROOM:
      return handleUpdateCandidateRoom(state, action.payload as string);
    case actionIds.UPDATE_CANDIDATE_NICKNAME:
      return handleUpdateCandidateNickname(state, action.payload as string);
  }

  return state;
}

export const handleUpdateRoomListSuccess =
  (state: LobbyState, rooms: string[]): LobbyState => ({
    ...state,
    rooms,
  });

export const handleUpdateCandidateRoom =
  (state: LobbyState, candidateRoom: string): LobbyState => ({
    ...state,
    candidateRoom,
  });

export const handleUpdateCandidateNickname =
  (state: LobbyState, candidateNickname: string): LobbyState => ({
    ...state,
    candidateNickname,
  });
