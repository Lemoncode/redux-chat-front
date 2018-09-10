import * as React from 'react';
import { SingleView } from '../layout/single-view.component';
import { LobbyContainer } from '../pods/lobby';

export const SceneLobby: React.StatelessComponent = () => 
  <SingleView>
    <LobbyContainer />
  </SingleView>