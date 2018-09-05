import { BaseAction, actionIds } from '../common';
import { SessionInfo } from '../common';
import { SessionInfoState } from './model';

type SessionInfoReducer = (state: SessionInfoState, action: BaseAction) => SessionInfoState;

const defaultState = (): SessionInfoState => ({
  nickname: '',
  room: '',
});

export const sessionInfoReducer: SessionInfoReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.SETUP_SESSION_INFO:
      return handleUpdateSessionInfo(state, action.payload as SessionInfo);
  }
  return state;
};

export const handleUpdateSessionInfo =
  (state: SessionInfoState, sessionInfo: SessionInfo): SessionInfoState => ({
    ...state,
    nickname: sessionInfo.nickname,
    room: sessionInfo.room,
  });
