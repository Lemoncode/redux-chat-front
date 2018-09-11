import { createSelector } from "reselect";
import { filterChatLogBySearchTerm } from "./selectors.business";

const searchTermSelector = state => state.searchReducer.searchTerm;
const chatLogSelector = state => state.chatLogReducer;

export const filteredChatLogSelector = createSelector(
  [searchTermSelector, chatLogSelector],
  filterChatLogBySearchTerm,
);
