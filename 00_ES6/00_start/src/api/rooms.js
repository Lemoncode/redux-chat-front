import {roomsUrl, generateCanEnrollRoomUrl} from './routes';

export const getListOfRooms = () => {
  return fetch(roomsUrl)
            .then((response) => response.json());
}

export const canenrollRoom = (roomId, userId) => {
  const url = generateCanEnrollRoomUrl(roomId);
  return fetch(url, {
      method: 'POST',
      body: JSON.stringify({ 
          userId 
      }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
      if (response.ok) {
          return response.json();
      }
  });
};
