import { combineReducers } from 'redux';
import donateReducer from './donateReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    donate: donateReducer,
    message: messageReducer,
});

export default rootReducer;