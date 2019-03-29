import React from 'react';
import { ScrollView, Image, Dimensions, KeyboardAvoidingView, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, InputWithText, Button, Space } from './common';
import { YELLOW, RED, WHITE } from '../config';

const WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = WIDTH * 0.25;

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'สมขาย',
            surname: 'สุดหล่อ',
            birthday: new Date(),
            phoneNumber: '0812345678',
            allergic: 'zyrtec',
            disease: 'Allergic Disease',
        };
    }
    render() {
        const { name, surname, birthday, phoneNumber, allergic, disease } = this.state;
        return (
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior="padding" 
                enabled
            >
                <ScrollView style={{ flex: 1 }}>
                    <Card style={{ marginTop: 10 + (IMAGE_SIZE / 2) }}>
                        <CardSection style={{ paddingTop: 10 + (IMAGE_SIZE / 2) }}>
                            <Image 
                                source={require('../images/user.png')} 
                                style={{ 
                                    width: IMAGE_SIZE, 
                                    height: IMAGE_SIZE,
                                    position: 'absolute',
                                    top: -(IMAGE_SIZE / 2),
                                    // width 50% - image 50% - marginLeft (10)
                                    left: (WIDTH / 2) - (IMAGE_SIZE / 2) - 10,
                                }} 
                            />
                            <InputWithText 
                                title='ชื่อ'
                                placeholder='ชื่อ'
                                value={name}
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                            <InputWithText 
                                title='นามสกุล'
                                placeholder='นามสกุล'
                                value={surname}
                                onChangeText={(text) => this.setState({ surname: text })}
                            />
                            <InputWithText 
                                title='วันเกิด'
                                placeholder='วันเกิด'
                                value={birthday}
                                maxDate={new Date()}
                                onDateChange={(date) => { this.setState({ birthday: date }); }}
                            />
                            <InputWithText 
                                title='เบอร์โทร'
                                placeholder='เบอร์โทร'
                                value={phoneNumber}
                                onChangeText={(text) => this.setState({ phoneNumber: text })}
                            />
                            <InputWithText 
                                title='แพ้ยา'
                                placeholder='แพ้ยา'
                                value={allergic}
                                onChangeText={(text) => this.setState({ allergic: text })}
                            />
                            <InputWithText 
                                title='โรคประจำตัว'
                                placeholder='โรคประจำตัว'
                                value={disease}
                                onChangeText={(text) => this.setState({ disease: text })}
                            />
                        </CardSection>
                    </Card>
                    <Button 
                        onPress={() => console.log('save')}
                        backgroundColor={YELLOW}
                    >
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

        );
    }
}

export default EditProfile;
