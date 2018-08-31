import { sessionInfoReducer } from './session-info';
import * as deepFreeze from 'deep-freeze';

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
});