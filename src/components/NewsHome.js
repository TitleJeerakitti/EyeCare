import React from 'react';
import { ScrollView, } from 'react-native';
import { TextHeader, Card, TextContent, Button } from './common';
import { WHITE } from '../config';

class NewsHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [
                {
                    name: 'การหยอดตาด้วยตนเอง',
                },
                {
                    name: 'ข้อมูลโรคต้อหิน',
                }
            ]
        };
    }

    renderNews() {
        return this.state.news.map((item, index) => 
            <Button
                key={index}
                onPress={() => console.log('test')}
                backgroundColor={WHITE}
                activeOpacity={1}
            >
                <TextContent>{item.name}</TextContent>
            </Button>
        );
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Card>
                    <TextHeader fontWeight='bold'>
                        สาระน่ารู้ของโรคทางตา
                    </TextHeader>
                </Card>
                {this.renderNews()}
            </ScrollView>
        );
    }
}

export default NewsHome;
