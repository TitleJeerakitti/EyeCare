import React from 'react';
import { View, Text, } from 'react-native';
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
            date: '09.00',
            order: null,
            time: null,
        };
    }

    componentDidMount() {
        this.orderData();
    }

    orderData() {
        orderdb.transaction(tx => {
            tx.executeSql('select * from items where patientID = 1 and eyeDropID = ?', [this.props.data.id], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    _array.forEach((eachOrder) => {
                        this.setState({
                            order: eachOrder,
                            left: eachOrder.left,
                            right: eachOrder.right,
                            isAbnormal: eachOrder.type
                        }, this.timeData(eachOrder));
                    });
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
                console.log(this.state.time);
            });
        });
    }

    addTime() {
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
            timedb.transaction(tx => {
                tx.executeSql('insert into items (orderID, time) values (?,?)', [this.state.order.id, this.state.date]);
            });
        }
        this.orderData();
        //this.checkData();
    }

    // checkData() {
    //     orderdb.transaction(tx => {
    //         tx.executeSql('select * from items', [], (_, { rows }) =>
    //             console.log(JSON.stringify(rows))
    //         );
    //     });
    //     timedb.transaction(tx => {
    //         tx.executeSql('select * from items', [], (_, { rows }) =>
    //             console.log(JSON.stringify(rows))
    //         );
    //     });
    // }

    renderTimeList(times = []) {
        return times.map((item, index) =>
            <Button
                key={index}
                onPress={() => this.setState({ date: item, visible: true })}
                backgroundColor={WHITE}
            >
                {item}
            </Button>
        );
    }

    renderDetailList(details = []) {
        return details.map((item, index) =>
            <Text key={index}>- {item}</Text>
        );
    }

    render() {
        const { data } = this.props;
        const { isAbnormal, left, right, date, visible } = this.state;
        //console.log(this.state);
        return (
            <View>
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
                                //console.log('save change');
                            }}
                            backgroundColor={right ? BLUE : WHITE}
                            color={right ? WHITE : BLACK}
                        >
                            ตาขวา
                        </ButtonSmallText>
                    </Row>
                </Card>
                {this.renderTimeList(data.time)}
                <Card>
                    <ButtonIconWithText
                        title='เพิ่มเวลาหยอดตา'
                        iconName='add'
                        iconBg={RED}
                        iconColor={WHITE}
                        onPress={() => this.setState({ visible: true })}
                    />
                </Card>
                <PopUpPicker
                    date={date}
                    visible={visible}
                    onDateChange={(time) => this.setState({ date: time })}
                    onCancel={() => this.setState({ visible: false })}
                    onConfirm={() => this.addTime()}
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
