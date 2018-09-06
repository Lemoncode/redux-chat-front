import { createSelector } from "reselect";
import { filterChatLogBySearchTerm } from "./selectors.business";
import { Model } from './store';
import { podChatSelector } from '../../selectors';

export const currentMessageSelector = createSelector(
  podChatSelector,
  (state: Model.State) => state.chat.chatCurrentMessage,
);

export const searchTermSelector = createSelector(
  podChatSelector,
  (state: Model.State) => state.chat.searchTerm,
);

const chatLogSelector = createSelector(
  podChatSelector,
  (state: Model.State) => state.chat.chatLog,
);

export const filteredChatLogSelector = createSelector(
  [searchTermSelector, chatLogSelector],
  filterChatLogBySearchTerm,
);