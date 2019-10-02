import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SQLite } from 'expo';
import { ORANGE } from '../config';

const historydb = SQLite.openDatabase('history.db');
const eyeDropdb = SQLite.openDatabase('eyedrop.db');

class EyeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            eyeDrop: [],
            dataChart: [],
        };
    }

    componentDidMount() {
        this.historyData();
        this.test();
    }

    historyData() {
        historydb.transaction(tx => {
            tx.executeSql('select * from items where patientID = 1', [], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    _array.forEach(eachEyeDrop => {
                        this.getEyeDrops(eachEyeDrop.eyeDropID);
                    });
                    this.setState({
                        data: _array
                    });
                }
            });
        });
    }

    getEyeDrops(ID) {
        this.setState(this.state.eyeDrop.includes(ID) ? null : { eyeDrop: this.state.eyeDrop.concat(ID) });
    }

    test() {
        const { data, eyeDrop } = this.state
        
        // if(eyeDrop && data){
        //     eyeDrop.forEach(eachEyeDrop => {
        //         data.forEach(eachEle => {
        //             if(eachEyeDrop==eachEle){

        //             }
        //         });
        //     });
        // }

        const result = data.reduce((arr, item) => {
            arr.push({
                x: item.date,
                y: parseInt(item.time),
            });
            return arr;
        }, []);

        console.log("result",result);
        return [
            {
                data: result,
                color: ORANGE
            },
        ];
    }

    render() {
        // console.log("data")
        // console.log(this.state.data);
        // console.log('--------------------------------------------');
        // console.log("eyedrop",this.state.eyeDrop);
        // console.log('--------------------------------------------');
        // console.log(result,this.state.test())
        return (
            <ScrollView>
                <Text>eiei</Text>
            </ScrollView>
        );
    }
}

export default EyeChart;