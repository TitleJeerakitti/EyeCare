import React from 'react';
import { View, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { DARK_GRAY, BLACK, YELLOW, RED, WHITE } from '../config';
import { Card, CardSection, Center, Button } from './common';

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
        this.state = {
            time: new Date(),
            date: new Date(),
        };
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
                    onPress={() => console.log('save')}
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
