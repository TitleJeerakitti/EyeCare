import React from 'react';
import { StyleSheet, View } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { Constants, Asset } from 'expo';

export default class GlaucomaInfoPDF extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <PDFReader
            source={{uri : Asset.fromModule(require("../../assets/GlaucomaInfo.pdf")).uri}}
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