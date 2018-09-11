import { all, fork } from 'redux-saga/effects';
import { chatRootSagas } from './pods/chat';
import { lobbyRootSaga } from './pods/lobby';

// Root saga.
export function* rootSaga() {
  yield all([
    fork(chatRootSagas),
    fork(lobbyRootSaga),
  ]);
};
