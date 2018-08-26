import { messageFactory } from '../api/chat'
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {actionIds} from '../common';
import {
  EnrollRoomRequest, disconnectRoomRequest, onDisconnect,
  onMessageReceived, onMessageListReceived, sendMessage
} from '../actions';
import {establishRoomSocketConnection} from './business';


function connect(sessionInfo) {
  const socket = establishRoomSocketConnection(sessionInfo.nickname, sessionInfo.room);

  return new Promise(resolve =>
    socket.on('connect', () => {
      socket.emit('messages');
      resolve(socket);
    })  
  );
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('message', (message) => {
      emit(onMessageReceived(message));
    });
    socket.on('messages', (messageList) => {
      emit(onMessageListReceived(messageList));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    socket.on('error', (error) => {
      // TODO: handle
    });

    return () => {};
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
    let { payload } = yield take(actionIds.ENROLL_ROOM_REQUEST);
    const socket = yield call(connect, {nickname: payload.nickname, room: payload.room});
    const task = yield fork(handleIO, socket);
    const action = yield take(actionIds.DISCONNECT);
    socket.disconnect();    
  }
}

export function* rootSaga() {
  yield fork(flow);
}

