import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { actionIds } from '../common';
import { storeSessionInfo, canEnrollRequest } from './index';
import * as api from '../api/rooms';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('actions/index storeSessionInfo tests', () => {
  it('should create an action with proper type and payload', () => {
    // Arrange
    const nickname = 'test nickname';
    const room = 'test room';
    const expectedAction = {
      type: actionIds.SETUP_SESSION_INFO,
      payload: { nickname, room },
    }
    
    // Act
    const createdAction = storeSessionInfo(nickname, room);

    // Assert
    expect(createdAction).toEqual(expectedAction);
  });
});

describe('actions/index canEnrollRequest tests', () => {
  it('should call to canEnrollRoom with room and nickname', () => {
    // Arrange
    const nickname = 'test nickname';
    const room = 'test room';
    const canEnrollRoomStub = jest.spyOn(api, 'canEnrollRoom')
      .mockImplementation(() => Promise.resolve());
    
    // Act
    const store = getMockStore();
    store.dispatch(canEnrollRequest(nickname, room));

    // Assert
    expect(canEnrollRoomStub).toHaveBeenCalledWith(room, nickname);
  });
});