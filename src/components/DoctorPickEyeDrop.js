import React from 'react';
import { ScrollView, Text, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ButtonImage, Card, ButtonIconWithText } from './common';
import { BLACK, WHITE } from '../config';
import { doctorSelectEyeDrop, doctorSelectEyeDropGroup } from '../actions';

class DoctorPickEyeDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    onSelect(item) {
        this.props.doctorSelectEyeDrop(item);
        Actions.doctor_eyedrop_detail();
    }

    onClick(item, category) {
        this.props.doctorSelectEyeDropGroup(item, category);
        Actions.doctor_take_photo();
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
                        onPress={() => this.onClick(null, this.props.group)}
                    />
                </Card>
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ doctor }) => {
    const { group, data } = doctor;
    return { group, data };
};

export default connect(mapStateToProps, { doctorSelectEyeDrop, doctorSelectEyeDropGroup })(DoctorPickEyeDrop);
