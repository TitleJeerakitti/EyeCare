import React from 'react';
import { Modal, View, Text, Alert, Dimensions, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Constants, } from 'expo';
import { Center } from './Center';
import { WHITE, DARK_GRAY, BLACK, RED, YELLOW } from '../../config';
import { Row } from './Row';
import { ButtonSmallText } from './ButtonSmallText';
import { Card } from './Card';

const WIDTH = Dimensions.get('window').width * 0.6;

class PopUpPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.date,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.time !== this.props.date) {
            this.setState({ time: this.props.date });
        }
    }

    render() {
        const { visible, onCancel, onConfirm, } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <Center style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
                    <View style={styles.container}>
                        <Center>
                            <Text>เลือกเวลาที่ต้องการ</Text>
                            <DatePicker 
                                date={this.state.time}
                                onDateChange={(val) => this.setState({ time: val })}
                                mode='time'
                                confirmBtnText='Confirm'
                                cancelBtnText='Cancel'
                                showIcon={false}
                                style={{
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
                            />
                        </Center>
                        <Card>
                            <Row>
                                <ButtonSmallText
                                    onPress={onCancel}
                                    backgroundColor={RED}
                                    color={WHITE}
                                    style={{ marginRight: 10, }}
                                >
                                    Cancel
                                </ButtonSmallText>
                                <ButtonSmallText 
                                    onPress={onConfirm}
                                    backgroundColor={YELLOW}
                                >
                                    Save
                                </ButtonSmallText>
                            </Row>
                        </Card>
                    </View>
                </Center>
            </Modal>
        );
    }
}

const styles = {
    container: {
        backgroundColor: WHITE, 
        borderRadius: 10, 
        padding: 10, 
        width: WIDTH,
    }
};

export { PopUpPicker };
