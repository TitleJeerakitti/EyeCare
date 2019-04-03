import React from 'react';
import { View, Dimensions } from 'react-native';
import { Video, ScreenOrientation } from 'expo';
import { NavigationEvents } from "react-navigation";

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: Dimensions.get('window').width,
            shouldPlay: false,
            heightScaled: 300,
            height: 0,
            with: 0
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <NavigationEvents
                    onWillBlur={() => {
                        this.setState({
                            shouldPlay: false
                        });
                    }}
                />
                <Video
                    style={{
                        width: this.state.screenWidth,
                        height: this.state.heightScaled
                    }}
                    source={require('../videos/EyeDropsVideo.mp4')}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={this.state.shouldPlay}
                    isLooping={false}
                    useNativeControls
                    onReadyForDisplay={event => {
                        this.setState({
                            width: event.naturalSize.width,
                            height: event.naturalSize.height,
                            heightScaled: this.state.height * (this.state.screenWidth / this.state.width),
                            shouldPlay: true
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

