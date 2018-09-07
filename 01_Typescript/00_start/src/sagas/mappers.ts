import { ApiModel } from '../api';
import { Model } from '../store';

export const mapApiRoomToRoom = (room: ApiModel.Room): Model.Room => room;
export const mapApiRoomsToRooms = (rooms: ApiModel.Room[]): Model.Room[] => rooms.map(mapApiRoomToRoom);

export const mapApiSimpleMessageToMessage = (message: ApiModel.SimpleMessage): Model.Message => ({
  user: message.user,
  text: message.text,
});

const mapApiMessageToMessage = (message: ApiModel.Message): Model.Message => ({
  user: message.userId,
  text: message.text,
})

export const mapApiMessagesToMessages = (messageList: ApiModel.Message[]): Model.Message[] =>
  messageList.map(mapApiMessageToMessage);
