import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { history } from './history';
import {rootSaga} from './sagas';

// Add redux dev tool support
 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  connectRouter(history)(reducers),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      ReduxThunk,
      sagaMiddleware,
    ),
  ),
); 

sagaMiddleware.run(rootSaga);
                         