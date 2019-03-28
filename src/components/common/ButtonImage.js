import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CardImage } from './CardImage';

const ButtonImage = ({ source, onPress, title, children, notHorizontal = false }) => {
    return (
        <TouchableOpacity onPress={onPress}>
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
