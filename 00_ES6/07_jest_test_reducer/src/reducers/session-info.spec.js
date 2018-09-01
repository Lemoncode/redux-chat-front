import { sessionInfoReducer } from './session-info';
import deepFreeze from 'deep-freeze';
import { actionIds } from '../common';

describe('reducers/session-info tests', () => {
  it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
    const state = undefined;
    const action = { type: 'some type' };

    // Act
    const nextState = sessionInfoReducer(state, action);

    // Assert
    expect(nextState.nickname).toEqual('');
    expect(nextState.room).toEqual('');
  });

  it('should return same state without mutate it when passing state and some action type', () => {
    // Arrange
    const state = {
      nickname: 'test nickname',
      room: 'test room',
    };
    const action = { type: 'some type' };
    deepFreeze(state);

    // Act
    const nextState = sessionInfoReducer(state, action);

    // Assert
    expect(nextState.nickname).toEqual('test nickname');
    expect(nextState.room).toEqual('test room');
  });

  it(`should return updated state without mutate it when passing state
      and SETUP_SESSION_INFO action with payload`, () => {
    // Arrange
    const state = {
      nickname: 'initial nickname',
      room: 'initial room',
    };
    const action = {
      type: actionIds.SETUP_SESSION_INFO,
      payload: {
        nickname: 'updated nickname',
        room: 'updated room',
      }
    };
    deepFreeze(state);

    // Act
    const nextState = sessionInfoReducer(state, action);

    // Assert
    expect(nextState.nickname).toEqual('updated nickname');
    expect(nextState.room).toEqual('updated room');
  });
});