import React from "react";
import { StyleSheet, ScrollView, Image, Dimensions, View } from "react-native";
import { Constants, Asset } from "expo";
import { TextHeader, TextContent, Button } from "./common";
import * as info from "./infoData";
import { FONT_SIZE, FONT_HEADER, ORANGE, WHITE } from "../config";

class knowledge extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead1} />
          <TextContent style={styles.contentInfo} children={info.infoText1} />
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead2} />
          <TextContent style={styles.contentInfo} children={info.infoText2} />
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead3} />
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/info/infopic3_1.png")}
              style={styles.image}
            />
            <Image
              source={require("../../assets/info/infopic3_2.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead4} />
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/info/infopic4_1.png")}
              style={styles.image}
            />
            <Image
              source={require("../../assets/info/infopic4_2.png")}
              style={styles.image}
            />
            <Image
              source={require("../../assets/info/infopic4_3.png")}
              style={styles.image}
            />
          </View>
          <TextContent style={styles.contentInfo} children={info.infoText4} />
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/info/infopic4_4.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead5} />
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/info/infopic5_1.png")}
              style={styles.image}
            />
            <Image
              source={require("../../assets/info/infopic5_2.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead6} />
          <TextContent style={styles.contentInfo} children={info.infoText6} />
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/info/infopic6_1.png")}
              style={styles.image}
            />
            <Image
              source={require("../../assets/info/infopic6_2.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead7} />
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/info/infopic7_1.png")}
              style={styles.image}
            />
          </View>
          <TextContent style={styles.contentInfo} children={info.infoText7} />
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead8} />
          <TextContent style={styles.contentInfo} children={info.infoText8} />
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead9} />
          <TextContent style={styles.contentInfo} children={info.infoText9} />
          <View style={styles.containerImage}>
            <Image
              source={require("../../assets/info/infopic9_1.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.infoHead10} />
        </View>
      </ScrollView>
    );
  }
}

class takeCare extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.containerCard}>
          <TextContent
            style={styles.contentInfo}
            children={info.infoTakeCare1}
          />
        </View>
        <View style={styles.containerCard}>
          <TextContent
            style={styles.contentInfo}
            children={info.infoTakeCare2}
          />
        </View>
        <View style={styles.containerCard}>
          <TextContent
            style={styles.contentInfo}
            children={info.infoTakeCare3}
          />
        </View>
      </View>
    );
  }
}

class effect extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.effectHead1} />
          <TextContent style={styles.contentInfo} children={info.effectInfo1} />
        </View>
        <View style={styles.containerCard}>
          <TextContent style={styles.contentHead} children={info.effectHead2} />
          <TextContent style={styles.contentInfo} children={info.effectInfo2} />
        </View>
      </View>
    );
  }
}

class question extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.containerCard}>
          <TextContent
            style={styles.contentHead}
            children={info.questionHead1}
          />
          <TextContent
            style={styles.contentInfo}
            children={info.questionInfo1}
          />
        </View>
        <View style={styles.containerCard}>
          <TextContent
            style={styles.contentHead}
            children={info.questionHead2}
          />
          <TextContent
            style={styles.contentInfo}
            children={info.questionInfo2}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  containerCard: {
    // flex: 1,
    padding: 10,
    backgroundColor: WHITE,
    borderRadius: 10,
    margin: 10
  },
  contentHead: {
    fontSize: FONT_HEADER,
    color: ORANGE,
    fontWeight: "bold",
    display: "flex",
    textAlign: "left",
    paddingLeft: "5%",
    paddingRight: "5%"
  },
  contentInfo: {
    fontSize: FONT_SIZE,
    display: "flex",
    textAlign: "left",
    padding: "5%"
  },
  containerImage: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  image: {
    margin: '3%',
  }
});

export { knowledge, takeCare, effect, question };
