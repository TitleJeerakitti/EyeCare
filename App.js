import React from "react";
import { Notifications } from "expo";
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import Constants from "expo-constants";
import { Asset } from "expo-asset";
import { SQLite } from "expo-sqlite";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { AsyncStorage, Platform } from "react-native";
import Router from "./src/components/Router";
import reducers from "./src/reducers";

const categorydb = SQLite.openDatabase("category.db");
const eyeDropdb = SQLite.openDatabase("eyedrop.db");
const patientdb = SQLite.openDatabase("patient.db");
const orderdb = SQLite.openDatabase("order.db");
const timedb = SQLite.openDatabase("time.db");
const appointmentdb = SQLite.openDatabase("appointment.db");
const historydb = SQLite.openDatabase("history.db");

const categoryName = [
  "PROSTAGLANDIN ANALOG",
  "BETA BLOCKER",
  "ALPHA AGONIST",
  "CARBONIC ANHYDARS INHIBITOR (CAI)",
  "CHOLINERGIC (MIOTIC)",
  "FIXED COMBINE DRUG",
  "Others"
];
const eyeDrop = [
  {
    name: "Latanoprost 0.005%",
    category: 1,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.1.1_Latanoprost_0.005__Xalatan_Pfizer_Inc..jpg")
    ).uri,
    detail: "Detail 1,Detail 2,Detail 3"
  },
  {
    name: "Bimatoptost 0.03%",
    category: 1,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.2.1_Bimatoptost0.03__lumigan_AllerganInc.jpg")
    ).uri,
    detail: "Detail 1,Detail 2,Detail 3"
  },
  {
    name: "Timolol Maleate 0.5%",
    category: 2,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/02_BETA_BLOCKER/2.1.1_Timolol_Maleate_0.5__Timolol_maleate_Alcon..jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Betaxolol HCl 0.25%",
    category: 2,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/02_BETA_BLOCKER/2.2.1_BetaxololHCl0.25__Betoptic-S_Alcon.jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Brimonidine tartrate 0.15%",
    category: 3,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/03_ALPHA_AGONIST/3.1.1_Brimonidine_tartrate_0.15__Alphagan_Purite_Allergan_Inc..jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Apraclonidine HCL 0.5%",
    category: 3,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/03_ALPHA_AGONIST/3.2_ApraclonidineHCL0.5__Iopidine_Alcon.jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Brinzolamide ophthalmic suspension 1%",
    category: 4,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/04_CARBONIC_ANHYDARS_INHIBITOR_(CAI)/4.1_Brinzolamide_ophthalmic_suspension_1__Azopt_Alcon,_Inc..jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Dorzolamide HCI 2%",
    category: 4,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/04_CARBONIC_ANHYDARS_INHIBITOR_(CAI)/4.2_DorzolamideHCI2__Trusopt_Merck_CoInc.jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Pilocarpine HCl 1%",
    category: 5,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/05_CHOLINERGIC_(MIOTIC)/5.1.1_Pilocarpine_HCl_1__1__Isopto_atropine_Alcon,_Inc..jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Pilocarpine HCl 2%",
    category: 5,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/05_CHOLINERGIC_(MIOTIC)/5.1.2_PilocarpineHCl2__2_Isoptocarpine_AlconInc.jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Dorzolomide HCI",
    category: 6,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.1_Dorzolomide_HCI_Timolol_Maleate_Cosopt_Merck_Co._Inc2.jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "BrimonidineTartrate",
    category: 6,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.2_BrimonidineTartrate_TimololMaleate_Combigan_AllerganInc.jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  },
  {
    name: "Dipivefrine HCL 0.1%",
    category: 7,
    image: Asset.fromModule(
      require("./src/images/EyeDrops/07_Others/7.1_Dipivefrine_HCL_0.1__Propine_Allergab.jpg")
    ).uri,
    detail: "Detail 1,Detail 2"
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const promises = [];
    promises.push(
      Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      })
    );
    promises.push(this._retrieveData());
    Promise.all(promises).then(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("Version", Constants.manifest.version);
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("Version");
      if (value !== null) {
        if (value.localeCompare(Constants.manifest.version) === -1) {
          this.initDatabase();
          this._storeData();
        }
      } else {
        this.initDatabase();
        this._storeData();

        this.askPermissions();

        // Notifications.createCategoryAsync('eyedrop-alarm', [
        //   {
        //     actionId: 'snooze',
        //     buttonTitle: 'Snooze',
        //     isDestructive: true,
        //     isAuthenticationRequired: false,
        //   },
        //   // {
        //   //   actionId: 'reply',
        //   //   buttonTitle: 'Reply',
        //   //   textInput: { submitButtonTitle: 'Reply', placeholder: 'Type Something' },
        //   //   isAuthenticationRequired: false,
        //   // },
        // ]);

        if (Platform.OS === "android") {
          Notifications.createChannelAndroidAsync("eyedrop-alarm", {
            name: "Eye Drops Alarm",
            sound: true,
            priority: "high",
            vibrate: true
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };

  initDatabase() {
    categorydb.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, name text)",
        null,
        () => this.addCategory(tx)
      );
    });

    eyeDropdb.transaction(tx => {
      // tx.executeSql('DROP TABLE IF EXISTS items');
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, name text, category int ,image text, detail text)",
        null,
        () => this.addEyeDrop(tx)
      );
    });

    patientdb.transaction(tx => {
      tx.executeSql("DROP TABLE IF EXISTS items");
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, name text, surname text, birthday text, phoneNumber text, allergic text, disease text)",
        null,
        () => this.addPatient(tx)
      );
    });

    orderdb.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, patientID int, doctorID int, eyeDropID int, start date, end date, left boolean, right boolean, type boolean)"
      );
    });

    timedb.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, orderID int, time text, notificationID int)"
      );
    });

    appointmentdb.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, date text, time text)",
        null,
        () => this.addAppointment(tx)
      );
    });

    historydb.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, patientID int, eyeDropID int, date text, time text)"
      );
    });
  }

  addPatient(tx) {
    tx.executeSql("select * from items", [], (_, { rows: { _array } }) => {
      if (_array.length === 0) {
        tx.executeSql(
          `insert into items (name, surname, birthday, phoneNumber, allergic, disease) values ('', '', '', '', '', '')`
        );
      }
    });
  }

  addCategory(tx) {
    categoryName.map(name =>
      tx.executeSql(
        "select * from items where name = ?",
        [name],
        (_, { rows: { _array } }) => {
          if (_array.length === 0) {
            tx.executeSql("insert into items (name) values (?)", [name]);
          }
        }
      )
    );
  }

  addEyeDrop(tx) {
    eyeDrop.map(item =>
      tx.executeSql(
        "select * from items where name = ?;",
        [item.name],
        (_, { rows: { _array } }) => {
          if (_array.length === 0) {
            tx.executeSql(
              "insert into items (name, category, image, detail) values (?,?,?,?)",
              [item.name, item.category, item.image, item.detail]
            );
          }
        }
      )
    );
  }

  addAppointment(tx) {
    tx.executeSql("select * from items", [], (_, { rows: { _array } }) => {
      if (_array.length === 0) {
        tx.executeSql("insert into items (date, time) values (?,?)", [
          "DD-MM-YYYY ",
          "HH:MM"
        ]);
      }
    });
  }

  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
