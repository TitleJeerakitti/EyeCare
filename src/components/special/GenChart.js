import React from 'react';
import { ScrollView, Text } from 'react-native';
import PureChart from 'react-native-pure-chart';

export default class GenChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item,
        };
    }

    render(){
        const {item, } = this.props;
        console.log(this.state.data.eyeDropID);
        let sampleData2 = [
            {
                seriesName: 'Evening',
                data: [
                    { x: '2018-04-01', y: 20.01 },
                    { x: '2018-04-02', y: 20.21 },
                    { x: '2018-04-03', y: 19.41 },
                    { x: '2018-04-04', y: 20.15 },
                    { x: '2018-04-05', y: 19.31 },
                    { x: '2018-04-06', y: 20.41 },
                    { x: '2018-04-07', y: 22.01 }
                ],
                color: 'blue'
            }
        ]
        return(
            <ScrollView>
                <Text>
                    Bimatoptost 0.03% - Lumigan Allergan Inc.
                </Text>
                <PureChart
                    data={sampleData2}
                    type='line'
                    numberOfYAxisGuideLine={0}
                />
            </ScrollView>
        );
    }
}

