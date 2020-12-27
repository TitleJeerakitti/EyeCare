import React from 'react'
import { Notifications } from 'expo'
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { Asset } from 'expo-asset'
import * as SQLite from 'expo-sqlite'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { AsyncStorage, Platform } from 'react-native'
import Router from './src/components/Router'
import reducers from './src/reducers'

const categorydb = SQLite.openDatabase('category.db')
const eyeDropdb = SQLite.openDatabase('eyedrop.db')
const patientdb = SQLite.openDatabase('patient.db')
const orderdb = SQLite.openDatabase('order.db')
const timedb = SQLite.openDatabase('time.db')
const appointmentdb = SQLite.openDatabase('appointment.db')
const historydb = SQLite.openDatabase('history.db')

const categoryName = [
  'PROSTAGLANDIN ANALOG',
  'BETA BLOCKER',
  'ALPHA AGONIST',
  'CARBONIC ANHYDARS INHIBITOR (CAI)',
  'CHOLINERGIC (MIOTIC)',
  'FIXED COMBINE DRUG',
  'Others',
]
const eyeDrop = [
  {
    name: 'Latanoprost 0.005% Xalatan Pfizer Inc.',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.1.1_Latanoprost_0.005__Xalatan_Pfizer_Inc.jpg'),
    ).uri,
    detail:
      'เก็บขวดยาที่ยังไม่ได้เปิดในตู้เย็น,เมื่อเปิดแล้วควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Latanoprost 0.005% Lanotan Bausch Lomb',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.1.2_Latanoprost_0.005__Lanotan_Bausch_Lomb.jpg'),
    ).uri,
    detail:
      'เก็บขวดยาที่ยังไม่ได้เปิดในตู้เย็น,เมื่อเปิดแล้วควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Latanoprost 0.005% Lumoprost Silom medical',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.1.3_Latanoprost_0.005__Lumoprost_Silom_medical.jpg'),
    ).uri,
    detail:
      'เก็บขวดยาที่ยังไม่ได้เปิดในตู้เย็น,เมื่อเปิดแล้วควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Bimatoptost 0.03%',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.2.1_Bimatoptost_0.03__lumigan_Allergan_Inc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Bimatoptost 0.01%',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.2.2_Bimatoptost_0.01__lumigan1_Allergan_Inc.png'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Tafluprost 0.0015%',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.3.1_Tafluprost_0.0015__Taflotan-S_Merck_Co.jpg'),
    ).uri,
    detail: 'ควรเก็บในตู้เย็นช่องธรรมดา,ไม่ควรใช้เกิน 24 ชั่วโมงหลังเปิดฝา',
  },
  {
    name: 'Travoprost 0.004%',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.4.2_Travoprost_0.004__Xaprost_Sava_medica.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Travoprost (polyquartemium-1_preserved)',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.4.3_Travoprost_(polyquartemium-1_preserved)_IZBA_Novartis.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Latanoprostene bunod 0.024%',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.5_Latanoprostene_bunod_0.024__Vyzulta_Bausch_Lomb_Inc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Unoprostone isopropyl 0.12%',
    category: 1,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/01_PROSTAGLANDIN_ANALOG/1.6_Unoprostone_isopropyl_0.12__Rescula_Novartis.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },

  {
    name: 'Timolol Maleate 0.5% Timolol maleate Alcon',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.1.1_Timolol_Maleate_0.5__Timolol_maleate_Alcon.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Timolol Maleate 0.5% Glauco oph Seng Thai',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.1.2_Timolol_Maleate_0.5__Glauco_oph_Seng_Thai.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Timolol Maleate 0.5% Timodrop Biolab',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.1.3_Timolol_Maleate_0.5__Timodrop_Biolab.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Timolol Maleate 0.5% Timoptol Santen',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.1.4_Timolol_Maleate_0.5__Timoptol_Santen.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Timolol Maleate 0.5% Optimol Jamjoom Pharma',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.1.5_Timolol_Maleate_0.5__Optimol_Jamjoom_Pharma.png'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Timolol Maleate 0.5% Timo-mac-Maxim',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.1.6_Timolol_Maleate_0.5__Timo-mac-Maxim.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Betaxolol HCl 0.25%',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.2.1_Betaxolol_HCl0.25__Betoptic-S_Alcon.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Carteolol HCK Arteoptic 2%',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.3_Carteolol_HCK_Arteoptic_eye_soln_2__Otsuka.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Levobunolol HCI ophthalmic solution 0.5%',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.4_Levobunolol_HCI_ophthalmic_solution_0.5__Betagan_Allergan_Inc.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Metipranolol',
    category: 2,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/02_BETA_BLOCKER/2.5_Metipranolol__Metipranolol_Alcon.jpg'),
    ).uri,
    detail: 'ต้องกดหัวตา,ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Brimonidine tartrate 0.15%',
    category: 3,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/03_ALPHA_AGONIST/3.1.1_Brimonidine_tartrate_0.15__Alphagan_Purite_Allergan_Inc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Brimonidine tartrate 0.2% Alphagan Allergan Inc.',
    category: 3,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/03_ALPHA_AGONIST/3.1.2_Brimonidine_tartrate_0.2__Alphagan_Allergan_Inc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Brimonidine tartrate 0.2% Brimocon Alcon',
    category: 3,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/03_ALPHA_AGONIST/3.1.3_Brimonidine_tartrate_0.2__Brimocon_Alcon.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Apraclonidine HCL 0.5%',
    category: 3,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/03_ALPHA_AGONIST/3.2_Apraclonidine_HCL_0.5__Iopidine_Alcon.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Brinzolamide ophthalmic suspension 1%',
    category: 4,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/04_CARBONIC_ANHYDARS_INHIBITOR_(CAI)/4.1_Brinzolamide_ophthalmic_suspension_1__Azopt_Alcon_Inc.jpg'),
    ).uri,
    detail: 'ควรเขย่าก่อนใช้',
  },
  {
    name: 'Dorzolamide HCI 2%',
    category: 4,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/04_CARBONIC_ANHYDARS_INHIBITOR_(CAI)/4.2_Dorzolamide_HCI2__Trusopt_Merck_CoInc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Pilocarpine HCl 1%',
    category: 5,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/05_CHOLINERGIC_(MIOTIC)/5.1.1_Pilocarpine_HCl_1__1__Isopto_atropine_Alcon_Inc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Pilocarpine HCl 2%',
    category: 5,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/05_CHOLINERGIC_(MIOTIC)/5.1.2_Pilocarpine_HCl_2__2__Isopto_carpine_Alcon_Inc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Pilocarpine HCl 4%',
    category: 5,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/05_CHOLINERGIC_(MIOTIC)/5.1.3_Pilocarpine_HCl_4__4__Isopto_carpine_Alcon_Inc.png'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Dorzolomide HCI & Timolol Maleate',
    category: 6,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.1_Dorzolomide_HCI_Timolol_Maleate__Cosopt_Merck_Co._Inc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Brimonidine Tartrate & Timolol Maleate',
    category: 6,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.2_Brimonidine_Tartrate__Timolol_Maleate_Combigan_Allergan_Inc.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Brinzolamide/Brimonidine Tartrate',
    category: 6,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.3_BrinzolamideBrimonidine_tartrate_ophthalmic_suspension_1_0.2__Simbrinza_Simbrinza_Suspension_Alcon.jpg'),
    ).uri,
    detail: 'คควรเขย่าก่อนใช้ยา',
  },
  {
    name: 'Latanoprost/Timolol',
    category: 6,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.4__LatanoprostTimolol_Xalacom_Pfizer_Inc.jpg'),
    ).uri,
    detail:
      'เก็บขวดยาที่ยังไม่ได้เปิดในตู้เย็น,เมื่อเปิดแล้วควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Bimatoprost 0.3mg/Timolol 5mg (Ampoule)',
    category: 6,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.5.1_Bimatoprost0.3mgTimolol5mg__Ganfort_PF_Allergan.jpg'),
    ).uri,
    detail: 'ควรเก็บในตู้เย็นช่องธรรมดา,ไม่ควรใช้เกิน 24 ชั่วโมงหลังเปิดฝา',
  },
  {
    name: 'Bimatoprost 0.3mg/Timolol 5mg',
    category: 6,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.5.2_Bimatoprost0.3mgTimolol5mg__Ganfort_Allergan.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Talfluprost 0.0015%/Timolol maleate 0.5%',
    category: 6,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.8.1_Talfluprost_0.0015_-Timolol_maleate_0.5__Tapcom_opht_solution_Santen.gif'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
  {
    name: 'Talfluprost 0.0015%/Timolol maleate 0.5% (Ampoule)',
    category: 6,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/06_FIXED_COMBINE_DRUG/6.8.2_Talfluprost_0.0015_-Timolol_maleate_0.5__Tapcom-S_Santen.jpg'),
    ).uri,
    detail: 'ควรเก็บในตู้เย็นช่องธรรมดา,ไม่ควรใช้เกิน 24 ชั่วโมงหลังเปิดฝา',
  },
  {
    name: 'Dipivefrine HCL 0.1%',
    category: 7,
    image: Asset.fromModule(
      require('./src/images/EyeDrops/07_Others/7.1_Dipivefrine_HCL_0.1__Propine_Allergab.jpg'),
    ).uri,
    detail: 'ควรเก็บที่อุณหภูมิห้อง,หลีกเลี่ยงแสงหรือความชื้น',
  },
]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    const promises = []
    promises.push(
      Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      }),
    )

    promises.push(this._retrieveData())
    Promise.all(promises).then(() => {
      this.setState({
        isLoading: false,
      })
    })
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('Version', Constants.manifest.version)
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Version')
      if (value !== null) {
        if (value.localeCompare(Constants.manifest.version) === -1) {
          await this.initDatabase()
          await this._storeData()
        }
      } else {
        await this.initDatabase()
        await this._storeData()

        await this.askPermissions()

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

        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('eyedrop-alarm', {
            name: 'Eye Drops Alarm',
            sound: true,
            priority: 'high',
            vibrate: true,
          })
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    )
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      return false
    }
    return true
  }

  async initDatabase() {
    await categorydb.transaction(async (tx) => {
      await tx.executeSql(
        'create table if not exists items (id integer primary key not null, name text)',
        null,
        async () => await this.addCategory(tx),
      )
    })

    await eyeDropdb.transaction(async (tx) => {
      // tx.executeSql("DROP TABLE IF EXISTS items");
      await tx.executeSql(
        'create table if not exists items (id integer primary key not null, name text, category int ,image text, detail text)',
        null,
        async () => await this.addEyeDrop(tx),
      )
    })

    await patientdb.transaction(async (tx) => {
      await tx.executeSql(
        'create table if not exists items (id integer primary key not null, name text, surname text, birthday text, phoneNumber text, allergic text, disease text)',
        null,
        async () => await this.addPatient(tx),
      )
    })

    await orderdb.transaction(async (tx) => {
      await tx.executeSql(
        'create table if not exists items (id integer primary key not null, patientID int, doctorID int, eyeDropID int, start date, end date, left boolean, right boolean, type boolean)',
      )
    })

    await timedb.transaction(async (tx) => {
      await tx.executeSql(
        'create table if not exists items (id integer primary key not null, orderID int, time text, notificationID int)',
      )
    })

    await appointmentdb.transaction(async (tx) => {
      await tx.executeSql(
        'create table if not exists items (id integer primary key not null, date text, time text)',
        null,
        async () => await this.addAppointment(tx),
      )
    })

    await historydb.transaction(async (tx) => {
      await tx.executeSql(
        'create table if not exists items (id integer primary key not null, patientID int, eyeDropID int, date text, time text)',
      )
    })
  }

  async addPatient(tx) {
    await tx.executeSql('select * from items', [], async (_, { rows: { _array } }) => {
      if (_array.length === 0) {
        await tx.executeSql(
          `insert into items (name, surname, birthday, phoneNumber, allergic, disease) values ('', '', '', '', '', '')`,
        )
      }
    })
  }

  async addCategory(tx) {
    await categoryName.map(async (name) =>
      await tx.executeSql(
        'select * from items where name = ?',
        [name],
        async (_, { rows: { _array } }) => {
          if (_array.length === 0) {
            await tx.executeSql('insert into items (name) values (?)', [name])
          }
        },
      ),
    )
  }

  async addEyeDrop(tx) {
    await Promise.all(eyeDrop.map(async (item) =>
      await tx.executeSql(
        'select * from items where name = ?;',
        [item.name],
        async (_, { rows: { _array } }) => {
          if (_array.length === 0) {
            await tx.executeSql(
              'insert into items (name, category, image, detail) values (?,?,?,?)',
              [item.name, item.category, item.image, item.detail],
            )
          }
        },
      ),
    ))
  }

  async addAppointment(tx) {
    await tx.executeSql('select * from items', [], async (_, { rows: { _array } }) => {
      if (_array.length === 0) {
        await tx.executeSql('insert into items (date, time) values (?,?)', [
          'DD-MM-YYYY ',
          'HH:MM',
        ])
      }
    })
  }

  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk))
    if (this.state.isLoading) {
      return null
    }
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
