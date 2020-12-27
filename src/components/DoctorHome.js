import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button, Card, CardSection, Input, ButtonImage } from './common'
import { WHITE, BLUE, RED } from '../config'

class DoctorHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'doctor',
      password: 'tec-kmitl',
      inputUsername: '',
      inputPassword: '',
      isLogin: false,
      error: '',
    }
  }

  onLogin() {
    const { inputPassword, inputUsername, username, password } = this.state
    if (username === inputUsername && password === inputPassword) {
      return this.setState({
        isLogin: true,
        inputPassword: '',
        inputUsername: '',
      })
    }
    return this.setState({ error: 'Username หรือ Password ไม่ถูกต้อง' })
  }

  onLogOut() {
    this.setState({ isLogin: false })
  }

  onUsernameChange(text) {
    this.setState({ inputUsername: text, error: '' })
  }

  onPasswordChange(text) {
    this.setState({ inputPassword: text, error: '' })
  }

  renderSelect() {
    if (this.state.isLogin) {
      return (
        <View>
          <ButtonImage
            onPress={() => Actions.doctor_eyedrop()}
            source={require('../images/eye-dropper.png')}
            title="ยาหยอดตา"
          />
          <ButtonImage
            onPress={() => Actions.doctor_make_appointment()}
            source={require('../images/calendar.png')}
            title="นัดพบแพทย์"
          />
          <ButtonImage
            onPress={() => Actions.chart()}
            source={require('../images/bars-chart.png')}
            title="ดูสถิติ"
          />
          <Button onPress={() => this.onLogOut()} backgroundColor={RED}>
            <Text style={{ color: WHITE }}>ออกจากระบบ</Text>
          </Button>
        </View>
      )
    }
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Card style={{ flex: 1, justifyContent: 'space-around' }}>
          <CardSection>
            <Input
              placeholder="Username"
              value={this.state.inputUsername}
              onChangeText={this.onUsernameChange.bind(this)}
            />
            <Input
              placeholder="Password"
              value={this.state.inputPassword}
              onChangeText={this.onPasswordChange.bind(this)}
              secure
            />
            <Text style={styles.errorMessage}>{this.state.error}</Text>
            <Button backgroundColor={BLUE} onPress={() => this.onLogin()}>
              <Text style={{ color: WHITE }}>เข้าสู่ระบบ</Text>
            </Button>
          </CardSection>
        </Card>
      </KeyboardAvoidingView>
    )
  }

  render() {
    return this.renderSelect()
  }
}

const styles = {
  errorMessage: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
}

export default DoctorHome
