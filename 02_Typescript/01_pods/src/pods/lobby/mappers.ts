import { ApiModel } from './api';
import { Model } from './store';

const mapRoomFromApiToStore = (room: ApiModel.Room): Model.Room => room;
export const mapRoomsFromApiToStore = (rooms: ApiModel.Room[]): Model.Room[] => rooms.map(mapRoomFromApiToStore);
