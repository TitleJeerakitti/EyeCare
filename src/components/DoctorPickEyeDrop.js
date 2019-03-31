import React from 'react';
import { ScrollView, Text, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ButtonImage, Card, ButtonIconWithText } from './common';
import { BLACK, WHITE } from '../config';
import { doctorSelectEyeDrop } from '../actions';

class DoctorPickEyeDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Eye Dropper A',
                    image: require('../images/eye-dropper.png'),
                    detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2', 'ศัพท์แพทย์ 3'],
                },
                {
                    name: 'Eye Dropper B',
                    image: require('../images/eye-dropper.png'),
                    detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2'],
                },
            ]
        };
    }

    onSelect(item) {
        this.props.doctorSelectEyeDrop(item);
        Actions.doctor_eyedrop_detail();
    }

    renderDetail(details) {
        return details.map((item, index) => 
            <Text key={index}>- {item}</Text>
        );
    }

    renderEyeCard() {
        return this.state.data.map((item, index) => 
            <ButtonImage
                key={index}
                source={item.image}
                onPress={() => this.onSelect(item)}
                title={item.name}
                notHorizontal
            >
                <Card>
                    {this.renderDetail(item.detail)}
                </Card>
            </ButtonImage>
        );
    }

    render() {
        return (
            <ScrollView>
                {this.renderEyeCard()}
                <Card>
                    <ButtonIconWithText 
                        title='เพิ่มยาหยอดตา'
                        iconName='camera-alt'
                        iconBg={BLACK}
                        iconColor={WHITE}
                        onPress={() => console.log('camera taking')}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default connect(null, { doctorSelectEyeDrop })(DoctorPickEyeDrop);
