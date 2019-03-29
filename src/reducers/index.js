import { combineReducers } from 'redux';
import EyeDropperReducer from './EyeDropperReducer';

export default combineReducers({
    eyeDrop: EyeDropperReducer,
});
