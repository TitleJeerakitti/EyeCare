import React from 'react';
import { Image, Dimensions, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectEyeDrop } from '../../actions';
import { ButtonImage, Row, Center, TextContent, TimeCard } from '../common';
import EyeImage from '../../images/eye-open.png';

const imageSize = Dimensions.get('window').width * 0.1;

class EyeCard extends React.Component {
    onSelectEyeDropper(item) {
        this.props.selectEyeDrop(item);
        Actions.stopwatch();
    }

    renderEyePosition(isTrue) {
        return (
            <Image 
                source={EyeImage} 
                style={{ 
                    ...styles.imageStyle, 
                    opacity: isTrue ? 1 : 0.5 
                }} 
            />
        );
    }

    renderTimeSlot(times) {
        return times.map((time, index) => 
            <TimeCard key={index}>{time}</TimeCard>
        );
    }

    render() {
        const { item, disabled, onPress = false } = this.props;
        return (
            <ButtonImage
                onPress={!onPress ? () => this.onSelectEyeDropper(item) : onPress}
                source={item.image}
                title={item.name}
                disabled={disabled}
            >
                <Row>
                    <Center style={{ flex: 1 }} >
                        {this.renderTimeSlot(item.time)}
                    </Center>
                    <Center style={{ flex: 1 }} >
                        <Row>
                            {this.renderEyePosition(item.eyePosition === 'LEFT')}
                            {this.renderEyePosition(item.eyePosition === 'RIGHT')}
                        </Row>
                        <TextContent>
                            {item.eyePosition === 'LEFT' ? 'ตาซ้าย' : 'ตาขวา'}
                        </TextContent>
                    </Center>
                </Row>
            </ButtonImage>
        );
    }
}

const styles = {
    imageStyle: {
        width: imageSize, 
        height: imageSize, 
        marginHorizontal: 5,
    }
};

export default connect(null, { selectEyeDrop })(EyeCard);
