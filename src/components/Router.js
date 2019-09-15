import React from "react";
import { Router, Scene, Tabs, Actions } from "react-native-router-flux";
import { SQLite, Notifications } from "expo";
import { connect } from "react-redux";
import { NavBar, IconTab } from "./common";
import { selectEyeDrop } from "../actions";
import HomeScreen from "./HomeScreen";
import NewsHome from "./NewsHome";
import Miscellaneous from "./Miscellaneous";
import DoctorHome from "./DoctorHome";
import EditProfile from "./EditProfile";
import EyeDropper from "./EyeDropper";
import StopWatch from "./StopWatch";
import EyeChart from "./EyeChart";
import DoctorEyeDrop from "./DoctorEyeDrop";
import DoctorEyeDropDetail from "./DoctorEyeDropDetail";
import DoctorPickEyeDrop from "./DoctorPickEyeDrop";
import DoctorAppointment from "./DoctorAppointment";
import DoctorEyeDropGroup from "./DoctorEyeDropGroup";
import Magnifier from "./Magnifier";
import EyeDropsVideo from "./EyeDropsVideo";
import DoctorTakePhoto from "./DoctorTakePhoto";
import AddNewMed from "./AddNewMed";
import Notification from "./LocalNotifications";
import GlaucomaInfoPDF from "./GlaucomaInfo";
import { knowledge, takeCare, effect, question } from "./EyedropInfo";
import * as news from "./infoData"

const orderdb = SQLite.openDatabase("order.db");
const timedb = SQLite.openDatabase("time.db");

class RouterComponent extends React.Component {
  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    if (notification.origin === "selected") {
      console.log("OrderID", notification);
      // if (notification.actionId === 'snooze') {
      //     console.log('Snooze');
      //     Actions.main();
      //     console.log(Actions.currentScene);
      // } else {
      orderdb.transaction(tx => {
        tx.executeSql(
          "select * from items where patientID = 1 and id = ?",
          [notification.data.orderID],
          (_, { rows: { _array } }) => {
            if (_array.length > 0) {
              this.notificationTimeData(
                _array[0],
                notification.data.eyedropName
              );
            }
          }
        );
      });
      // }
    }
  };

  notificationTimeData(order, eyedropName) {
    timedb.transaction(tx => {
      tx.executeSql(
        "select * from items where orderID = ?",
        [order.id],
        (_, { rows: { _array } }) => {
          this.props.selectEyeDrop({ order, time: _array });
          Actions.stopwatch({ isNow: false, eyedropName });
        }
      );
    });
  }

  render() {
    return (
      <Router>
        <Tabs showLabel={false}>
          <Scene key="main" initial icon={IconTab} iconName="home" initial>
            <Scene
              key="home"
              title="เมนูหลัก"
              component={HomeScreen}
              navBar={NavBar}
              initial
            />
            <Scene
              key="edit_profile"
              title="แก้ไขข้อมูล"
              component={EditProfile}
              navBar={NavBar}
              onBack
              // initial
            />
            <Scene
              key="eyedropper"
              title="ยาหยอดตา"
              component={EyeDropper}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="stopwatch"
              title="จับเวลาหยอดตา"
              component={StopWatch}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="chart"
              title="สถิติการหยอดตา"
              component={EyeChart}
              navBar={NavBar}
              onBack
              // initial
            />
          </Scene>
          <Scene key="news" icon={IconTab} iconName="comment-text-multiple">
            <Scene
              key="news_home"
              title="สาระน่ารู้"
              component={NewsHome}
              navBar={NavBar}
              initial
            />
            <Scene
              key="knowledge"
              title={news.infoHeader}
              component={knowledge}
              navBar={NavBar}
            />
            <Scene
              key="takeCare"
              title={news.takeCare}
              component={takeCare}
              navBar={NavBar}
            />
            <Scene
              key="infoVideo"
              title={news.headerVideo}
              component={EyeDropsVideo}
              navBar={NavBar}
            />
            <Scene
              key="effect"
              title={news.headerEffect}
              component={effect}
              navBar={NavBar}
            />
            <Scene
              key="question"
              title={news.headerQuestion}
              component={question}
              navBar={NavBar}
            />
            <Scene
              key="glaucomapdf"
              title="ข้อมูลโรคต้อหิน"
              component={GlaucomaInfoPDF}
              navBar={NavBar}
            />
          </Scene>
          <Scene key="etc" icon={IconTab} iconName="comment-question">
            <Scene
              key="etc_home"
              title="เบ็ดเตล็ด"
              component={Miscellaneous}
              navBar={NavBar}
              initial
            />
            <Scene
              key="magnifier"
              title="แว่นขยาย"
              component={Magnifier}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="eyedropsvideo"
              title="วิธีหยอดตา"
              component={EyeDropsVideo}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="notification"
              title="Notification"
              component={Notification}
              navBar={NavBar}
              onBack
            />
          </Scene>
          <Scene key="doctor" icon={IconTab} iconName="clipboard-pulse">
            <Scene
              key="doctor_home"
              title="แพทย์"
              component={DoctorHome}
              navBar={NavBar}
              initial
            />
            <Scene
              key="doctor_eyedrop"
              title="จ่ายยาหยอดตา"
              component={DoctorEyeDrop}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="doctor_eyedrop_detail"
              title="ปรับแต่งการจ่ายยา"
              component={DoctorEyeDropDetail}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="doctor_pick_new_group"
              title="เลือกยาหยอดตา"
              component={DoctorEyeDropGroup}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="doctor_pick_new"
              title="เลือกยาหยอดตา"
              component={DoctorPickEyeDrop}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="doctor_make_appointment"
              title="นัดพบแพทย์"
              component={DoctorAppointment}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="doctor_take_photo"
              title="ถ่ายรูป"
              component={DoctorTakePhoto}
              navBar={NavBar}
              onBack
            />
            <Scene
              key="add_new_med"
              title="New Medicine"
              component={AddNewMed}
              navBar={NavBar}
              onBack
            />
          </Scene>
        </Tabs>
      </Router>
    );
  }
}

export default connect(
  null,
  { selectEyeDrop }
)(RouterComponent);
