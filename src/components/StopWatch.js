import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Timer } from "react-native-stopwatch-timer";
import { Actions } from "react-native-router-flux";
import { Card, Center, Button, TextContent } from "./common";
import EyeCard from "./special/EyeCard";
import { NORMAL, YELLOW, BLUE, WHITE, RED, ABNORMAL } from "../config";
import { Notifications, SQLite } from "expo";

const historydb = SQLite.openDatabase("history.db");

class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNow: this.props.isNow,
      totalDuration: 5000,
      timerStart: false,
      timerReset: false,
      totalDurationAbnormal: 60000,
      timerStartAbnormal: false,
      timerResetAbnormal: true,
      isSecond: this.props.data.order.type === 0
    };
  }

  renderTimer() {
    if (this.props.data.order.type) {
      const { timerStartAbnormal, timerResetAbnormal } = this.state;
      return (
        <View>
          <Card>
            <Center>
              <TextContent>กดหัวตา</TextContent>
              <Timer
                totalDuration={this.state.totalDurationAbnormal}
                start={this.state.timerStartAbnormal}
                reset={this.state.timerResetAbnormal}
                handleFinish={() =>
                  this.setState({
                    isSecond: true,
                    timerStartAbnormal: false
                  })
                }
              />
            </Center>
          </Card>
          <Button
            onPress={() =>
              this.setState(
                timerResetAbnormal
                  ? {
                      timerStartAbnormal: !timerStartAbnormal,
                      timerResetAbnormal: true
                    }
                  : {
                      timerStartAbnormal: !timerStartAbnormal,
                      timerResetAbnormal: false
                    }
              )
            }
            backgroundColor={YELLOW}
          >
            {timerStartAbnormal ? "จับเวลาใหม่" : "เริ่มจับเวลา"}
          </Button>
        </View>
      );
    }
  }

  saveHistory() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + "." + today.getMinutes();
    historydb.transaction(tx => {
      tx.executeSql(
        "insert into items (patientID, eyeDropID, date, time) values (?,?,?,?)",
        [
          this.props.data.order.patientID,
          this.props.data.order.eyeDropID,
          date,
          time
        ]
      );
      tx.executeSql("select * from items", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  renderStopWatch() {
    const {
      isNow,
      timerStart,
      timerReset,
      totalDuration,
      isSecond,
      timerStartAbnormal
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
            onPress={() => {
              this.snoozeNotification();
              Actions.pop();
            }}
            backgroundColor={BLUE}
            color={WHITE}
          >
            เลื่อนเวลาหยอดตา
          </Button>
          <Button
            onPress={() => {
              console.log("already dropped");
              Actions.popTo("home");
            }}
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
        {/* <Card>
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
                </Button> */}
        <Button
          onPress={() => {
            this.saveHistory();
            console.log("success");
            Actions.popTo("home");
          }}
          backgroundColor={BLUE}
          color={WHITE}
        >
          หยอดตาสำเร็จ
        </Button>
        <Button
          // onPress={() => this.setState(isSecond ? {
          //     timerReset: true,
          //     timerStart: false
          // } : {
          //     timerResetAbnormal: true,
          //     timerStartAbnormal: false
          // })}
          onPress={() => {
            console.log("cancel");
            Actions.pop();
          }}
          backgroundColor={RED}
          color={WHITE}
        >
          ยกเลิก
        </Button>
      </View>
    );
  }

  snoozeNotification() {
    const { id, left, right, type } = this.props.data.order;
    let eyeSide = "";
    let isAbnormal = "";
    if (left && right) {
      eyeSide = "หยอดตาทั้งสองข้าง";
    } else if (left) {
      eyeSide = "หยอดตาซ้าย";
    } else {
      eyeSide = "หยอดตาขวา";
    }
    if (type) {
      isAbnormal = "(กดหัวตา)";
    }
    const time = new Date();
    const notificationId = Notifications.scheduleLocalNotificationAsync(
      {
        title: `${this.props.eyedropName}`,
        body: `${eyeSide} ${isAbnormal}`,
        data: {
          orderID: id,
          eyedropName: this.props.eyedropName
        },
        //categoryId: 'eyedrop-alarm',
        android: {
          channelId: "eyedrop-alarm",
          color: "#FF7F50"
        },
        ios: {
          sound: true
        }
      },
      {
        time: time.setMinutes(time.getMinutes() + 5)
      }
    );
    return notificationId;
  }

  render() {
    const { data } = this.props;
    return (
      <View>
        <EyeCard item={data} disabled />
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
