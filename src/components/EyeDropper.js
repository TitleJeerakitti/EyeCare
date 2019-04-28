import React from 'react';
import { ScrollView } from 'react-native';
import { SQLite } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
    TextHeader, 
    Card,
} from './common';
import EyeCard from './special/EyeCard';
import { selectEyeDrop } from '../actions';

const orderdb = SQLite.openDatabase('order.db');
const timedb = SQLite.openDatabase('time.db');

class EyeDropper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
        };
    }

    componentDidMount() {
        this.orderData();
    }

    onClickEyeCard(item) {
        this.props.selectEyeDrop(item);
        Actions.stopwatch({ isNow: true });
    }

    orderData() {
        orderdb.transaction(tx => {
            tx.executeSql('select * from items where patientID = 1', [], (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    this.timeData(_array);
                }
            });
        });    
    }

    timeData(order) {
        timedb.transaction(tx => {
            order.forEach((eachOrder) => {
                tx.executeSql('select * from items where orderID = ?', [eachOrder.id], (_, { rows: { _array } }) => {
                    this.setState({
                        data: this.state.data.concat({ order: eachOrder, time: _array })
                    }, console.log(this.state.data));
                    //console.log(this.state.data);
                });
            });
        });  
    }

    renderEyeCard() {
        return this.state.data.map((item, index) => 
            <EyeCard key={index} item={item} onPress={() => this.onClickEyeCard(item)} />
        );
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Card>
                    <TextHeader fontWeight='bold'>
                        ยาหยอดตา
                    </TextHeader>
                </Card>
                {this.renderEyeCard()}
            </ScrollView>
        );
    }
}

export default connect(null, { selectEyeDrop })(EyeDropper);
