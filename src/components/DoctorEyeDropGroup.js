import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { WHITE } from '../config';
import { doctorSelectEyeDropGroup } from '../actions';

class DoctorEyeDropGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: '01 PROSTAGLANDIN ANALOG',
                    eyeDrop: [
                        {
                            name: 'Eye Dropper A',
                            image: require('../images/eye-dropper.png'),
                            detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2', 'ศัพท์แพทย์ 3'],
                        },
                        {
                            name: 'Eye Dropper B',
                            image: require('../images/eye-dropper.png'),
                            detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2'],
                        },
                    ]
                },
                {
                    name: '02 BETA BLOCKER',
                    eyeDrop: [
                        {
                            name: 'Eye Dropper C',
                            image: require('../images/eye-dropper.png'),
                            detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2', 'ศัพท์แพทย์ 3'],
                        },
                        {
                            name: 'Eye Dropper D',
                            image: require('../images/eye-dropper.png'),
                            detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2'],
                        },
                    ]
                }
            ]
        };
    }

    onClick(item, category) {
        this.props.doctorSelectEyeDropGroup(item, category);
        Actions.doctor_pick_new();
    }

    renderList() {
        return this.state.data.map((item, index) => 
            <Button
                key={index}
                backgroundColor={WHITE}
                onPress={() => this.onClick(item.eyeDrop, item.name)}
            >
                {item.name}
            </Button>
        );
    }

    render() {
        return (
            <View>
                {this.renderList()}
            </View>
        );
    }
}

export default connect(null, { doctorSelectEyeDropGroup })(DoctorEyeDropGroup);
