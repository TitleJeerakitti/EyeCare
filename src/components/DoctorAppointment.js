import React from 'react';
import { View, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { SQLite } from 'expo';
import { DARK_GRAY, BLACK, YELLOW, RED, WHITE } from '../config';
import { Card, CardSection, Center, Button } from './common';

const appointmentdb = SQLite.openDatabase('appointment.db');

const datePickerStyles = {
    dateInput: {
        padding: 10,
        borderColor: DARK_GRAY,
        borderRadius: 10,
        height: 'auto',
    },
    dateTouchBody: {
        height: 'auto',
    },
    dateText: {
        color: BLACK,
    }
};

class DoctorAppointment extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            time: `${date.getHours()}:${date.getMinutes()}`,
            date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        };
    }

    makeAppointment() {
        appointmentdb.transaction(
            tx => {
                tx.executeSql('update items set date = ? where id = ?', [this.state.date, 1]);
                tx.executeSql('update items set time = ? where id = ?', [this.state.time, 1]);
            }
        );
        Actions.pop();
        //Actions.home();
    }

    render() {
        return (
            <View>
                <Card>
                    <CardSection>
                        <Center>
                            <DatePicker
                                date={this.state.date}
                                onDateChange={(val) => this.setState({ date: val })}
                                format={'DD-MM-YYYY'}
                                minDate={new Date()}
                                confirmBtnText='Confirm'
                                cancelBtnText='Cancel'
                                customStyles={datePickerStyles}
                                style={{ width: 200 }}
                            />
                            <DatePicker
                                date={this.state.time}
                                onDateChange={(val) => this.setState({ time: val })}
                                mode='time'
                                confirmBtnText='Confirm'
                                cancelBtnText='Cancel'
                                showIcon={false}
                                style={{
                                    width: 200,
                                    marginTop: 10,
                                }}
                                customStyles={datePickerStyles}
                            />
                        </Center>
                    </CardSection>
                </Card>
                <Button
                    backgroundColor={YELLOW}
                    onPress={() => this.makeAppointment()}
                >
                    บันทึก
                </Button>
                <Button
                    backgroundColor={RED}
                    color={WHITE}
                    onPress={() => Actions.pop()}
                >
                    ยกเลิก
                </Button>
            </View>
        );
    }
}

export default DoctorAppointment;
