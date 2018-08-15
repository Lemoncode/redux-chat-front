// TODO move to some setting/env place

const baseUrl = 'http://localhost:3000';
const baseApi = `${baseUrl}/api`;

export const roomsUrl = `${baseApi}/rooms`;
export const generateCanEnrollRoomUrl = (roomId) => `${roomsUrl}/canenroll/${roomId}/user`;