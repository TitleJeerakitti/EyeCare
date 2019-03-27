import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { CardImage } from './home_screen';
import { TextContent, Row, Button } from './common';
import { WHITE, BLUE, YELLOW } from '../config';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftEye: ['09:00', '12:00', '18:00'],
            rightEye: ['10:00', '16:00'],
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
                    <TextContent numberOfLines={1}>นาย สมชาย สุดหล่อ</TextContent>
                    <TextContent style={{ }}>62 ปี</TextContent>
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
                    <TextContent style={{ color: BLUE, fontWeight: 'bold', }}>
                        วันอังคาร 16 ตุลาคม 2562
                    </TextContent>
                    <TextContent>โรงพยาบาลธรรมศาสตร์</TextContent>
                </CardImage>
                <Button backgroundColor='red' color='#FFF' onPress={() => console.log('test')}>
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
