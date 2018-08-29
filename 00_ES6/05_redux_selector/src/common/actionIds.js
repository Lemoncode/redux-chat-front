export const actionIds = {
  SETUP_SESSION_INFO: '[1] Store nickname and room name.',
  ENROLL_ROOM_REQUEST: '[2] Send a request to the server informing nickname and room to enroll',
  DISCONNECT: '[3] User wants to disconnect',
  ON_DISCONNECT: '[4] Server notifies disconnection',
  MESSAGE_RECEIVED: '[5] Chat message received from socket',
  MESSAGE_LIST_RECEIVED: '[6] Chat message list received from socket',
  SEND_MESSAGE:'[7] Send message to the server',
  UPDATE_SEARCH_TERM:'[8] Update search term in store',
}
