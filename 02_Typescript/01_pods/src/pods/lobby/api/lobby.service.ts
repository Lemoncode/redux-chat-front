import { generateCanEnrollRoomUrl, roomsUrl } from './routes';
import { Room } from './model';

export const getListOfRooms = (): Promise<Room[]> => {
  return fetch(roomsUrl)
    .then(response => response.json());
};

export const canEnrollRoom = (room: Room, nickname: string) => {
  const url = generateCanEnrollRoomUrl(room);
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      userId: nickname,
    }),
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
};
