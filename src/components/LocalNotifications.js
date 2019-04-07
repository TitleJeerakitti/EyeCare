import React, { Component } from 'react';
import { TextInput, View, Keyboard } from 'react-native';
import { Constants, Notifications, Permissions } from 'expo';

export default class Timer extends Component {
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

    componentDidMount() {
        this.obtainNotificationPermission();
        this.listenForNotifications();
    }

    scheduleNotification(){
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
            time: new Date().getTime() + 120000
        }
    
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
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