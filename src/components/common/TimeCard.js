import React from 'react';
import { View, Text } from 'react-native';
import { BLUE, WHITE } from '../../config';

const TimeCard = ({ children }) => {
    return (
        <View style={styles.importantCard}>
            <Text style={{ color: WHITE }}>{children}</Text>
        </View>
    );
};

const styles = {
    importantCard: {
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        backgroundColor: BLUE, 
        borderRadius: 50, 
        marginTop: 5,
    }
};

export { TimeCard };
