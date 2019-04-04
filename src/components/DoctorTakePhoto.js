import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem, } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class CameraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      zoom: 0,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onPictureSaved = async photo => {
    const folderPath = `${FileSystem.documentDirectory}photos`
    const folderInfo = await Expo.FileSystem.getInfoAsync(folderPath);
    if (!Boolean(folderInfo.exists)) {
      await FileSystem.makeDirectoryAsync(folderPath);
      console.log('create');
    }
    const imagePath = `${folderPath}/${Date.now()}.jpg`
    await FileSystem.copyAsync({
      from: photo.uri,
      to: imagePath,
    });
    Actions.add_new_med({ imagePath });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            ref={ref => {
            this.camera = ref;
          }}
            style={{ flex: 1 }}
            type={this.state.type}
            zoom={this.state.zoom}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.takePicture}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {' '}Snap{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
