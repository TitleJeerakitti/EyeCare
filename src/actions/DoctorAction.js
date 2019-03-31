import { DOCTOR_SELECT_EYEDROP } from './types';

export const doctorSelectEyeDrop = (data) => {
    return {
        type: DOCTOR_SELECT_EYEDROP,
        payload: data,
    };
};
