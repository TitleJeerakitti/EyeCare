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
      dataSet: [],
      eiei: true
    };
  }
  //id integer primary key not null, patientID int, eyeDropID int, date text, time text
  makeData() {
    if (this.state.eiei) {
      this.setState({
        data: [
          {
            id: 1,
            patientID: 1,
            eyeDropID: 1,
            date: "2019-10-3",
            time: "9.01"
          },
          {
            id: 2,
            patientID: 1,
            eyeDropID: 1,
            date: "2019-10-3",
            time: "12.30"
          },
          {
            id: 3,
            patientID: 1,
            eyeDropID: 1,
            date: "2019-10-3",
            time: "18.10"
          },
          {
            id: 4,
            patientID: 1,
            eyeDropID: 2,
            date: "2019-10-3",
            time: "9.10"
          },
          {
            id: 5,
            patientID: 1,
            eyeDropID: 2,
            date: "2019-10-3",
            time: "13.22"
          },
          {
            id: 6,
            patientID: 1,
            eyeDropID: 3,
            date: "2019-10-4",
            time: "11.00"
          }
        ],
        eyeDrop: [1, 2, 3]
      });
      this.setState.eiei = false;
    }
  }

  componentWillReceiveProps() {
    // this.historyData();
    // this.makeData();
    // this.createDataSet();
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

  createDataSet() {
    const { data, eyeDrop, dataSet } = this.state;
    let result = [],
      result2 = [],
      result3 = [];
    if (eyeDrop && data) {
      eyeDrop.forEach(eachEyeDrop => {
        result = [];
        result2 = [];
        result3 = [];
        data.forEach(eachEle => {
          if (eachEyeDrop == eachEle.eyeDropID) {
            result.push({
              x: eachEle.date,
              y: parseFloat(eachEle.time)
            });
          }
        });

        result.forEach((eachResult, i) => {
          if (i + 1 < result.length) {
            if (result[i].x == result[i + 1].x) {
              result2.push({
                x: result[i + 1].x,
                y: result[i + 1].y
              });
              result.splice(i + 1, 1);
            }
          }
        });

        result.forEach((eachResult, i) => {
          if (i + 1 < result.length) {
            if (result[i].x == result[i + 1].x) {
              result3.push({
                x: result[i + 1].x,
                y: result[i + 1].y
              });
              result.splice(i + 1, 1);
            }
          }
        });

        if (result.length > 0 && result2.length > 0 && result3.length > 0) {
          dataSet[parseInt(eachEyeDrop)] = [
            {
              data: result,
              color: "#90EE90"
            },
            {
              data: result2,
              color: "#FFA07A"
            },
            {
              data: result3,
              color: "#87CEFA"
            }
          ];
        } else if (
          result.length > 0 &&
          result2.length > 0 &&
          result3.length == 0
        ) {
          dataSet[parseInt(eachEyeDrop)] = [
            {
              data: result,
              color: "#90EE90"
            },
            {
              data: result2,
              color: "#FFA07A"
            }
          ];
        } else if (
          result.length > 0 &&
          result2.length == 0 &&
          result3.length == 0
        ) {
          dataSet[parseInt(eachEyeDrop)] = [
            {
              data: result,
              color: "#90EE90"
            }
          ];
        }
      });
    }
  }

  render() {
    const { data, eyeDrop, dataSet } = this.state;
    if (eyeDrop[eyeDrop.length - 1] != dataSet.length - 1) {
      this.createDataSet();
    }

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
