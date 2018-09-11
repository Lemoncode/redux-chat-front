import { BaseAction, actionIds } from '../actions';
import { Model } from '../store';

type SessionInfoReducer = (
  state: Model.SessionInfoState,
  action: BaseAction
) => Model.SessionInfoState;

const defaultState = (): Model.SessionInfoState => ({
  nickname: '',
  room: '',
});

export const sessionInfoReducer: SessionInfoReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.SETUP_SESSION_INFO:
      return handleUpdateSessionInfo(state, action.payload as Model.SessionInfoState);
  }
  return state;
};

export const handleUpdateSessionInfo = (
  state: Model.SessionInfoState,
  sessionInfo: Model.SessionInfoState
): Model.SessionInfoState => sessionInfo;
