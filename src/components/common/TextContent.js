import React from 'react';
import { Text } from 'react-native';
import { FONT_SIZE } from '../../config';

const TextContent = ({ children, style, numberOfLines, }) => {
    return (
        <Text style={{ fontSize: FONT_SIZE, ...style }} numberOfLines={numberOfLines}>
            {children}
        </Text>
    );
};

export { TextContent };
