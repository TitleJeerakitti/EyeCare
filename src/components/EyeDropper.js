import React from 'react';
import { ScrollView, Platform, Alert } from 'react-native';
import { SQLite } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
    TextHeader, 
    Card,
} from './common';
import EyeCard from './special/EyeCard';
import { NORMAL, ABNORMAL } from '../config';
import { selectEyeDrop } from '../actions';
import { Constants, Notifications, Permissions } from 'expo';

const orderdb = SQLite.openDatabase('order.db');
const timedb = SQLite.openDatabase('time.db');

class EyeDropper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
        };
    }

    componentDidMount() {
        this.orderData();
        this.obtainNotificationPermission();
        this.listenForNotifications();
    }

    onClickEyeCard(item) {
        this.props.selectEyeDrop(item);
        Actions.stopwatch();
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

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
            if (permission.status !== 'granted') {
                console.log('Permission not granted to show notification');
            }
        }
        return permission;
    }

    listenForNotifications = () => {
        Notifications.addListener(notification => {
          if (notification.origin === 'received' && Platform.OS === 'ios') {
            Alert.alert("Eye Care!", "Now, time to eye drop");
          }
        });
      };

    scheduleNotification(){
        // await this.obtainNotificationPermission();
        const localNotification = {
            title: "Eye Care!",
            body: "Now, time to eye drop",
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true
            }
        };
    
        const schedulingOptions = {
            time: new Date().getTime() + 10000 //helppp
        }
    
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
        console.log('Noti done!');
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
                {this.scheduleNotification()}
            </ScrollView>
        );
    }
}

export default connect(null, { selectEyeDrop })(EyeDropper);
