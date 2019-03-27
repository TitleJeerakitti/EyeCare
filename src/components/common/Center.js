import React from 'react';
import { View, } from 'react-native';

const Center = ({ children, style, notHorizontal, notVertical, }) => {
    return (
        <View 
            style={{ 
                justifyContent: notVertical ? 'flex-start' : 'center', 
                alignItems: notHorizontal ? 'flex-start' : 'center', 
                ...style 
            }}
        >
            {children}
        </View>
    );
};

export { Center };
