import React from 'react';
import { ScrollView, } from 'react-native';
import { Icon, } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Center, Card } from './common';
import { RED, ABNORMAL, NORMAL } from '../config';
import EyeCard from './special/EyeCard';
import { doctorSelectEyeDrop } from '../actions';

class DoctorEyeDrop extends React.Component {
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
                    detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2', 'ศัพท์แพทย์ 3'],
                },
                {
                    name: 'Eye Dropper B',
                    time: ['09:05', '12:05'],
                    eyePosition: 'RIGHT',
                    image: require('../images/eye-dropper.png'),
                    type: NORMAL,
                    timeToDrop: 3,
                    detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2'],
                },
            ]
        };
    }

    onClickEyeCard(item) {
        this.props.doctorSelectEyeDrop(item);
        Actions.doctor_eyedrop_detail();
    }

    renderEyeCard() {
        return this.state.data.map((item, index) => 
            <EyeCard key={index} item={item} onPress={() => this.onClickEyeCard(item)} />
        );
    }

    render() {
        return (
            <ScrollView>
                {this.renderEyeCard()}
                <Card>
                    <Center>
                        <Icon 
                            name='add' 
                            containerStyle={{ backgroundColor: RED, padding: 5, borderRadius: 20 }} 
                            color='white' 
                        />
                    </Center>
                </Card>
            </ScrollView>
        );
    }
}

export default connect(null, { doctorSelectEyeDrop })(DoctorEyeDrop);
