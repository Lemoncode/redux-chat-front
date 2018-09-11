import { actionIds } from '../common';

const defaultState = () => ({searchTerm: ''});

export const searchReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.UPDATE_SEARCH_TERM:
      return handleUpdateSearchTerm(state, action.payload);
  }

  return state;
}

export const handleUpdateSearchTerm = (state, searchTerm) => ({
  ...state,
  searchTerm,
})