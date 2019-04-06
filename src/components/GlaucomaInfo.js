import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { Constants, Asset } from 'expo';

export default class GlaucomaInfoPDF extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <PDFReader
          source={{ uri: Asset.fromModule(require("../../assets/Glaucoma-2.pdf")).uri }}
        /> */}
        <Image
          style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width*1.0141732}}
          source = {require("../../assets/Glaucoma.jpg")}
        />
      </View>
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