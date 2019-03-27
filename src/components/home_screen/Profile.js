import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, } from 'react-native';
import { Icon } from 'react-native-elements';
import { WHITE, } from '../../config';
import { TextContent, TextHeader, Center, Row, } from '../common';
// Icon made by Freepik from www.flaticon.com 

const HEIGHT = Dimensions.get('window').height;
const imageSize = HEIGHT * 0.12 > 100 ? 100 : HEIGHT * 0.12;

class Profile extends React.Component {
    render() {
        return (
            <ScrollView>
                <Row style={styles.container}>
                    <Image source={require('../../images/user.png')} style={styles.imageStyle} />
                    <Center notHorizontal style={styles.cardContent}>
                        <TextHeader style={{ fontWeight: 'bold' }}>ข้อมูลผู้ป่วย</TextHeader>
                        <TextContent numberOfLines={1}>นาย สมชาย สุดหล่อ</TextContent>
                        <TextContent style={{ }}>62 ปี</TextContent>
                    </Center>
                </Row>
                <Row style={styles.container}>
                    <Image source={require('../../images/eye-dropper.png')} style={styles.imageStyle} />
                    <Center notHorizontal style={styles.cardContent}>
                        <TextHeader style={{ fontWeight: 'bold' }}>ยาหยอดตา</TextHeader>
                        <Row>
                            <View style={{ flex: 1, alignItems: 'center', }}>
                                <TextContent>ตาซ้าย</TextContent>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'violet', borderRadius: '50%', marginTop: 5, }}>
                                    <Text style={{ color: WHITE }}>09:00</Text>
                                </View>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'violet', borderRadius: '50%', marginTop: 5, }}>
                                    <Text style={{ color: WHITE }}>09:00</Text>
                                </View>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'violet', borderRadius: '50%', marginTop: 5, }}>
                                    <Text style={{ color: WHITE }}>09:00</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', }}>
                                <TextContent>ตาขวา</TextContent>
                            </View>
                        </Row>
                    </Center>
                </Row>
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        backgroundColor: WHITE,
        borderRadius: 10,
        alignItems: 'center',
    },
    imageStyle: {
        width: imageSize,
        height: imageSize,
        // borderRadius: imageSize / 2,
        // backgroundColor: WHITE,
    },
    cardContent: {
        flex: 1,
        marginLeft: 20,
    }
};

export { Profile };
