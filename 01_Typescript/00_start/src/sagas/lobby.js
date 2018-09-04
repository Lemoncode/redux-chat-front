import { all, call, put, takeLatest } from "redux-saga/effects";
import { updateRoomListFail, updateRoomListSuccess } from "../actions";
import { getListOfRooms } from "../api/rooms";
import { actionIds } from "../common";

function* updateRoomListSaga() {
  try {
    const rooms = yield call(getListOfRooms);
    if(Array.isArray(rooms)) {
      yield put(updateRoomListSuccess(rooms));
    } else {
      throw new Error('Invalid format');
    }
  } catch (e) {
    const message = `There was a problem updating room list. ${e.mesage}`;
    yield put(updateRoomListFail(message));
  }
};

function* updateRoomListFailSaga(action) {
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
    takeLatest(actionIds.UPDATE_ROOM_LIST, updateRoomListSaga),
    takeLatest(actionIds.UPDATE_ROOM_LIST_FAIL, updateRoomListFailSaga),
  ]);
}