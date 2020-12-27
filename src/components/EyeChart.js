import React from "react";
import { ScrollView, Text, View } from "react-native";
import * as SQLite from 'expo-sqlite';
import PureChart from "react-native-pure-chart";
import TextHeader from "../components/common/TextHeader";

const historydb = SQLite.openDatabase("history.db");
const eyeDropdb = SQLite.openDatabase("eyedrop.db");

class EyeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      eyeDrop: [],
      eyeDropdb: [],
      dataSet: [],
      name: []
    };
  }

  componentDidMount() {
    this.historyData();
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
    this.state.eyeDrop.reverse()
    this.queryName();
  }

  queryName() {
    eyeDropdb.transaction(tx => {
      tx.executeSql("select * from items ", [], (_, { rows: { _array } }) => {
        if (_array.length > 0) {
          this.setState({
            eyeDropdb: _array
          });
        }
      });
    });
    this.state.eyeDrop.reverse()
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

  genChart() {
    const { data, eyeDrop, dataSet, eyeDropdb, name } = this.state;
    eyeDropdb.forEach(eachEle => {
      eyeDrop.forEach(eachId => {
        if (eachEle.id == parseInt(eachId)) {
          name.push(eachEle.name);
        }
      });
    });

    return eyeDrop.map((item, index, key) => (
      <View>
        <Text>{name[index]}</Text>
        <PureChart data={dataSet[parseInt(item)]} type="line" />
      </View>
    ));
  }

  render() {
    this.createDataSet();
    return (
      <ScrollView>
        {this.genChart()}
      </ScrollView>
    );
  }
}

export default EyeChart;
