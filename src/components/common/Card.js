import React from 'react';
import { View } from 'react-native';

const Card = ({ children, style }) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    );
};

const styles = {
    container: {
        marginHorizontal: 10,
        marginTop: 10,
    },
};

export { Card };
