import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { SQLite } from 'expo';
import { YELLOW } from '../config';
import { Button } from './common';

const db = SQLite.openDatabase('eyedrops.db');

class AddNewMed extends React.Component {

    state = {
        text: null
    };

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists items (id integer primary key not null, img text, name text);'
            );
        });
    }

    add(text) {
        // is text empty?
        if (text === null || text === '') {
            return false;
        }

        db.transaction(
            tx => {
                tx.executeSql('insert into items (img, name) values (?, ?)', [this.props.imagePath, text]);
                tx.executeSql('select * from items', [], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
            null,
            this.update
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

export default AddNewMed;
