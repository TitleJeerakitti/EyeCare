import React from 'react'
import { View, ScrollView, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as SQLite from 'expo-sqlite'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import {
  TextContent,
  Row,
  Button,
  CardImage,
  ButtonImage,
  TimeCard,
} from './common'
import { BLUE, YELLOW, RED } from '../config'
import { selectEyeDrop } from '../actions'

const patientdb = SQLite.openDatabase('patient.db')
const appointmentdb = SQLite.openDatabase('appointment.db')
const orderdb = SQLite.openDatabase('order.db')
const timedb = SQLite.openDatabase('time.db')

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: {
        name: '',
        age: '',
      },
      leftEye: [],
      rightEye: [],
      appointment: {
        date: '',
        time: '',
        place: '',
      },
    }
  }

  async componentDidMount() {
    await this.patientData()
    await this.appointmentData()
    await this.orderData()
  }

  async initialize() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    await this.patientData()
    await this.appointmentData()
    await this.orderData()
  }

  handleBackPress() {
    BackHandler.exitApp()
    return true //The event subscriptions are called in reverse order (i.e. last registered subscription first), and if one subscription returns true then subscriptions registered earlier will not be called.
  }

  async patientData() {
    await patientdb.transaction(async (tx) => {
      await tx.executeSql(
        'select * from items',
        [],
        (_, { rows: { _array, length } }) => {
          if (length === 1) {
            const { name, surname, birthday } = _array[0]
            const age =
              new Date().getFullYear() -
              birthday.substring(birthday.length - 4, birthday.length)
            this.setState({
              patient: {
                name: name || surname ? `${name} ${surname}` : 'ชื่อ นามสกุล',
                age: birthday ? age : '-',
              },
            })
          }
        },
      )
    })
  }

  async appointmentData() {
    await appointmentdb.transaction(async (tx) => {
      await tx.executeSql('select * from items', [], (_, { rows: { _array } }) => {
        if (_array.length === 1) {
          this.setState({
            appointment: {
              date: _array[0].date,
              time: _array[0].time,
              place: 'โรงพยาบาลธรรมศาสตร์',
            },
          })
        }
      })
    })
  }

  myExecuteSql = async (db, sql, params = []) => {
    return new Promise((resolve, reject) =>
      db.transaction(async (tx) => {
        await tx.executeSql(
          sql,
          params,
          (_, { rows }) => resolve(rows._array),
          reject,
        )
      }),
    )
  }

  async orderData() {
    const leftTemp = []
    const rightTemp = []
    await orderdb.transaction(async (tx) => {
      await tx.executeSql(
        'select * from items where patientID = 1',
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            _array.forEach(({ id, left, right }) => {
              if (left) {
                leftTemp.push(
                  this.myExecuteSql(
                    timedb,
                    'select * from items where orderID = ?',
                    [id],
                  ),
                )
              }
              if (right) {
                rightTemp.push(
                  this.myExecuteSql(
                    timedb,
                    'select * from items where orderID = ?',
                    [id],
                  ),
                )
              }
            })
          }
          Promise.all(leftTemp).then((leftOrders) => {
            leftTemp.length = 0
            leftOrders.forEach((order) => {
              order.forEach(({ time }) => {
                if (!leftTemp.includes(time)) {
                  leftTemp.push(time)
                }
              })
            })
            Promise.all(rightTemp).then((rightOrders) => {
              rightTemp.length = 0
              rightOrders.forEach((order) => {
                order.forEach(({ time }) => {
                  if (!rightTemp.includes(time)) {
                    rightTemp.push(time)
                  }
                })
              })
              this.setState({ leftEye: leftTemp, rightEye: rightTemp })
            })
          })
        },
      )
    })
  }

  renderTimeSlot(data) {
    return data.map((item, index) => <TimeCard key={index}>{item}</TimeCard>)
  }

  render() {
    const { leftEye, rightEye } = this.state
    return (
      <ScrollView>
        <NavigationEvents
          onDidFocus={() => {
            this.initialize()
          }}
          onWillBlur={() => {
            BackHandler.removeEventListener(
              'hardwareBackPress',
              this.handleBackPress,
            )
          }}
        />
        <ButtonImage
          onPress={() => Actions.edit_profile()}
          source={require('../images/user.png')}
          title="ข้อมูลผู้ป่วย"
          notHorizontal
        >
          <TextContent numberOfLines={1}>{this.state.patient.name}</TextContent>
          <TextContent style={{}}>อายุ {this.state.patient.age} ปี</TextContent>
        </ButtonImage>
        <ButtonImage
          onPress={() => Actions.eyedropper()}
          source={require('../images/eye-dropper.png')}
          title="เวลาหยอดตา"
          notHorizontal
        >
          <Row>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TextContent>ตาซ้าย</TextContent>
              {this.renderTimeSlot(leftEye.sort())}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TextContent>ตาขวา</TextContent>
              {this.renderTimeSlot(rightEye.sort())}
            </View>
          </Row>
        </ButtonImage>
        <CardImage
          source={require('../images/calendar.png')}
          title="นัดพบแพทย์"
        >
          <View style={{ flex: 1 }}>
            <TextContent style={{ color: BLUE, fontWeight: 'bold' }}>
              {this.state.appointment.date} ({this.state.appointment.time})
            </TextContent>
            <TextContent>{this.state.appointment.place}</TextContent>
          </View>
        </CardImage>
        <Button
          backgroundColor={RED}
          color="#FFF"
          onPress={() => Actions.eyedropper()}
        >
          แจ้งหยอดตา
        </Button>
        <Button backgroundColor={YELLOW} onPress={() => Actions.chart()}>
          สถิติการหยอดตา
        </Button>
      </ScrollView>
    )
  }
}

export default connect(null, { selectEyeDrop })(HomeScreen)
