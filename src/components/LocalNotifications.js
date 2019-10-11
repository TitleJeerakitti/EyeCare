import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Notifications } from "expo";

import * as Permissions from 'expo-permissions';

export default class App extends React.Component {

    askPermissions = async () => {
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );

        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            return false;
        }
        return true;
    };

    _handleNotification = notification => {
        if (notification.origin === 'selected') {
            console.log('OrderID', notification);
        }
    };

    sendNotificationImmediately = async () => {
        let notificationId = await Notifications.presentLocalNotificationAsync({
            title: "This is crazy",
            body: "Your mind will blow after reading this",
            data: { orderID: 3 },
            categoryId: 'eyedrop-alarm',
            android: {
                channelId: 'eyedrop-alarm',
                icon: './images/eye-dropper.png',
                color: '#FF7F50'
            },
        });
        console.log(notificationId); // can be saved in AsyncStorage or send to server
    };

    sendNotificationImmediately2 = async () => {
        let notificationId = await Notifications.presentLocalNotificationAsync({
            title: "This is crazy",
            body: "Your mind will blow after reading this",
            data: { orderID: 3 },
            categoryId: 'eyedrop-alarm',
            android: {
                channelId: 'eyedrop-alarm',
                icon: '',
                color: '#000000'
            },
        });
        console.log(notificationId); // can be saved in AsyncStorage or send to server
    };

    sendNotificationImmediately3 = async () => {
        let notificationId = await Notifications.presentLocalNotificationAsync({
            title: "This is crazy",
            body: "Your mind will blow after reading this",
            data: { orderID: 3 },
            categoryId: 'eyedrop-alarm',
            android: {
                channelId: 'eyedrop-alarm',
                icon: 'eye-dropper.png',
                color: '#FFFFFF'
            },
        });
        console.log(notificationId); // can be saved in AsyncStorage or send to server
    };

    scheduleNotification = async () => {
        let notificationId = Notifications.scheduleLocalNotificationAsync(
            {
                title: "I'm Scheduled",
                body: "Wow, I can show up even when app is closed",
                android: {
                    sound: true,
                },
            },
            {
                repeat: "minute",
                time: new Date().getTime() + 10000
            }
        );
        console.log(notificationId);
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Please accept Notifications Permissions"
                    onPress={() => this.askPermissions()}
                />
                <Button
                    title="Send Notification immediately"
                    onPress={() => this.sendNotificationImmediately()}
                />
                <Button
                    title="Send Notification immediately2"
                    onPress={() => this.sendNotificationImmediately2()}
                />
                <Button
                    title="Send Notification immediately3"
                    onPress={() => this.sendNotificationImmediately3()}
                />
                <Button
                    title="Dismiss All Notifications"
                    onPress={() => Notifications.dismissAllNotificationsAsync()}
                />
                <Button
                    title={"Schedule Notification"}
                    onPress={() => this.scheduleNotification()}
                />
                <Button
                    title="Cancel Scheduled Notifications"
                    onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});