import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CardImage } from './CardImage';

const ButtonImage = ({ source, onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <CardImage
                source={source}
                title={title}
                notHorizontal={false}
            />
        </TouchableOpacity>
    );
};

export { ButtonImage };
