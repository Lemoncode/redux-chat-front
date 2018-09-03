import { createSelector } from "reselect";
import { filterChatLogBySearchTerm } from "./selectors.business";

export const roomsSelector = state => state.lobbyReducer.rooms
export const candidateRoomSelector = state => state.lobbyReducer.candidateRoom
export const candidateNicknameSelector = state => state.lobbyReducer.candidateNickname
export const searchTermSelector = state => state.searchReducer.searchTerm;
const chatLogSelector = state => state.chatLogReducer;

export const filteredChatLogSelector = createSelector(
  [searchTermSelector, chatLogSelector],
  filterChatLogBySearchTerm,
);
