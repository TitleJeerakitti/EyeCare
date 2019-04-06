import React from 'react';
import { StyleSheet, ScrollView, Image, Dimensions} from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { Constants, Asset} from 'expo';

export default class EyeCarePDF extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <PDFReader
          source={{uri : Asset.fromModule(require("../../assets/EyesCare-2.pdf")).uri}}
        /> */}
        <Image
          style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width*0.764583}}
          source = {require("../../assets/EyesCare.jpg")}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

