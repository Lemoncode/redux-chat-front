import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { LobbyContainer } from './lobby.container';
import * as actionCreators from '../../actions';

const getMockStore = configureStore();

describe('pages/lobby/lobby.container.jsx tests', () => {
  it('should render as expected passing state', () => {
    // Arrange
    const state = {}
    const store = getMockStore(state);
    
    // Act
    const component = shallow(
      <LobbyContainer />,
      {context: {store}}
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it(`should call canEnrollRequest action creator when 
      calling fireSessionEnrollRequest prop`, () => {
    // Arrange
    const nickname = 'test nickname';
    const room = 'test room';
    const state = {};
    const store = getMockStore(state);
    const actionCreatorStub = jest.spyOn(actionCreators, 'canEnrollRequest')
        .mockImplementation(() => ({
          type: 'test action type',
        }));
    
    // Act
    const component = shallow(
      <LobbyContainer />,
      {context: {store}}
    );
    component.prop('fireSessionEnrollRequest')(nickname, room);

    // Assert
    expect(actionCreatorStub).toHaveBeenCalledWith(nickname, room);
  });
});
