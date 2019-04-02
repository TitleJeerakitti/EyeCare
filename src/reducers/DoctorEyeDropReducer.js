import { DOCTOR_SELECT_EYEDROP, DOCTOR_SELECT_EYEDROP_GROUP } from '../actions/types';

const INITIAL_STATE = {
    data: undefined,
    group: undefined,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DOCTOR_SELECT_EYEDROP:
            return { data: action.payload };
        case DOCTOR_SELECT_EYEDROP_GROUP:
            return { group: action.payload };
        default:
            return state;
    }
};

