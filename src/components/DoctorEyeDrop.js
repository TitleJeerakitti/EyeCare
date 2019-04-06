import React from 'react';
import { ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import { SQLite } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Card, ButtonIconWithText } from './common';
import { RED, ABNORMAL, NORMAL, WHITE } from '../config';
import EyeCard from './special/EyeCard';
import { doctorSelectEyeDrop } from '../actions';

const orderdb = SQLite.openDatabase('order.db');
const timedb = SQLite.openDatabase('time.db');

class DoctorEyeDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*data: [
                {
                    name: 'Eye Dropper A',
                    time: ['09:00', '12:00', '20:00'],
                    eyePosition: 'LEFT',
                    image: require('../images/eye-dropper.png'),
                    type: ABNORMAL,
                    //timeToDrop: 5,
                    //timeToPush: 1,
                    detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2', 'ศัพท์แพทย์ 3'],
                },
                {
                    name: 'Eye Dropper B',
                    time: ['09:05', '12:05'],
                    eyePosition: 'RIGHT',
                    image: require('../images/eye-dropper.png'),
                    type: NORMAL,
                    //timeToDrop: 3,
                    detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2'],
                },
            ]*/
            data: []
        };
    }

    componentDidMount() {
        this.orderData();
    }

    onClickEyeCard(item) {
        this.props.doctorSelectEyeDrop(item);
        Actions.doctor_eyedrop_detail();
    }

    orderData() {
        orderdb.transaction(tx => {
            tx.executeSql('select * from items where patientID = 1', [], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    this.timeData(_array);
                }
            });
        });    
    }

    timeData(order) {
        timedb.transaction(tx => {
            order.forEach((eachOrder) => {
                tx.executeSql('select * from items where orderID = ?', [eachOrder.id], (_, { rows: { _array } }) => {
                    this.setState({
                        data: this.state.data.concat({ order: eachOrder, time: _array })
                    }, /*console.log(this.state.data)*/);
                    console.log(this.state.data);
                });
            });
        });  
    }

    renderEyeCard() {
        return this.state.data.map((item, index) => 
            <EyeCard key={index} item={item} onPress={() => this.onClickEyeCard(item)} />
        );
    }

    render() {
        return (
            <ScrollView>
                
                <Card>
                    <ButtonIconWithText
                        title='สั่งยาหยอดตา'
                        iconColor={WHITE}
                        iconBg={RED}
                        iconName='add'
                        onPress={() => Actions.doctor_pick_new_group()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default connect(null, { doctorSelectEyeDrop })(DoctorEyeDrop);
