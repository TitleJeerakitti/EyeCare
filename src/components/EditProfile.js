import React from 'react'
import {
  ScrollView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as SQLite from 'expo-sqlite'
import { Card, CardSection, InputWithText, Button, Space } from './common'
import { YELLOW, RED, WHITE } from '../config'

const WIDTH = Dimensions.get('window').width
const IMAGE_SIZE = WIDTH * 0.25
const patientdb = SQLite.openDatabase('patient.db')

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      birthday: '',
      phoneNumber: '',
      allergic: '',
      disease: '',
    }
  }

  componentDidMount() {
    this.userData()
  }

  userData() {
    patientdb.transaction((tx) => {
      tx.executeSql('select * from items', [], (_, { rows: { _array } }) => {
        if (_array.length === 1) {
          _array.forEach((user) => {
            this.setState({
              name: user.name,
              surname: user.surname,
              birthday: user.birthday,
              phoneNumber: user.phoneNumber,
              allergic: user.allergic,
              disease: user.disease,
            })
          })
        }
      })
    })
  }

  saveProfile() {
    const {
      name,
      surname,
      birthday,
      phoneNumber,
      allergic,
      disease,
    } = this.state
    patientdb.transaction((tx) => {
      return tx.executeSql(
        'select * from items where id = 1',
        null,
        (_, { rows: { length } }) => {
          if (length) {
            tx.executeSql(
              'update items set name = ?, surname = ?,  birthday = ?, phoneNumber = ?, allergic = ?, disease = ? where id = ?;',
              [name, surname, birthday, phoneNumber, allergic, disease, 1],
            )
          } else {
            tx.executeSql(
              'insert into items (name, surname, birthday, phoneNumber, allergic, disease) values (?,?,?,?,?,?)',
              [name, surname, birthday, phoneNumber, allergic, disease],
            )
          }
        },
      )
    })
    Actions.pop()
  }

  render() {
    const {
      name,
      surname,
      birthday,
      phoneNumber,
      allergic,
      disease,
    } = this.state
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={150}
      >
        <ScrollView style={{ flex: 1 }}>
          <Card style={{ marginTop: 10 + IMAGE_SIZE / 2 }}>
            <CardSection style={{ paddingTop: 10 + IMAGE_SIZE / 2 }}>
              <Image
                source={require('../images/user.png')}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  position: 'absolute',
                  top: -(IMAGE_SIZE / 2),
                  // width 50% - image 50% - marginLeft (10)
                  left: WIDTH / 2 - IMAGE_SIZE / 2 - 10,
                }}
              />
              <InputWithText
                title="ชื่อ"
                placeholder="ชื่อ"
                value={name}
                onChangeText={(text) => this.setState({ name: text })}
              />
              <InputWithText
                title="นามสกุล"
                placeholder="นามสกุล"
                value={surname}
                onChangeText={(text) => this.setState({ surname: text })}
              />
              <InputWithText
                title="วันเกิด"
                placeholder="วันเกิด"
                value={birthday}
                maxDate={new Date()}
                onDateChange={(date) => {
                  this.setState({ birthday: date })
                }}
              />
              <InputWithText
                title="เบอร์โทร"
                placeholder="เบอร์โทร"
                value={phoneNumber}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
              />
              <InputWithText
                title="แพ้ยา"
                placeholder="แพ้ยา"
                value={allergic}
                onChangeText={(text) => this.setState({ allergic: text })}
              />
              <InputWithText
                title="โรคประจำตัว"
                placeholder="โรคประจำตัว"
                value={disease}
                onChangeText={(text) => this.setState({ disease: text })}
              />
            </CardSection>
          </Card>
          <Button onPress={() => this.saveProfile()} backgroundColor={YELLOW}>
            บันทึกข้อมูล
          </Button>
          <Button
            onPress={() => Actions.pop()}
            backgroundColor={RED}
            color={WHITE}
          >
            ยกเลิก
          </Button>
          <Space />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default EditProfile
