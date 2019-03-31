import { SELECT_EYEDROP } from './types';

export const selectEyeDrop = (data) => {
    return {
        type: SELECT_EYEDROP,
        payload: data,
    };
};
