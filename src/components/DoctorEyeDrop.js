import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as SQLite from 'expo-sqlite'
import { Actions } from 'react-native-router-flux'
import { Card, ButtonIconWithText } from './common'
import { RED, WHITE } from '../config'
import EyeCard from './special/EyeCard'
import { doctorSelectEyeDrop } from '../actions'

const orderdb = SQLite.openDatabase('order.db')
const timedb = SQLite.openDatabase('time.db')
const eyeDropdb = SQLite.openDatabase('eyedrop.db')

class DoctorEyeDrop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.orderData()
  }

  onClickEyeCard(eyeDropID) {
    eyeDropdb.transaction((tx) => {
      tx.executeSql(
        'select * from items where id = ?',
        [eyeDropID],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            this.props.doctorSelectEyeDrop(_array[0])
            Actions.doctor_eyedrop_detail()
          }
        },
      )
    })
  }

  orderData() {
    orderdb.transaction((tx) => {
      tx.executeSql(
        'select * from items where patientID = 1',
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            this.timeData(_array)
          }
        },
      )
    })
  }

  timeData(order) {
    timedb.transaction((tx) => {
      order.forEach((eachOrder) => {
        tx.executeSql(
          'select * from items where orderID = ?',
          [eachOrder.id],
          (_, { rows: { _array } }) => {
            this.setState(
              {
                data: this.state.data.concat({
                  order: eachOrder,
                  time: _array,
                }),
              },
            )
          },
        )
      })
    })
  }

  renderEyeCard() {
    return this.state.data.map((item, index) => (
      <EyeCard
        key={index}
        item={item}
        onPress={() => this.onClickEyeCard(item.order.eyeDropID)}
      />
    ))
  }

  render() {
    return (
      <ScrollView>
        {this.renderEyeCard()}
        <Card>
          <ButtonIconWithText
            title="สั่งยาหยอดตา"
            iconColor={WHITE}
            iconBg={RED}
            iconName="add"
            onPress={() => Actions.doctor_pick_new_group()}
          />
        </Card>
      </ScrollView>
    )
  }
}

export default connect(null, { doctorSelectEyeDrop })(DoctorEyeDrop)
