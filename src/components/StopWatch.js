import React from 'react';
import { View, } from 'react-native';
import { connect } from 'react-redux'; 
import { Timer } from 'react-native-stopwatch-timer';
import { Card, Center, Button, TextContent } from './common';
import EyeCard from './special/EyeCard';
import { NORMAL, YELLOW, BLUE, WHITE, RED, ABNORMAL, } from '../config';

class StopWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNow: false,
            totalDuration: 5000,
            timerStart: false,
            timerReset: false,
            totalDurationAbnormal: 3000,
            timerStartAbnormal: false,
            timerResetAbnormal: false,
            isSecond: this.props.data.type === NORMAL,
        };
    }

    renderTimer() {
        if (this.props.data.type === ABNORMAL) {  
            return (
                <Card>
                    <Center>
                            <TextContent>กดหัวตา</TextContent>
                        <Timer 
                            totalDuration={this.state.totalDurationAbnormal} 
                            start={this.state.timerStartAbnormal} 
                            reset={this.state.timerResetAbnormal} 
                            handleFinish={() => this.setState({ 
                                isSecond: true, 
                                timerStartAbnormal: false 
                            })}
                        />
                    </Center>
                </Card>
            );
        }
    }

    renderStopWatch() {
        const { 
            isNow, 
            timerStart, 
            timerReset, 
            totalDuration, 
            isSecond, 
            timerStartAbnormal, 
        } = this.state;
        if (!isNow) {
            return (
                <View>
                    <Button 
                        onPress={() => this.setState({ isNow: true })}
                        backgroundColor={BLUE} 
                        color={WHITE}
                    >
                        หยอดยาตอนนี้
                    </Button>
                    <Button
                        onPress={() => console.log('change time')}
                        backgroundColor={BLUE} 
                        color={WHITE}
                    >
                        เลื่อนเวลาหยอดตา
                    </Button>
                    <Button
                        onPress={() => console.log('already dropped')}
                        backgroundColor={BLUE} 
                        color={WHITE}
                    >
                        หยอดตาแล้ว
                    </Button>
                </View>
            );
        }
        return (
            <View>
                {this.renderTimer()}
                <Card>
                    <Center>
                            <TextContent>หยอดตา</TextContent>
                        <Timer 
                            totalDuration={totalDuration} 
                            start={timerStart} 
                            reset={timerReset} 
                            handleFinish={() => {
                                console.log('finish');
                                this.setState({ timerStart: false });
                            }}
                        />
                    </Center>
                </Card>
                <Button 
                    onPress={() => this.setState(isSecond ? { 
                        timerStart: !timerStart, 
                        timerReset: false 
                    } : {
                        timerStartAbnormal: !timerStartAbnormal, 
                        timerResetAbnormal: false 
                    })}
                    backgroundColor={YELLOW}
                >
                    {isSecond ? 'จับเวลาต่อ' : 'เริ่มจับเวลา'}
                </Button>
                <Button 
                    onPress={() => this.setState(isSecond ? { 
                        timerReset: true, 
                        timerStart: false 
                    } : {
                        timerResetAbnormal: true, 
                        timerStartAbnormal: false 
                    })}
                    backgroundColor={RED}
                    color={WHITE}
                >
                    ยกเลิก
                </Button>
                <Button 
                    onPress={() => console.log('success')}
                    backgroundColor={BLUE}
                    color={WHITE}
                >
                    หยอดตาสำเร็จ
                </Button>
            </View>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <View>
                <EyeCard
                    item={data}
                    disabled
                />
                {this.renderStopWatch()}
            </View>
        );
    }
}

const mapStateToProps = ({ eyeDrop }) => {
    const { data } = eyeDrop;
    return { data };
};

export default connect(mapStateToProps)(StopWatch);
