import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'; 
import { Timer } from 'react-native-stopwatch-timer';
import { CardImage, CardSection, Card, Center } from './common';
import EyeCard from './special/EyeCard';
import { NORMAL } from '../config';

class StopWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalDuration: 10000,
            timerStart: false,
            timerReset: false,
        };
    }

    renderStopWatch() {
        const { data } = this.props;
        if (data.type === NORMAL) {
            return (
                <Card>
                    <Center>
                        <Timer 
                            totalDuration={this.state.totalDuration} 
                            start={this.state.timerStart} 
                            reset={this.state.timerReset} 
                        />
                    </Center>
                </Card>
            );
        }
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
