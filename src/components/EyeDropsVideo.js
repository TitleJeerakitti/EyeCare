import React from 'react';
import { View, Dimensions } from 'react-native';
import { Video, ScreenOrientation } from 'expo';
import { NavigationEvents } from "react-navigation";

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: Dimensions.get('window').width,
            heightScaled: 300,
        };
    }

    handleVideoRef = component => {
        this.playbackObject = component;
      }
      
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <NavigationEvents
                    onWillBlur={() => {
                    this.playbackObject.pauseAsync();
                    }}
                />
                <Video
                    ref={this.handleVideoRef}
                    style={{
                        width: this.state.screenWidth,
                        height: this.state.heightScaled
                    }}
                    source={require('../videos/EyeDropsVideo.mp4')}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay
                    isLooping={false}
                    useNativeControls
                    onReadyForDisplay={event => {
                        const { width, height } = event.naturalSize;

                        this.setState({
                            heightScaled: height * (this.state.screenWidth / width),
                        });
                    }}
                    onFullscreenUpdate={event => {
                        if (event.fullscreenUpdate === 0) {
                            ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
                        } else if (event.fullscreenUpdate === 2) {
                            ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
                        }
                    }}
                />
            </View>
        );
    }
}


export default VideoPlayer;

