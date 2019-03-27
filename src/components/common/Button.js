import React from 'react';
import { TouchableOpacity, } from 'react-native';
import { Center } from './Center';
import { TextContent } from './TextContent';

const Button = ({ onPress, children, style, color, backgroundColor }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={{ ...styles.container, backgroundColor, ...style }}
        >
            <Center>
                <TextContent style={{ color }}>{children}</TextContent>
            </Center>
        </TouchableOpacity>
    );
};

const styles = {
    container: {
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
    }
};

export { Button };
