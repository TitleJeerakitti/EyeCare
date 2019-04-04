import React from 'react';
import { View, Text, } from 'react-native';
import { connect } from 'react-redux';
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

class DoctorEyeDropDetail extends React.Component {
    constructor(props) {
        super(props);
        const { type = null, eyePosition = null } = this.props.data;
        this.state = {
            isAbnormal: type === ABNORMAL,
            eyePosition,
            visible: false,
            date: null,
        };
    }

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
        const { isAbnormal, eyePosition, date, visible } = this.state;
        console.log(date);
        return (
            <View>
                <CardImage title={data.name} source={data.image}>
                    <Card>
                        {this.renderDetailList(data.detail)}
                    </Card>
                </CardImage>
                <Card>
                    <Row>
                        <ButtonSmallText 
                            onPress={() => {
                                this.setState({ isAbnormal: !isAbnormal });
                                console.log('save change');
                            }}
                            backgroundColor={isAbnormal ? BLUE : WHITE}
                            color={isAbnormal ? WHITE : BLACK}
                        >
                            กดหัวตา
                        </ButtonSmallText>
                        <ButtonSmallText 
                            onPress={() => {
                                this.setState({ 
                                    eyePosition: eyePosition !== 'LEFT' ? 'LEFT' : null 
                                });
                                console.log('save change');
                            }}
                            backgroundColor={eyePosition === 'LEFT' ? BLUE : WHITE} 
                            color={eyePosition === 'LEFT' ? WHITE : BLACK}
                            style={{ marginHorizontal: 10, }}
                        >
                            ตาซ้าย
                        </ButtonSmallText>
                        <ButtonSmallText 
                            onPress={() => {
                                this.setState({ 
                                    eyePosition: eyePosition !== 'RIGHT' ? 'RIGHT' : null 
                                });
                                console.log('save change');
                            }}
                            backgroundColor={eyePosition === 'RIGHT' ? BLUE : WHITE} 
                            color={eyePosition === 'RIGHT' ? WHITE : BLACK}
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
                    onCancel={() => this.setState({ visible: false, date: null })}
                    onConfirm={() => this.setState({ visible: false, date: null })}
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
