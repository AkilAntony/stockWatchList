
 import {createStore} from 'redux';
 import { Provider } from 'react-redux';
 import stcokReducer from './stockReducer';

 const store = createStore(stcokReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    );

 export default store;