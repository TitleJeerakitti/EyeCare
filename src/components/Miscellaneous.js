import React from 'react';
import { View, } from 'react-native';
import { ButtonImage, } from './common';

class Miscellaneous extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ButtonImage
                    onPress={() => console.log('test')}
                    source={require('../images/search.png')}
                    title='แว่นขยาย'
                />
                <ButtonImage
                    onPress={() => console.log('test')}
                    source={require('../images/video-player.png')}
                    title='วิธีหยอดตา'
                />
                <ButtonImage
                    onPress={() => console.log('test')}
                    source={require('../images/resize.png')}
                    title='ปรับขนาดตัวอักษร'
                />
            </View>
        );
    }
}

export default Miscellaneous;
