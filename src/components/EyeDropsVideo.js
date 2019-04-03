import React from 'react';
import { View, Dimensions } from 'react-native';
import { Video, ScreenOrientation } from 'expo';
import { NavigationEvents } from "react-navigation";

class VideoPlayer extends React.Component {
    state = {
        screenWidth: Dimensions.get('window').width,
        shouldPlay: false,
        heightScaled: 300,
        height: 0,
        with: 0
    };

    /*componentDidMount() {
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    }

    componentWillUnmount() {
        this.setState({
            shouldPlay: false
        });
        Dimensions.removeEventListener('change', this.handler);
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    }*/

    handler = e => {
        if (e.window.width < e.window.height) {
            this.setState({
                screenWidth: e.window.width,
            });
        }
        else {
            this.setState({
                screenWidth: e.window.width - 162,
            });
        }
        this.setState({
            heightScaled: this.state.height * (this.state.screenWidth / this.state.width),
        });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <NavigationEvents
                    onWillBlur={() => {
                        this.setState({
                            shouldPlay: false
                        });
                        Dimensions.removeEventListener('change', this.handler);
                        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
                    }}
                    onDidFocus={() => {
                        Dimensions.addEventListener('change', this.handler);
                        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
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
                />
            </View>
        );
    }
}

export default VideoPlayer;

