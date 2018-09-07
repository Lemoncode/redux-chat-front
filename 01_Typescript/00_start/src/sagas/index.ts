import { all, fork} from 'redux-saga/effects';
import { chatRootSagas } from './chat.sagas';
import { lobbyRootSaga } from './lobby.sagas';

export function* rootSaga() {
  yield all([
    fork(chatRootSagas),
    fork(lobbyRootSaga),
  ]);
};
