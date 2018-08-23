import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers';
import ReduxThunk from 'redux-thunk';

// Add redux dev tool support
export const store = createStore(reducers, 
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
                          applyMiddleware(ReduxThunk)
                         );  
                         