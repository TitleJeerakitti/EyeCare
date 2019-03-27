import React from 'react';
import { Text } from 'react-native';
import { FONT_HEADER } from '../../config';

const TextHeader = ({ style, children, fontWeight }) => {
    return (
        <Text style={{ fontSize: FONT_HEADER, fontWeight, ...style }}>
            {children}
        </Text>
    );
};

export { TextHeader };
