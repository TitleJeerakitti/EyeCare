import React from 'react';
import { Text } from 'react-native';
import { FONT_HEADER } from '../../config';

const TextHeader = ({ style, children }) => {
    return (
        <Text style={{ fontSize: FONT_HEADER, ...style }}>
            {children}
        </Text>
    );
};

export { TextHeader };
