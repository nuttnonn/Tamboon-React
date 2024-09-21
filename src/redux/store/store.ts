import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;

export default store;