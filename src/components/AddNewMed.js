import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { YELLOW } from '../config';
import { Button } from './common';
import { doctorSelectEyeDrop } from '../actions';

const eyeDropdb = SQLite.openDatabase('eyedrop.db');

class AddNewMed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            detail: '',
            group: this.props.group
        };
    }

    add(name, detail) {
        // is text empty?
        if (name === null || name === '') {
            return false;
        }

        eyeDropdb.transaction(
            tx => {
                tx.executeSql('insert into items (name, category, image, detail) values (?,?,?,?)', [name, this.state.group.id, this.props.imagePath, detail], 
                (_, { insertId }) => {
                    tx.executeSql('select * from items where id = ?', [insertId], (__, { rows: { _array } }) => {
                        if (_array.length === 1) {
                                this.goDetail(_array[0]);
                        }
                    });
                });
            },
        );
    }

    goDetail(item) {
        this.props.doctorSelectEyeDrop(item);
        Actions.doctor_eyedrop_detail();
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
                        onChangeText={name => this.setState({ name })}
                        placeholder="Name"
                        style={styles.input}
                        value={this.state.name}
                    />
                </View>
                <View style={styles.flexRow}>
                    <TextInput
                        onChangeText={detail => this.setState({ detail })}
                        placeholder="Details (separate with ,)"
                        style={styles.input}
                        value={this.state.detail}
                    />
                </View>
                <Button
                    backgroundColor={YELLOW}
                    onPress={() => {
                        this.add(this.state.name, this.state.detail);
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

export default connect(mapStateToProps, { doctorSelectEyeDrop })(AddNewMed);

//uri: Asset.fromModule(require('../images/user.png')).uri
