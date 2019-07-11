import React from 'react';
import { ScrollView, View} from 'react-native';
import { TextHeader, Card, ButtonImage } from './common';
import { Actions } from 'react-native-router-flux';

class NewsHome extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         news: [
    //             {
    //                 name: 'การหยอดตาด้วยตนเอง',
    //             },
    //             {
    //                 name: 'ข้อมูลโรคต้อหิน',
    //             }
    //         ]
    //     };
    // }

    // renderNews() {
    //     return this.state.news.map((item, index) => 
    //         <ButtonImage 
    //             //key={index}
    //             onPress={() => Actions.eyedroppdf()}
    //             source={require('../images/study.png')}
    //             title={item.name}
    //         />
    //     );
    // }

    render() {
        return (
            <View>
                <ButtonImage 
                onPress={() => Actions.eyecarepdf()}
                source={require('../images/study.png')}
                title='การหยอดตาด้วยตนเอง'
                />
                <ButtonImage 
                onPress={() => Actions.glaucomapdf()}
                source={require('../images/study.png')}
                title='ข้อมูลโรคต้อหิน'
                />
            </View>
            // <ScrollView style={{ flex: 1 }}>
            //     <Card>
            //         <TextHeader fontWeight='bold'>
            //             สาระน่ารู้ของโรคทางตา
            //         </TextHeader>
            //     </Card>
            //     {this.renderNews()}
            // </ScrollView>
        );
    }
}

export default NewsHome;
