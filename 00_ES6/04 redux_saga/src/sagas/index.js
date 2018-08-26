import { messageFactory } from '../api/chat'
import io from 'socket.io-client';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {actionIds} from '../common';
import {
  EnrollRoomRequest, DisconnectRoomRequest, OnDisconnect,
  OnMessageReceived, OnMessageListReceived, SendMessage
} from '../actions';


function connect(sessionInfo) {
  const socket = establishRoomSocketConnection(sessionInfo.nickname, sessionInfo.room);
  socket.on('connect', () => {
    socket.emit('messages');
    resolve(socket);
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('message', (message) => {
      emit(OnMessageReceived(message));
    });
    socket.on('messages', (messageList) => {
      emit(OnMessageListReceived(messageList));
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

function* flow() {
  while (true) {
    let { payload } = yield take(actionIds.ENROLL_ROOM_REQUEST);
    const socket = yield call(connect, {nickname: payload.nickname, room: payload.room});
    const task = yield fork(handleIO, socket);
    const action = yield take(DisconnectRoomRequest);
    socket.disconnect();    
  }
}

export function* rootSaga() {
  yield fork(flow);
}

