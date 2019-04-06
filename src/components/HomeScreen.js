import React from 'react';
import { View, ScrollView, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SQLite } from 'expo';
import { NavigationEvents } from "react-navigation";
import { TextContent, Row, Button, CardImage, ButtonImage, TimeCard } from './common';
import { BLUE, YELLOW, RED } from '../config';


const patientdb = SQLite.openDatabase('patient.db');
const appointmentdb = SQLite.openDatabase('appointment.db');

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {
                name: 'นาย สมชาย สุดหล่อ',
                age: '62',
            },
            leftEye: ['09:00', '12:00', '18:00'],
            rightEye: ['10:00', '16:00'],
            appointment: {
                date: '30 พฤศจิกายน 2562',
                time: '16:00',
                place: 'โรงพยาบาลธรรมศาสตร์'
            }
        };
    }

    componentDidMount() {
        this.patientData();
        this.appointmentData();
    }

    patientData() {
        patientdb.transaction(tx => {
            tx.executeSql('select * from items', [], (_, { rows: { _array } }) => {
                if (_array.length === 1) {
                    const age = new Date().getFullYear() - _array[0].birthday.substring(_array[0].birthday.length - 4, _array[0].birthday.length);
                    this.setState({
                        patient: { name: `${_array[0].name} ${_array[0].surname}`, age }
                    });
                }
            }, () => console.log('error'));
        });    
    }

    appointmentData() {
        appointmentdb.transaction(tx => {
            tx.executeSql('select * from items', [], (_, { rows: { _array } }) => {
                if (_array.length === 1) {
                        this.setState({
                            appointment: { date: _array[0].date, time: _array[0].time, place: 'โรงพยาบาลธรรมศาสตร์' }
                        });
                }
            }, () => console.log('error'));
        });    
    }

    renderTimeSlot(data) {
        return data.map((item, index) => 
            <TimeCard key={index}>{item}</TimeCard>
        );
    }

    render() {
        return (
            <ScrollView>
                <NavigationEvents
                    onWillFocus={() => {
                        this.componentDidMount();
                    }}
                />
                <ButtonImage
                    onPress={() => Actions.edit_profile()}
                    source={require('../images/user.png')}
                    title='ข้อมูลผู้ป่วย'
                    notHorizontal
                >
                    <TextContent numberOfLines={1}>{this.state.patient.name}</TextContent>
                    <TextContent style={{ }}>{this.state.patient.age} ปี</TextContent>
                </ButtonImage>
                <ButtonImage
                    onPress={() => Actions.eyedropper()}
                    source={require('../images/eye-dropper.png')}
                    title='เวลาหยอดตา'
                    notHorizontal
                >
                    <Row>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <TextContent>ตาซ้าย</TextContent>
                            {this.renderTimeSlot(this.state.leftEye)}
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <TextContent>ตาขวา</TextContent>
                            {this.renderTimeSlot(this.state.rightEye)}
                        </View>
                    </Row>
                </ButtonImage>
                <CardImage
                    source={require('../images/calendar.png')}
                    title='นัดพบแพทย์'
                >
                    <View style={{ flex: 1, }}>
                        <TextContent style={{ color: BLUE, fontWeight: 'bold', }}>
                            {this.state.appointment.date} ({this.state.appointment.time})
                        </TextContent>
                        <TextContent>{this.state.appointment.place}</TextContent>
                    </View>
                </CardImage>
                <Button backgroundColor={RED} color='#FFF' onPress={() => Actions.eyedropper()}>
                    แจ้งหยอดตา
                </Button>
                <Button backgroundColor={YELLOW} onPress={() => Actions.chart()}>
                    สถิติการหยอดตา
                </Button>
            </ScrollView>
        );
    }
}

export default HomeScreen;
