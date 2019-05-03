import React from 'react';
import { View, Text, ListView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { connect } from 'react-redux';
import { SQLite, Notifications, } from 'expo';
import {
    CardImage,
    Card,
    Row,
    ButtonSmallText,
    ButtonIconWithText,
    PopUpPicker,
    Button
} from './common';
import { BLUE, WHITE, RED, BLACK, ABNORMAL } from '../config';

const orderdb = SQLite.openDatabase('order.db');
const timedb = SQLite.openDatabase('time.db');

class DoctorEyeDropDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAbnormal: 0,
            left: 1,
            right: 0,
            visible: false,
            date: '09:00',
            order: null,
            time: [],
            select: null,
        };
    }

    componentDidMount() {
        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // }
        this.orderData();
    }

    orderData() {
        orderdb.transaction(tx => {
            tx.executeSql('select * from items where patientID = 1 and eyeDropID = ?', [this.props.data.id], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    this.setState({
                        order: _array[0],
                        left: _array[0].left,
                        right: _array[0].right,
                        isAbnormal: _array[0].type
                    });
                    this.timeData(_array[0]);
                }
            });
        });
    }

    timeData(eachOrder) {
        timedb.transaction(tx => {
            tx.executeSql('select * from items where orderID = ?', [eachOrder.id], (_, { rows: { _array } }) => {
                this.setState({
                    time: _array
                });
                console.log(this.state.order);
                console.log('timeData', this.state.time);
                this.deleteOrder();
            });
        });
    }

    deleteOrder() {
        const { time, order } = this.state;
        if (time.length === 0 && order) {
            orderdb.transaction(tx => {
                tx.executeSql('delete from items where id = ?', [order.id], () =>
                    this.setState({ order: null, })
                );
            });
        }
    }

    updateOrder() {
        const { left, right, isAbnormal, order } = this.state;
        if (order !== null) {
            orderdb.transaction(tx => {
                console.log('type', isAbnormal);
                tx.executeSql('update items set doctorID = ? where id = ?', [1, order.id]);
                tx.executeSql('update items set left = ? where id = ?', [left, order.id]);
                tx.executeSql('update items set right = ? where id = ?', [right, order.id]);
                tx.executeSql('update items set type = ? where id = ?', [isAbnormal, order.id]);
            });
            timedb.transaction(tx => {
                tx.executeSql('select * from items where orderID = ?', [order.id], (_, { rows: { _array } }) => {
                    _array.forEach((time) => {
                        this.cancelScheduledNotification(time);
                        this.scheduleNotification(order.id, time.time).then((notificationId) => {
                            timedb.transaction(rx => {
                                rx.executeSql('update items set notificationID = ? where id = ?', [notificationId, time.id]);
                            });
                        });
                    });
                });
            });
        }
    }

    addTime() {
        const { select, left, right, isAbnormal, date, order, time } = this.state;
        console.log('edit', select);
        if (order === null) {
            orderdb.transaction(tx => {
                tx.executeSql('insert into items (patientID, doctorID, eyeDropID, start, end, left, right, type) values (?,?,?,?,?,?,?,?)', [1, 1, this.props.data.id, new Date(), new Date(), left, right, isAbnormal],
                    async (_, { insertId }) => {
                        const notificationId = await this.scheduleNotification(insertId, date);
                        timedb.transaction(rx => {
                            rx.executeSql('insert into items (orderID, time, notificationID) values (?,?,?)', [insertId, date, notificationId], () => this.orderData());
                        });
                    }
                );
            });
        } else {
            const duplicate = () => {
                let dup = false;
                time.forEach((item) => {
                    if (date === item.time) {
                        dup = true;
                    }
                });
                return dup;
            };
            if (select === null) {
                if (!duplicate()) {
                    this.scheduleNotification(order.id, date).then((notificationId) => {
                        timedb.transaction(tx => {
                            tx.executeSql('insert into items (orderID, time, notificationID) values (?,?,?)', [order.id, date, notificationId], () => this.orderData());
                        });
                    });
                }
            } else if (select.time !== date) {
                if (duplicate()) {
                    this.cancelScheduledNotification(select);
                    timedb.transaction(tx => {
                        tx.executeSql('delete from items where id = ?', [select.id], () => this.orderData());
                    });
                } else {
                    this.cancelScheduledNotification(select);
                    this.scheduleNotification(order.id, date).then((notificationId) => {
                        timedb.transaction(tx => {
                            tx.executeSql('update items set time = ? where id = ?', [date, select.id],
                                tx.executeSql('update items set notificationID = ? where id = ?', [notificationId, select.id],
                                    () => this.orderData()));
                        });
                    });
                }
            }
        }

        this.setState({ visible: false, select: null });
    }

    removeTime(select) {
        this.cancelScheduledNotification(select);
        timedb.transaction(tx => {
            tx.executeSql('delete from items where id = ?', [select.id]);
        });
        this.setState({ visible: false, select: null });
        this.orderData();
    }

    removeAllTime() {
        const { time } = this.state;
        time.forEach(item => this.removeTime(item));
    }

    scheduleNotification(orderID, time) {
        const timeArray = time.split(':');
        const { left, right, isAbnormal } = this.state;
        let eyeSide = '';
        let type = '';
        if (left && right) {
            eyeSide = 'หยอดตาทั้งสองข้าง';
        } else if (left) {
            eyeSide = 'หยอดตาซ้าย';
        } else {
            eyeSide = 'หยอดตาขวา';
        }
        if (isAbnormal) {
            type = '(กดหัวตา)';
        }
        const date = new Date();
        const scheduleTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(timeArray[0], 0), parseInt(timeArray[1], 0));
        if (scheduleTime < date) {
            scheduleTime.setDate(scheduleTime.getDate() + 1);
        }
        const notificationId = Notifications.scheduleLocalNotificationAsync(
            {
                title: `${this.props.data.name}`,
                body: `${eyeSide} ${type}`,
                data: {
                    orderID,
                    eyedropName: this.props.data.name
                },
                //categoryId: 'eyedrop-alarm',
                android: {
                    channelId: 'eyedrop-alarm',
                    color: '#FF7F50'
                },
                ios: {
                    sound: true,
                }
            },
            {
                repeat: 'day',
                time: scheduleTime.getTime(),
            },
        );
        return notificationId;
    }

    cancelScheduledNotification(select) {
        Notifications.cancelScheduledNotificationAsync(select.notificationID);
        Notifications.dismissNotificationAsync(select.notificationID);
    }

    renderListView(data) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
    }

    renderTimeList(item) {
        return (
            <Button
                onPress={() => this.setState({ date: item.time, select: item, visible: true })}
                backgroundColor={WHITE}
            >
                {item.time}
            </Button>
        );
    }

    renderFooter() {
        return (
            <View style={{ marginBottom: 10, }}>
                <Card>
                    <ButtonIconWithText
                        title='เพิ่มเวลาหยอดตา'
                        iconName='add'
                        iconBg={RED}
                        iconColor={WHITE}
                        onPress={() => this.setState({ visible: true })}
                    />
                </Card>
                <Button
                    onPress={() => this.removeAllTime()}
                    backgroundColor={RED}
                    color={WHITE}
                >
                    ลบการจ่ายยาตัวนี้
                </Button>
            </View>
        );
    }

    renderDetailList(details = []) {
        return details.map((item, index) =>
            <Text key={index}>- {item}</Text>
        );
    }

    render() {
        LayoutAnimation.spring();
        const { data } = this.props;
        const { isAbnormal, left, right, date, visible } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <CardImage title={data.name} source={{ uri: data.image }}>
                    <Card>
                        {this.renderDetailList(data.detail.split(','))}
                    </Card>
                </CardImage>
                <Card>
                    <Row>
                        <ButtonSmallText
                            onPress={() => {
                                this.setState({
                                    isAbnormal: isAbnormal === 0 ? 1 : 0
                                }, () => this.updateOrder());
                                //this.updateOrder();
                                //console.log('save change');
                            }}
                            backgroundColor={isAbnormal ? BLUE : WHITE}
                            color={isAbnormal ? WHITE : BLACK}
                        >
                            กดหัวตา
                        </ButtonSmallText>
                        <ButtonSmallText
                            onPress={() => {
                                if (right === 1) {
                                    this.setState({
                                        left: left === 0 ? 1 : 0
                                    }, () => this.updateOrder());
                                    //this.updateOrder();
                                    //console.log('save change');
                                }
                            }}
                            backgroundColor={left ? BLUE : WHITE}
                            color={left ? WHITE : BLACK}
                            style={{ marginHorizontal: 10, }}
                        >
                            ตาซ้าย
                        </ButtonSmallText>
                        <ButtonSmallText
                            onPress={() => {
                                if (left === 1) {
                                    this.setState({
                                        right: right === 0 ? 1 : 0
                                    }, () => this.updateOrder());
                                    //this.updateOrder();
                                    //console.log('save change');
                                }
                            }}
                            backgroundColor={right ? BLUE : WHITE}
                            color={right ? WHITE : BLACK}
                        >
                            ตาขวา
                        </ButtonSmallText>
                    </Row>
                </Card>
                {/* {this.renderTimeList(this.state.time)} */}
                <ListView
                    dataSource={this.renderListView(this.state.time)}
                    // style={{ flex: 1, }}
                    enableEmptySections
                    renderRow={(item) => this.renderTimeList(item)}
                    renderFooter={() => this.renderFooter()}
                />
                <PopUpPicker
                    date={date}
                    visible={visible}
                    onDateChange={(time) => this.setState({ date: time })}
                    onCancel={() => this.setState({ visible: false, select: null })}
                    onConfirm={() => this.addTime()}
                    onDelete={() => this.removeTime(this.state.select)}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ doctor }) => {
    const { data } = doctor;
    return { data };
};

export default connect(mapStateToProps)(DoctorEyeDropDetail);
