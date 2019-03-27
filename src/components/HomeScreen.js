import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { TextContent, Row, Button, CardImage } from './common';
import { WHITE, BLUE, YELLOW, RED } from '../config';

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
            <View key={index} style={styles.importantCard}>
                <Text style={{ color: WHITE }}>{item}</Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
                <CardImage
                    source={require('../images/user.png')}
                    title='ข้อมูลผู้ป่วย'
                >
                    <TextContent numberOfLines={1}>{this.state.patient.name}</TextContent>
                    <TextContent style={{ }}>{this.state.patient.age} ปี</TextContent>
                </CardImage>
                <CardImage
                    source={require('../images/eye-dropper.png')}
                    title='เวลาหยอดตา'
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
                </CardImage>
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
                <Button backgroundColor={RED} color='#FFF' onPress={() => console.log('test')}>
                    แจ้งหยอดตา
                </Button>
                <Button backgroundColor={YELLOW} onPress={() => console.log('test2')}>
                    สถิติการหยอดตา
                </Button>
            </ScrollView>
        );
    }
}

const styles = {
    importantCard: {
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        backgroundColor: BLUE, 
        borderRadius: '50%', 
        marginTop: 5,
    }
};

export default HomeScreen;
