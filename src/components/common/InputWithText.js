import React from 'react';
import { Text, } from 'react-native';
import { Row, } from './Row';
import { Input } from './Input';

const InputWithText = ({ title, onChangeText, value, placeholder }) => {
    return (
        <Row style={{ alignItems: 'center' }}>
            <Text style={{ flex: 2, marginTop: 10, marginLeft: 10 }}>{title}</Text>
            <Input
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={{ flex: 5 }}
            />
        </Row>
    );
};

export { InputWithText };
