import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import { CardImage } from './home_screen';

class Miscellaneous extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => console.log('test')}>
                    <CardImage 
                        source={require('../images/search.png')}
                        title='แว่นขยาย'
                        notHorizontal={false}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('test')}>
                    <CardImage 
                        source={require('../images/video-player.png')}
                        title='วิธีหยอดตา'
                        notHorizontal={false}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Miscellaneous;
