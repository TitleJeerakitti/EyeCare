import React from 'react';
import { Text, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Row, } from './Row';
import { Input } from './Input';
import { BLACK, DARK_GRAY } from '../../config';

class InputWithText extends React.Component {
    renderInput() {
        const {
            onChangeText, 
            value, 
            placeholder,
            onDateChange, 
            minDate, 
            maxDate 
        } = this.props;
        if (onDateChange) {
            return (
                <DatePicker
                    date={value}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate={minDate}
                    maxDate={maxDate}
                    onDateChange={onDateChange}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    style={{ 
                        flex: 5,
                        marginRight: 10, 
                        marginTop: 10, 
                    }}
                    customStyles={{
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
                    }}
                    showIcon={false}
                />
            );
        }
        return (
            <Input
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={{ flex: 5 }}
            />
        );
    }

    render() {
        const { title, } = this.props;
        return (
            <Row style={{ alignItems: 'center' }}>
                <Text style={{ flex: 2, marginTop: 10, marginLeft: 10 }}>{title}</Text>
                {this.renderInput()}
            </Row>
        );
    }
}

export { InputWithText };
