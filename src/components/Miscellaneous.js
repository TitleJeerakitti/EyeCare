import React from 'react';
import { View, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ButtonImage, } from './common';

class Miscellaneous extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ButtonImage
                    onPress={() => Actions.magnifier()}
                    source={require('../images/search.png')}
                    title='แว่นขยาย'
                />
                <ButtonImage
                    onPress={() => Actions.eyedropsvideo()}
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
