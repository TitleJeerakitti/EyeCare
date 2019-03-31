import React from 'react';
import { ScrollView, } from 'react-native';
import { 
    TextHeader, 
    Card,
} from './common';
import EyeCard from './special/EyeCard';
import { NORMAL, ABNORMAL } from '../config';

class EyeDropper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Eye Dropper A',
                    time: ['09:00', '12:00', '20:00'],
                    eyePosition: 'LEFT',
                    image: require('../images/eye-dropper.png'),
                    type: ABNORMAL,
                    timeToDrop: 5,
                    timeToPush: 1,
                },
                {
                    name: 'Eye Dropper B',
                    time: ['09:05', '12:05'],
                    eyePosition: 'RIGHT',
                    image: require('../images/eye-dropper.png'),
                    type: NORMAL,
                    timeToDrop: 3,
                },
            ]
        };
    }

    renderEyeCard() {
        return this.state.data.map((item, index) =>
            <EyeCard key={index} item={item} />
        );
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Card>
                    <TextHeader fontWeight='bold'>
                        ยาหยอดตา
                    </TextHeader>
                </Card>
                {this.renderEyeCard()}
            </ScrollView>
        );
    }
}

export default EyeDropper;
