import { all, call, put, takeLatest } from "redux-saga/effects";
import { BaseAction } from '../../common-app';
import { updateRoomListFail, updateRoomListSuccess } from './actions';
import { ApiModel, getListOfRooms } from './api';
import { actionIds } from './const';
import { mapRoomsFromApiToStore } from "./mappers";

function* fetchRoomListSaga() {
  try {
    const rooms: ApiModel.Room[] = yield call(getListOfRooms);
    if(Array.isArray(rooms)) {
      yield put(updateRoomListSuccess(mapRoomsFromApiToStore(rooms)));
    } else {
      throw new Error('Invalid format');
    }
  } catch (e) {
    const message = `There was a problem updating room list. ${e.mesage}`;
    yield put(updateRoomListFail(message));
  }
};

function* fetchRoomListFailSaga(action: BaseAction<string>) {
  try {
    // TODO: We can use a popup instead of console log.
    const message = action.payload;
    console.log(message);
  } catch (e) {
    console.log(e);
  }
};

export function* lobbyRootSaga() {
  yield all([
    takeLatest(actionIds.FETCH_ROOM_LIST, fetchRoomListSaga),
    takeLatest(actionIds.FETCH_ROOM_LIST_FAIL, fetchRoomListFailSaga),
  ]);
}