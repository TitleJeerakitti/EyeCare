import { DOCTOR_SELECT_EYEDROP, DOCTOR_SELECT_EYEDROP_GROUP } from './types';

export const doctorSelectEyeDrop = (data) => {
    return {
        type: DOCTOR_SELECT_EYEDROP,
        payload: data,
    };
};

export const doctorSelectEyeDropGroup = (data) => {
    return {
        type: DOCTOR_SELECT_EYEDROP_GROUP,
        payload: data,
    };
};
