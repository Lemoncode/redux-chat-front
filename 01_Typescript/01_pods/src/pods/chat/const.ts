export const actionIds = {
  ENROLL_ROOM_REQUEST: '[Chat] [1] Send a request to the server informing nickname and room to enroll',
  DISCONNECT: '[Chat] [2] User wants to disconnect',
  ON_DISCONNECT: '[Chat] [3] Server notifies disconnection',
  MESSAGE_RECEIVED: '[Chat] [4] Chat message received from socket',
  MESSAGE_LIST_RECEIVED: '[Chat] [5] Chat message list received from socket',
  SEND_MESSAGE: '[Chat] [6] Send message to the server',
  UPDATE_CURRENT_MESSAGE: '[Chat] [7] Update current message in store',
  UPDATE_SEARCH_TERM: '[Chat] [8] Update search term in store',
};
