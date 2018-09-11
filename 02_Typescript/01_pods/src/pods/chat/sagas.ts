import { eventChannel } from 'redux-saga';
import { all, call, fork, put, take, cancel } from 'redux-saga/effects';
import { BaseAction } from '../../common-app';
import { onMessageListReceived, onMessageReceived } from './actions';
import { ApiModel } from './api';
import { actionIds } from './const';
import { mapMessagesFromApiToStore, mapSimpleMessageFromApiToStore } from './mappers';
import { establishRoomSocketConnection } from './sagas.business';

function connect(sessionInfo: ApiModel.SessionInfo) {
  const socket = establishRoomSocketConnection(sessionInfo.nickname, sessionInfo.room);

  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      socket.emit('messages');
      resolve({ socket });
    });

    socket.on('connect_error', err => {
      console.log('connect failed :-(');
      reject(new Error('ws:connect_failed '));
    });
  }).catch(error => ({ socket, error }));
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('message', (message: ApiModel.SimpleMessage) => {
      emit(onMessageReceived(mapSimpleMessageFromApiToStore(message)));
    });
    socket.on('messages', (messageList: ApiModel.Message[]) => {
      emit(onMessageListReceived(mapMessagesFromApiToStore(messageList)));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    socket.on('error', error => {
      // TODO: handle
      console.log('Error while trying to connect, TODO: proper handle of this event');
    });

    return () => { };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(actionIds.SEND_MESSAGE);
    socket.emit('message', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    const action: BaseAction<ApiModel.SessionInfo> = yield take(actionIds.ENROLL_ROOM_REQUEST);
    const { socket, error } = yield call(connect, action.payload);

    if (error) {
      // TODO Fire action to notify error on connection
      console.log('flow: connection failed');
    } else {
      const ioTask = yield fork(handleIO, socket);
      yield take(actionIds.DISCONNECT);
      yield cancel(ioTask);
    }
    socket.disconnect();
  }
}

export function* chatRootSagas() {
  yield all([
    fork(flow),
  ]);
}
