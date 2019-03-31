import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import { Icon } from 'react-native-elements';
import { Row } from './Row';
import { Center } from './Center';

const ButtonIconWithText = ({ title, iconColor, iconName, iconType, iconBg, onPress }) => {
    return (
        <Center>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={1}
            >
                <Row style={{ ...styles.container }}>
                    <Icon 
                        name={iconName}
                        type={iconType}
                        containerStyle={{ ...styles.iconStyle, backgroundColor: iconBg, }} 
                        color={iconColor}
                    />
                    <Text>{title}</Text>
                </Row>
            </TouchableOpacity>
        </Center>
        
    );
};

const styles = {
    container: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    iconStyle: {
        padding: 5, 
        borderRadius: 20, 
        marginRight: 10,
    }
};

export { ButtonIconWithText };
