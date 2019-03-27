import React from 'react';
import { TextInput } from 'react-native';
import { DARK_GRAY } from '../../config';

const Input = ({ placeholder, style, value, onChangeText, secure }) => {
    return (
        <TextInput 
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            style={{ ...styles.container, ...style }} 
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={secure}
        />
    );
};

const styles = {
    container: {
        marginHorizontal: 10, 
        marginTop: 10, 
        padding: 10, 
        borderWidth: 1, 
        borderColor: DARK_GRAY, 
        borderRadius: 10,
    }
};

export { Input };
