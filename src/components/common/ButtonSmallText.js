import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Center } from './Center';

const ButtonSmallText = ({ children, color, backgroundColor, style, onPress, }) => {
    return (
        <TouchableOpacity 
            style={{ ...styles.container, backgroundColor, ...style }}
            onPress={onPress}
            activeOpacity={1}
        >
            <Center>
                <Text style={{ color }}>{children}</Text>
            </Center>
        </TouchableOpacity>
    );
};

const styles = {
    container: {
        flex: 1, 
        padding: 10, 
        borderRadius: 10
    }
};

export { ButtonSmallText };
