import { createSelector } from "reselect";
import { filterChatLogBySearchTerm } from "./selectors.business";
import { State } from './model';

export const sessionInfoSelector = (state: State) => state.sessionInfo;
export const roomsSelector = (state: State) => state.lobby.rooms
export const candidateRoomSelector = (state: State) => state.lobby.candidateRoom
export const candidateNicknameSelector = (state: State) => state.lobby.candidateNickname
export const currentMessageSelector = (state: State) => state.chat.chatCurrentMessage;
export const searchTermSelector = (state: State) => state.chat.searchTerm;
const chatLogSelector = (state: State) => state.chat.chatLog;

export const filteredChatLogSelector = createSelector(
  [searchTermSelector, chatLogSelector],
  filterChatLogBySearchTerm,
);
