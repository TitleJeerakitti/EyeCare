import React from 'react';
import { View, Text, ListView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { connect } from 'react-redux';
import { SQLite } from 'expo';
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
        const { type = 0, left = 1, right = 0 } = this.props.data;
        this.state = {
            isAbnormal: type,
            left,
            right,
            visible: false,
            date: '09:00',
            order: null,
            time: [],
            select: null,
        };
    }

    componentDidMount() {
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
                // console.log(this.state.order);
                console.log('timeData', this.state.time);
                this.deleteOrder();
            });
        });
    }

    deleteOrder() {
        const { time, order } = this.state;
        console.log(time.length);
        if (time.length === 0 && order) {
            orderdb.transaction(tx => {
                tx.executeSql('delete from items where id = ?', [order.id], () =>
                    this.setState({ order: null, })
                );
            });
        }
    }

    updateOrder() {
        if (this.state.order !== null) {
            orderdb.transaction(tx => {
                tx.executeSql('update items set doctorID = ? where id = ?', [1, this.state.order.id]);
                tx.executeSql('update items set left = ? where id = ?', [this.state.left, this.state.order.id]);
                tx.executeSql('update items set right = ? where id = ?', [this.state.right, this.state.order.id]);
                tx.executeSql('update items set type = ? where id = ?', [this.state.isAbnormal, this.state.order.id]);
            });
        }
    }

    addTime() {
        const { select } = this.state;
        console.log('add', select);
        if (this.state.order === null) {
            orderdb.transaction(tx => {
                tx.executeSql('insert into items (patientID, doctorID, eyeDropID, start, end, left, right, type) values (?,?,?,?,?,?,?,?)', [1, 1, this.props.data.id, new Date(), new Date(), this.state.left, this.state.right, this.state.isAbnormal],
                    (_, { insertId }) => {
                        timedb.transaction(rx => {
                            rx.executeSql('insert into items (orderID, time) values (?,?)', [insertId, this.state.date]);
                        });
                    }
                );
            });
        } else {
            orderdb.transaction(tx => {
                tx.executeSql('update items set doctorID = ? where id = ?', [1, this.state.order.id]);
                tx.executeSql('update items set left = ? where id = ?', [this.state.left, this.state.order.id]);
                tx.executeSql('update items set right = ? where id = ?', [this.state.right, this.state.order.id]);
                tx.executeSql('update items set type = ? where id = ?', [this.state.isAbnormal, this.state.order.id]);
            });
            const duplicate = () => {
                let dup = false;
                this.state.time.forEach((item) => {  
                    if (this.state.date === item.time) {
                        dup = true;
                    }
                });
                return dup;
            };
            timedb.transaction(tx => {
            if (select === null) {
                if (!duplicate()) {
                    tx.executeSql('insert into items (orderID, time) values (?,?)', [this.state.order.id, this.state.date]);
                }
            } else if (select.time !== this.state.date) {
                if (duplicate()) {
                    tx.executeSql('delete from items where id = ?', [select.id]);
            } else {
                    tx.executeSql('update items set time = ? where id = ?', [this.state.date, select.id]);
                }
            }
            });
        }

        this.setState({ visible: false, select: null });
        this.orderData();
    }

    removeTime(select) {
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
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
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
                                });
                                this.updateOrder();
                                //console.log('save change');
                            }}
                            backgroundColor={isAbnormal ? BLUE : WHITE}
                            color={isAbnormal ? WHITE : BLACK}
                        >
                            กดหัวตา
                        </ButtonSmallText>
                        <ButtonSmallText
                            onPress={() => {
                                this.setState({
                                    left: left === 0 ? 1 : 0
                                });
                                this.updateOrder();
                                //console.log('save change');
                            }}
                            backgroundColor={left ? BLUE : WHITE}
                            color={left ? WHITE : BLACK}
                            style={{ marginHorizontal: 10, }}
                        >
                            ตาซ้าย
                        </ButtonSmallText>
                        <ButtonSmallText
                            onPress={() => {
                                this.setState({
                                    right: right === 0 ? 1 : 0
                                });
                                this.updateOrder();
                                //console.log('save change');
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
