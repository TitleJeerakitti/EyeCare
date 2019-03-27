import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Constants, LinearGradient, } from 'expo';
import { Icon, } from 'react-native-elements';
import { Actions, } from 'react-native-router-flux';
import { WHITE } from '../../config';

class NavBar extends React.Component {
    renderBack() {
        const { edgeContainer, } = styles;
        const { onBack } = this.props;
        if (onBack) {
            return (
                <TouchableOpacity 
                    onPress={() => Actions.pop()} 
                    style={edgeContainer}
                >
                    <Icon name='left' type='antdesign' size={18} />
                </TouchableOpacity>
            );
        }
        return <View style={edgeContainer} />;
    }

    render() {
        const { title, } = this.props;
        const { navbarStyle, containerStyle, textStyle, edgeContainer, } = styles;
        return (
            <LinearGradient 
                start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
                colors={[WHITE, WHITE]}
                style={containerStyle}
            >
                {this.renderBack()}
                <View style={navbarStyle}>
                    <Text style={textStyle}>{title}</Text>
                </View>
                <View style={edgeContainer} />
            </LinearGradient>
        );
    }
}

const styles = {
    navbarStyle: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 6,
    },
    edgeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerStyle: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 18,
    }
};

export { NavBar };
