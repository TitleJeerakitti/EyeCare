import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import PureChart from 'react-native-pure-chart';

export default class EyeChart extends Component {
    render() {
        let sampleData1 = [
            {
                seriesName: 'Morning',
                data: [
                    { x: '2018-04-01', y: 9.21 },
                    { x: '2018-04-02', y: 9.11 },
                    { x: '2018-04-03', y: 9.15 },
                    { x: '2018-04-04', y: 9.17 },
                    { x: '2018-04-05', y: 8.55 },
                    { x: '2018-04-06', y: 9.13 },
                    { x: '2018-04-07', y: 8.51 }
                ],
                color: 'gray'
            },
            {
                seriesName: 'Afternoon',
                data: [
                    { x: '2018-04-01', y: 12.01 },
                    { x: '2018-04-02', y: 11.55 },
                    { x: '2018-04-03', y: 12.13 },
                    { x: '2018-04-04', y: 11.51 },
                    { x: '2018-04-05', y: 12.21 },
                    { x: '2018-04-06', y: 12.22 },
                    { x: '2018-04-07', y: 12.11 }
                ],
                color: 'orange'
            },
            {
                seriesName: 'Evening',
                data: [
                    { x: '2018-04-01', y: 17.11 },
                    { x: '2018-04-02', y: 16.51 },
                    { x: '2018-04-03', y: 17.01 },
                    { x: '2018-04-04', y: 17.21 },
                    { x: '2018-04-05', y: 17.17 },
                    { x: '2018-04-06', y: 17.01 },
                    { x: '2018-04-07', y: 17.11 }
                ],
                color: 'blue'
            }
        ]

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

        let sampleData3 = [
            {
                seriesName: 'Morning',
                data: [
                    { x: '2018-04-01', y: 8.21},
                    { x: '2018-04-02', y: 9.01 },
                    { x: '2018-04-03', y: 8.41 },
                    { x: '2018-04-04', y: 9.11 },
                    { x: '2018-04-05', y: 9.01 },
                    { x: '2018-04-06', y: 10.01 },
                    { x: '2018-04-07', y: 9.11 }
                ],
                color: 'gray'
            },
            {
                seriesName: 'Evening',
                data: [
                    { x: '2018-04-01', y: 17.00},
                    { x: '2018-04-02', y: 17.17 },
                    { x: '2018-04-03', y: 16.40 },
                    { x: '2018-04-04', y: 17.15 },
                    { x: '2018-04-05', y: 16.50 },
                    { x: '2018-04-06', y: 16.30 },
                    { x: '2018-04-07', y: 17.40 }
                ],
                color: 'blue'
            }
        ]
        return (
            <ScrollView>
                <Text>
                    Latanoprost 0.005% - Xalatan Pfizer Inc.
                </Text>
                <PureChart
                    data={sampleData1}
                    type='line'
                    numberOfYAxisGuideLine = {0}
                />
                <Text>
                    Bimatoptost 0.03% - Lumigan Allergan Inc.
                </Text>
                <PureChart
                    data={sampleData2}
                    type='line'
                    numberOfYAxisGuideLine = {0}
                />
                <Text>
                    Dorzolamide HCI 2% - Trusopt Merck & Co. Inc.
                </Text>
                <PureChart
                    data={sampleData3}
                    type='line'
                    numberOfYAxisGuideLine = {0}
                />
            </ScrollView>
        );
    }
}