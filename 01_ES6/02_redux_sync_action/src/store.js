import { createStore } from 'redux';
import { reducers } from './reducers';

// Add redux dev tool support
export const store = createStore(reducers, 
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                         );  
                         