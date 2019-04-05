import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { SQLite } from 'expo';
import { YELLOW } from '../config';
import { Button } from './common';
import { connect } from 'react-redux';

const eyeDropdb = SQLite.openDatabase('eyedrop.db');

class AddNewMed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null
        };
    }

    add(text) {
        // is text empty?
        if (text === null || text === '') {
            return false;
        }

        eyeDropdb.transaction(
            tx => {
                tx.executeSql('insert into items (name, category, image) values (?, ?, ?)', [text, this.props.imagePath, category]);
                tx.executeSql('select * from items', [], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    style={{ height: 300, width: 300, alignSelf: 'center' }}
                    source={{ uri: this.props.imagePath }}
                />
                <View style={styles.flexRow}>
                    <TextInput
                        onChangeText={text => this.setState({ text })}
                        placeholder="Name"
                        style={styles.input}
                        value={this.state.text}
                    />
                </View>
                <Button
                    backgroundColor={YELLOW}
                    onPress={() => {
                        this.add(this.state.text);
                        this.setState({ text: null });
                    }}
                >
                    บันทึก
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#4630eb',
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 8
    },
    flexRow: {
        flexDirection: 'row'
    },
});

const mapStateToProps = ({ doctor }) => {
    const { group } = doctor;
    return { group };
};

export default connect(mapStateToProps)(AddNewMed);

//uri: Asset.fromModule(require('../images/user.png')).uri
