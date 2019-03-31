import { combineReducers } from 'redux';
import EyeDropperReducer from './EyeDropperReducer';
import DoctorEyeDropReducer from './DoctorEyeDropReducer';

export default combineReducers({
    eyeDrop: EyeDropperReducer,
    doctor: DoctorEyeDropReducer,
});
