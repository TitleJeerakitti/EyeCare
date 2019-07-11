import React from 'react';
import { ScrollView, View} from 'react-native';
import { TextHeader, Card, ButtonImage } from './common';
import { Actions } from 'react-native-router-flux';
import * as news from './infoData'

class NewsHome extends React.Component {
    render() {
        return (
            <ScrollView>
                <ButtonImage 
                onPress={() => Actions.knowledge()}
                source={require('../images/study.png')}
                title={news.infoHeader}
                />
                <ButtonImage 
                onPress={() => Actions.takeCare()}
                source={require('../images/study.png')}
                title={news.takeCare}
                />
                <ButtonImage 
                onPress={() => Actions.infoVideo()}
                source={require('../images/study.png')}
                title={news.headerVideo}
                />
                <ButtonImage 
                onPress={() => Actions.effect()}
                source={require('../images/study.png')}
                title={news.headerEffect}
                />
                <ButtonImage 
                onPress={() => Actions.question()}
                source={require('../images/study.png')}
                title={news.headerQuestion}
                />
                <ButtonImage 
                onPress={() => Actions.glaucomapdf()}
                source={require('../images/study.png')}
                title='ข้อมูลโรคต้อหิน'
                />
            </ScrollView>
        );
    }
}

export default NewsHome;
