import React from 'react';
import { SQLite } from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './src/components/Router';
import reducers from './src/reducers';


const categorydb = SQLite.openDatabase('category.db');
const eyeDropdb = SQLite.openDatabase('eyedrop.db');
const categoryName = ['PROSTAGLANDIN ANALOG', 'BETA BLOCKER', 'ALPHA AGONIST', 'CARBONIC ANHYDARS INHIBITOR (CAI)', 'CHOLINERGIC (MIOTIC)', 'FIXED COMBINE DRUG', 'Others'];
const eyeDrop = [
  {
    name: 'Latanoprost 0.005%_Xalatan_Pfizer Inc.',
    category: 1,
    image: 'uri: Asset.fromModule(require("../images/EyeDrops/Prostaglandin Analog/1.1.1_Latanoprost 0.005%_Xalatan_Pfizer Inc..jpg")).uri',
    //detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2', 'ศัพท์แพทย์ 3'],
  },
  {
    name: 'Timolol Maleate 0.5%_Timolol maleate_Alcon',
    category: 2,
    image: 'uri: Asset.fromModule(require("../images/EyeDrops/Beta Blocker/2.1.1_Timolol Maleate 0.5%_Timolol maleate_Alcon.jpg")).uri',
    //detail: ['ศัพท์แพทย์ 1', 'ศัพท์แพทย์ 2'],
  },
];


export default class App extends React.Component {

  componentDidMount() {
    categorydb.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, name text);');
      this.addCategory(tx);
    });

    eyeDropdb.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, name text, category int ,image text);');
      this.addEyeDrop(tx);
    });
  }

  addCategory(tx) {
    categoryName.map((name) =>
      tx.executeSql('select * from items where name = ?;', [name], (_, { rows: { _array } }) => {
        if (_array.length === 0) {
          tx.executeSql('insert into items (name) values (?)', [name]);
        }
      }
      ));
  }

  addEyeDrop(tx) {
    eyeDrop.map((item) =>
      tx.executeSql('select * from items where name = ?;', [item.name], (_, { rows: { _array } }) => {
        if (_array.length === 0) {
          tx.executeSql('insert into items (name, category, image) values (?,?,?)', [item.name, item.category, item.image]);
        }
      })
    );
  }

  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}