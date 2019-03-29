import React from 'react';
import { View, ScrollView, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TextContent, Row, Button, CardImage, ButtonImage, TimeCard } from './common';
import { BLUE, YELLOW, RED } from '../config';

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

    renderTimeSlot(data) {
        return data.map((item, index) => 
            <TimeCard key={index}>{item}</TimeCard>
        );
    }

    render() {
        return (
            <ScrollView>
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
                <Button backgroundColor={YELLOW} onPress={() => console.log('test2')}>
                    สถิติการหยอดตา
                </Button>
            </ScrollView>
        );
    }
}

export default HomeScreen;
