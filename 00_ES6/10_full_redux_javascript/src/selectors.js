import { createSelector } from "reselect";
import { filterChatLogBySearchTerm } from "./selectors.business";

export const roomsSelector = state => state.lobbyReducer.rooms
export const candidateRoomSelector = state => state.lobbyReducer.candidateRoom
export const candidateNicknameSelector = state => state.lobbyReducer.candidateNickname
export const currentMessageSelector = state => state.chatReducer.chatCurrentMessage;
export const searchTermSelector = state => state.chatReducer.searchTerm;
const chatLogSelector = state => state.chatReducer.chatLog;

export const filteredChatLogSelector = createSelector(
  [searchTermSelector, chatLogSelector],
  filterChatLogBySearchTerm,
);
