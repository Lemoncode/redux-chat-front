import {roomsUrl} from './routes';

export const getListOfRooms = () => {
  return fetch(roomsUrl)
            .then((response) => response.json());
}
