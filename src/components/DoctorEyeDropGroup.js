import React from 'react';
import { View, Text } from 'react-native';
import { SQLite } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { WHITE, DARK_GRAY } from '../config';
import { doctorSelectEyeDropGroup } from '../actions';

const categorydb = SQLite.openDatabase('category.db');
const eyeDropdb = SQLite.openDatabase('eyedrop.db');

class DoctorEyeDropGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*data: [
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
            ]*/
            data: []
        };
    }

    componentDidMount() {
        this.groupData();
    }

    onClick(item, category) {
        this.props.doctorSelectEyeDropGroup(item, category);
        Actions.doctor_pick_new();
    }

    groupData() {
        categorydb.transaction(tx => {
            tx.executeSql('select * from items', [], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    this.eyeDropData(_array);
                }
            });
        });    
    }

    eyeDropData(group) {
        eyeDropdb.transaction(tx => {
            group.forEach((eachGroup) => {
                tx.executeSql('select * from items where category = ?', [eachGroup.id], (_, { rows: { _array } }) => {
                    this.setState({
                        data: this.state.data.concat({ group: eachGroup, eyeDrop: _array })
                    });
                });
            });
        });  
    }

    renderList() {
        return this.state.data.map((item, index) =>
            <Button  
                key={index}
                backgroundColor={WHITE}
                onPress={() => this.onClick(item.eyeDrop, item.group)}
            >
                {item.group.name}
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
