import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SQLite } from 'expo';
import GenChart from './special/GenChart';
import { green } from 'ansi-colors';

const historydb = SQLite.openDatabase('history.db');
const eyeDropdb = SQLite.openDatabase('eyedrop.db');

class EyeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            eyeDrop: [],
        };
    }

    componentDidMount() {
        this.historyData();
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

    // createDataSets() {
    //     historydb.transaction(tx => {
    //         this.state.eyeDrop.forEach(eachId => {
    //             tx.executeSql('select * from items where id = ?', [eachId], (_, { rows: { _array } }) => {
    //                 if (_array.length > 0) {
    //                     const result = _array.reduce((arr, item) => {
    //                         arr.push({
    //                             x : item.date, //use moment
    //                             y : item.date //use moment
    //                         });
    //                         return arr;
    //                     }, []);
    //                     return [
    //                         {
    //                             seriesName : 'series1',
    //                             data : result,
    //                             color : green
    //                         }
    //                     ]
    //                 }
    //             });
    //         });
    //     });
    // }

    renderGenChart(){
        // console.log('eieieieieiieieieieieieiieiei');
        return this.state.data.map((item, index) => 
            <GenChart key={index} item={item} />
        ); 
    }

    render() {
        console.log(this.state.data);
        console.log('--------------------------------------------');
        console.log(this.state.eyeDrop);
        console.log('--------------------------------------------');
        console.log(this.state.name);
        return (
            <ScrollView>
                {this.renderGenChart()}
            </ScrollView>
        );
    }
}

export default EyeChart;