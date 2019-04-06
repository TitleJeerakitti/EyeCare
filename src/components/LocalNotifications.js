import React, { Component } from 'react';
import { TextInput, View, Keyboard } from 'react-native';
import { Constants, Notifications, Permissions } from 'expo';

export default class Timer extends Component {
    onSubmit(e) {
        Keyboard.dismiss();

        const localNotification = {
            title: 'Eye Care',
            body: 'Time to eyes drop',
            ios: { 
                sound: true 
            },
            android:
            {
                sound: true, 
                //icon : '../../assets/icon.png',
                //priority: 'high',  
                vibrate: true 
            }
        };

        let t = new Date();
        t.setSeconds(t.getSeconds() + 10)

        const schedulingOptions = {
            time: t, // (date or number) 
            //A Date object representing when to fire the notification or a number in Unix epoch time. 
            //Example: (new Date()).getTime() + 1000 is one second from now.
            //repeat : 'minute'

        }

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
    }

    handleNotification() {
        console.warn('ok! got your notif');
    }

    async componentDidMount() {
        // We need to ask for Notification permissions for ios devices
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
        }

        // If we want to do something with the notification when the app
        // is active, we need to listen to notification events and 
        // handle them in a callback
        Notifications.addListener(this.handleNotification);
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TextInput
                    onSubmitEditing={this.onSubmit}
                    placeholder={'time in ms'}
                />
            </View>
        );
    }
};