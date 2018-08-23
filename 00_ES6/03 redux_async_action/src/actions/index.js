import { actionIds } from '../common';

export const StoreSessionInfo = (nickname, room) => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: {nickname, room}
})
