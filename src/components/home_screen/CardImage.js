import React from 'react';
import { Image, Dimensions, } from 'react-native';
import { Row, Center, TextHeader } from '../common';
import { WHITE, DARK_GRAY } from '../../config';

const HEIGHT = Dimensions.get('window').height;
const imageSize = HEIGHT * 0.12 > 100 ? 100 : HEIGHT * 0.12;

class CardImage extends React.Component {
    render() {
        const { children, source, title, notHorizontal = true } = this.props;
        return (
            <Row style={styles.container}>
                <Image source={source} style={styles.imageStyle} />
                <Center notHorizontal={notHorizontal} style={styles.cardContent}>
                    <TextHeader 
                        style={{ 
                            fontWeight: 'bold', 
                            color: DARK_GRAY 
                        }}
                    >
                        {title}
                    </TextHeader>
                    {children}
                </Center>
            </Row>
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
        // borderRadius: this.props.rounded ? imageSize / 2 : 0,
    },
    cardContent: {
        flex: 1,
        marginLeft: 20,
    }
};

export { CardImage };
