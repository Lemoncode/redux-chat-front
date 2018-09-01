import { actionIds } from '../common';

const defaultState = () => ({
  nickname: '',
  room: '',
});

export const sessionInfoReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.SETUP_SESSION_INFO:
      return handleUpdateSessionInfo(state, action.payload);
  }

  return state;
}

export const handleUpdateSessionInfo = (state, { nickname, room }) => ({
  ...state,
  nickname,
  room,
})
