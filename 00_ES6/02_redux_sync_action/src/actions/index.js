import { actionIds } from '../common';

export const storeSessionInfo = (nickname, room) => ({
  type: actionIds.SETUP_SESSION_INFO,
  payload: {nickname, room}
})
