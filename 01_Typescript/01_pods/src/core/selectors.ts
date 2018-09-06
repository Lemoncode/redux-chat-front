import { CoreModel } from './store';
import { coreSelector } from '../root';
import { createSelector } from 'reselect';

export const sessionInfoSelector = createSelector(
  coreSelector,
  (state: CoreModel.State) => state.sessionInfo,
);
