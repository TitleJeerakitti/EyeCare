import React from 'react';
import { View, ScrollView, Platform, } from 'react-native';
import { Actions, } from 'react-native-router-flux';
import { SQLite, Permissions, Notifications, } from 'expo';
import { NavigationEvents } from "react-navigation";
import { connect } from 'react-redux';
import { TextContent, Row, Button, CardImage, ButtonImage, TimeCard } from './common';
import { BLUE, YELLOW, RED } from '../config';
import { selectEyeDrop } from '../actions';


const patientdb = SQLite.openDatabase('patient.db');
const appointmentdb = SQLite.openDatabase('appointment.db');
const orderdb = SQLite.openDatabase('order.db');
const timedb = SQLite.openDatabase('time.db');

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: {
                name: 'นาย สมชาย สุดหล่อ',
                age: '62',
            },
            leftEye: [],
            rightEye: [],
            appointment: {
                date: '30 พฤศจิกายน 2562',
                time: '16:00',
                place: 'โรงพยาบาลธรรมศาสตร์'
            }
        };
    }

    initialize() {
        this.askPermissions();

        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );

        Notifications.createCategoryAsync('eyedrop-alarm', [
            {
                actionId: 'snooze',
                buttonTitle: 'Snooze',
                isDestructive: true,
                isAuthenticationRequired: false,
            },
            // {
            //   actionId: 'reply',
            //   buttonTitle: 'Reply',
            //   textInput: { submitButtonTitle: 'Reply', placeholder: 'Type Something' },
            //   isAuthenticationRequired: false,
            // },
        ]);

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('eyedrop-alarm', {
              name: 'Eye Drops Alarm',
              sound: true,
              priority: 'high',
              vibrate: true,
            });
          }

        this.patientData();
        this.appointmentData();
        this.orderData();
    }

    askPermissions = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return false;
        }
        return true;
    };

    _handleNotification = notification => {
        if (notification.origin === 'selected') {
            console.log('OrderID', notification);
            orderdb.transaction(tx => {
                tx.executeSql('select * from items where patientID = 1 and id = ?', [notification.data.orderID], (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        this.notificationTimeData(_array[0]);
                    }
                });
            });
        }
    };

    notificationTimeData(order) {
        timedb.transaction(tx => {
            tx.executeSql('select * from items where orderID = ?', [order.id], (_, { rows: { _array } }) => {
                this.props.selectEyeDrop({ order, time: _array });
                Actions.stopwatch({ isNow: false });
            });
        });
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

    orderData() {
        orderdb.transaction(tx => {
            tx.executeSql('select * from items where patientID = 1', [], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    _array.forEach((eachOrder) => this.timeData(eachOrder));
                }
            }, () => console.log('error'));
        });
    }

    timeData(eachOrder) {
        timedb.transaction(tx => {
            tx.executeSql('select * from items where orderID = ?', [eachOrder.id], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    _array.forEach((eachTime) => this.getTime(eachTime.time, eachOrder.left, eachOrder.right));
                }
            }, () => console.log('error'));
        });
    }

    getTime(time, left, right) {
        if (left === 1) {
            this.setState(this.state.leftEye.includes(time) ? null : { leftEye: this.state.leftEye.concat(time) });
        }
        if (right === 1) {
            this.setState(this.state.rightEye.includes(time) ? null : { rightEye: this.state.rightEye.concat(time) });
        }
    }

    renderTimeSlot(data) {
        return data.map((item, index) =>
            <TimeCard key={index}>{item}</TimeCard>
        );
    }

    render() {
        const { leftEye, rightEye } = this.state;
        return (
            <ScrollView>
                <NavigationEvents
                    onWillFocus={() => {
                        this.initialize();
                    }}
                    onDidBlur={() => {
                        this.setState({
                            leftEye: [],
                            rightEye: []
                        });
                    }}
                />
                <ButtonImage
                    onPress={() => Actions.edit_profile()}
                    source={require('../images/user.png')}
                    title='ข้อมูลผู้ป่วย'
                    notHorizontal
                >
                    <TextContent numberOfLines={1}>{this.state.patient.name}</TextContent>
                    <TextContent style={{}}>{this.state.patient.age} ปี</TextContent>
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
                            {this.renderTimeSlot(leftEye.sort())}
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <TextContent>ตาขวา</TextContent>
                            {this.renderTimeSlot(rightEye.sort())}
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

export default connect(null, { selectEyeDrop })(HomeScreen);
