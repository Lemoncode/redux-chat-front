import { CoreModel } from '../../core/store';
import { ApiModel } from './api';
import { Model } from './store';
import * as ViewModel from './viewmodel';

export const mapSessionInfoFromStoreToViewmodel = (sessionInfo: CoreModel.SessionInfo): ViewModel.SessionInfo => ({
  nickname: sessionInfo.nickname,
  room: sessionInfo.room,
});

export const mapSessionInfoFromViewmodelToApi = (sessionInfo: ViewModel.SessionInfo): ApiModel.SessionInfo => ({
  nickname: sessionInfo.nickname,
  room: sessionInfo.room,
});

export const mapSimpleMessageFromApiToStore = (message: ApiModel.SimpleMessage): Model.Message => ({
  user: message.user,
  text: message.text,
});

const mapMessageFromApiToStore = (message: ApiModel.Message): Model.Message => ({
  user: message.userId,
  text: message.text,
})

export const mapMessagesFromApiToStore = (messageList: ApiModel.Message[]): Model.Message[] =>
  messageList.map(mapMessageFromApiToStore);
