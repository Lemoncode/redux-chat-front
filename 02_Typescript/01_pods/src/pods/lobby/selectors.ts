import { Model } from './store';
import { podLobbySelector } from '../../selectors';
import { createSelector } from 'reselect';


export const roomsSelector = createSelector(
  podLobbySelector,
  (state: Model.State) => state.lobby.rooms,
);

export const candidateRoomSelector = createSelector(
  podLobbySelector,
  (state: Model.State) => state.lobby.candidateRoom,
);

export const candidateNicknameSelector = createSelector(
  podLobbySelector,
  (state: Model.State) => state.lobby.candidateNickname,
);
