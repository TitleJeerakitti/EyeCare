import { DOCTOR_SELECT_EYEDROP } from '../actions/types';

const INITIAL_STATE = {
    data: undefined,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DOCTOR_SELECT_EYEDROP:
            return { data: action.payload };
        default:
            return state;
    }
};

