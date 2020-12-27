import React from 'react'
import { Text, Image, Dimensions, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as SQLite from 'expo-sqlite'
import { selectEyeDrop } from '../../actions'
import {
  ButtonImage,
  Row,
  Card,
  Center,
  TextContent,
  TimeCard,
} from '../common'
import EyeImage from '../../images/eye-open.png'

const imageSize = Dimensions.get('window').width * 0.1
const eyeDropdb = SQLite.openDatabase('eyedrop.db')

class EyeCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: this.props.item,
      eyedrop: {
        image: null,
        name: null,
        detail: '',
      },
    }
  }

  componentDidMount() {
    this.loadImage()
  }

  loadImage() {
    eyeDropdb.transaction((tx) => {
      tx.executeSql(
        'select * from items where id = ?',
        [this.state.data.order.eyeDropID],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            this.setState({
              eyedrop: {
                image: _array[0].image,
                name: _array[0].name,
                detail: _array[0].detail,
              },
              loading: false,
            })
          }
        },
      )
    })
  }

  onSelectEyeDropper(item) {
    this.props.selectEyeDrop(item)
    Actions.stopwatch()
  }

  renderEyePosition(isTrue) {
    return (
      <Image
        source={EyeImage}
        style={{
          ...styles.imageStyle,
          // opacity: isTrue ? 1 : 0.5,
          tintColor: isTrue ? 'red' : '#CCC',
        }}
      />
    )
  }

  renderTimeSlot(times) {
    return times.map((time, index) => (
      <TimeCard key={index}>{time.time}</TimeCard>
    ))
  }

  renderEachEye(data) {
    if (data.order.left && data.order.right) {
      return 'สองข้าง'
    } else if (data.order.left) {
      return 'ตาซ้าย'
    }
    return 'ตาขวา'
  }

  renderDetailList(details = []) {
    return details.map((item, index) => <Text key={index}>- {item}</Text>)
  }

  render() {
    const { item, disabled, detail = false, onPress = false } = this.props
    const { data, eyedrop, loading } = this.state
    if (!loading) {
      return (
        // <View />
        <ButtonImage
          onPress={!onPress ? () => this.onSelectEyeDropper(item) : onPress}
          source={{ uri: eyedrop.image }}
          title={eyedrop.name}
          disabled={disabled}
        >
          <Row>
            <Center style={{ flex: 1 }}>
              {this.renderTimeSlot(data.time)}
            </Center>
            <Center style={{ flex: 1 }}>
              <Row>
                {this.renderEyePosition(data.order.left)}
                {this.renderEyePosition(data.order.right)}
              </Row>
              <TextContent>{this.renderEachEye(data)}</TextContent>
            </Center>
          </Row>
          {detail && (
            <Card>{this.renderDetailList(eyedrop.detail.split(','))}</Card>
          )}
        </ButtonImage>
      )
    }
    return <View />
  }
}

const styles = {
  imageStyle: {
    width: imageSize,
    height: imageSize,
    marginHorizontal: 5,
  },
}

export default connect(null, { selectEyeDrop })(EyeCard)
