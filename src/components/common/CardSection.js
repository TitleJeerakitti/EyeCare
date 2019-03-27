import React from 'react';
import { View, } from 'react-native';
import { WHITE } from '../../config';

const CardSection = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = {
    container: {
        // flex: 1,
        padding: 10,
        backgroundColor: WHITE,
        borderRadius: 10,
    }
};

export { CardSection };
