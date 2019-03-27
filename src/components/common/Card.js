import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => {
    return (
        <View style={styles.container}>
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
