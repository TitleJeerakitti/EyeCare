import React from "react";
import { ScrollView, Text } from "react-native";
import { SQLite } from "expo";
import { ORANGE } from "../config";

const historydb = SQLite.openDatabase("history.db");
const eyeDropdb = SQLite.openDatabase("eyedrop.db");

class EyeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      eyeDrop: [],
      dataChart: []
    };
  }

  componentDidMount() {
    this.historyData();
    this.test();
  }

  historyData() {
    historydb.transaction(tx => {
      tx.executeSql(
        "select * from items where patientID = 1",
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            _array.forEach(eachEyeDrop => {
              this.getEyeDrops(eachEyeDrop.eyeDropID);
            });
            this.setState({
              data: _array
            });
          }
        }
      );
    });
  }

  getEyeDrops(ID) {
    this.setState(
      this.state.eyeDrop.includes(ID)
        ? null
        : { eyeDrop: this.state.eyeDrop.concat(ID) }
    );
  }

  test() {
    const { data, eyeDrop, dataSet } = this.state;
    let result = [];
    if (eyeDrop && data) {
      eyeDrop.forEach(eachEyeDrop => {
        result = [];
        data.forEach(eachEle => {
          if (eachEyeDrop == eachEle.eyeDropID) {
            result.push({
              x: eachEle.date,
              y: parseFloat(eachEle.time)
            });
          }
        });
        if (result) {
          dataSet[parseInt(eachEyeDrop)] = [
            {
              data: result,
              color: ORANGE
            }
          ];
        }
      });
    }
  }

  render() {
    console.log("dataSet", dataSet);
    console.log("--------------------------------------------");
    return (
      <ScrollView>
        <Text>eiei</Text>
      </ScrollView>
    );
  }
}

export default EyeChart;
