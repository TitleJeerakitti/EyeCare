import React from 'react';
import { Icon, } from 'react-native-elements';
import { ORANGE, BLACK } from '../../config';

const IconTab = ({ iconName, focused, size }) => {
    return (
        <Icon 
            name={iconName}
            type='material-community'
            color={focused ? ORANGE : BLACK}
            size={size}
        />
    );
};

export { IconTab };
