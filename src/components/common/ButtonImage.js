import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CardImage } from './CardImage';

const ButtonImage = ({ 
    source, 
    onPress, 
    title, 
    children, 
    notHorizontal = false,
    disabled,
}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1} disabled={disabled}>
            <CardImage
                source={source}
                title={title}
                notHorizontal={notHorizontal}
            >
                {children}
            </CardImage>
        </TouchableOpacity>
    );
};

export { ButtonImage };
