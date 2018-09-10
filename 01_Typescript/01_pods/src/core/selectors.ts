import { CoreModel } from './store';
import { coreSelector } from '../selectors';
import { createSelector } from 'reselect';

export const sessionInfoSelector = createSelector(
  coreSelector,
  (state: CoreModel.State) => state.sessionInfo,
);
