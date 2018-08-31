import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { actionIds } from '../common';
import { storeSessionInfo, canEnrollRequest } from './index';
import * as api from '../api/rooms';
import * as router from 'connected-react-router';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('actions/index storeSessionInfo tests', () => {
  it('should create an action with proper type and payload', () => {
    // Arrange
    const nickname = 'test nickname A';
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
    const nickname = 'test nickname B';
    const room = 'test room';
    const canEnrollRoomStub = jest.spyOn(api, 'canEnrollRoom')
      .mockImplementation(() => Promise.resolve(true));
    
    // Act
    const store = getMockStore();
    store.dispatch(canEnrollRequest(nickname, room));

    // Assert
    expect(canEnrollRoomStub).toHaveBeenCalledWith(room, nickname);
  });

  it('should dispatch a storeSessionInfo action if response from API is positive', async () => {
    // Arrange
    const nickname = 'test nickname C';
    const room = 'test room';
    jest.spyOn(api, 'canEnrollRoom').mockImplementation(() => ({
      then: function(callback) {
        setTimeout(() => callback(true), 2000);
        return this;
      },
    }));
    
    // Act
    const store = getMockStore();
    await store.dispatch(canEnrollRequest(nickname, room));

    // Assert
    const expectedAction = store.getActions()[0];
    expect(expectedAction).toBeTruthy();
    expect(expectedAction.type).toEqual(actionIds.SETUP_SESSION_INFO);
    expect(expectedAction.payload).toEqual({nickname, room});
  });

  it('should navigate to chat if response from API is positive', () => {
    // Arrange
    const nickname = 'test nickname D';
    const room = 'test room';
    jest.spyOn(api, 'canEnrollRoom').mockImplementation(() => ({
      then: function(callback) {
        callback(true);
        return this;
      },
    }));
    const routerPushStub = jest.spyOn(router, 'push');
    
    // Act
    const store = getMockStore();
    store.dispatch(canEnrollRequest(nickname, room));

    // Assert
    expect(routerPushStub).toHaveBeenCalledWith('/chat');
  });

  it('should call console log if response from API is negative', () => {
    // Arrange
    const nickname = 'test nickname D';
    const room = 'test room';
    jest.spyOn(api, 'canEnrollRoom').mockImplementation(() => ({
      then: function(callback) {
        callback(false);
        return this;
      },
    }));
    const logStub = jest.spyOn(console, 'log');
    
    // Act
    const store = getMockStore();
    store.dispatch(canEnrollRequest(nickname, room));

    // Assert
    expect(logStub).toHaveBeenCalled();
  });
});

