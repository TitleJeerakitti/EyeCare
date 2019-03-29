import { SELECT_EYEDROP } from '../actions/types';

const INITIAL_STATE = {
    data: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_EYEDROP:
            return { data: action.payload };
        default:
            return state;
    }
};
