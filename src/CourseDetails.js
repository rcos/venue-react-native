//@flow

import React, { Component, PropTypes } from 'react';
import venue from 'venue-api-react';

import {
  Linking,
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';

import InfoItem from './InfoItem';

import { Button, Toolbar, Card } from 'react-native-material-design';

var dateFormat = require('dateformat');

export default class CourseDetails extends Component{

  render(){

    var crs = this.props.courseInfo;
    console.log(crs);
    return (
      <View style={styles.container}>
        <Toolbar
          icon='arrow-back'
          onIconPress={() => this.props.navigator.pop()}
          title={crs.name}/>
        <ScrollView>
          <Image
            style={styles.courseImage}
            resizeMode={Image.resizeMode.cover}
            source={crs.imageURLs.length > 0 ?
              { uri: venue.getDomain() + crs.imageURLs }
              :require("./img/default_event.jpg")}>
          </Image>
          <View style={styles.imageContentContainer}>
            <View style={styles.courseTitleContainer}>
            <Text numberOfLines={this.props.smallText? 3: 2} style={styles.courseTitle}>
              {crs.name}
            </Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.descriptionBox}>
              <Text style={{marginBottom:10}}> {crs.description} </Text>
            </View>
          </View>
          {/* <InfoItem
          iconColor="#aaa"
          icon="plus"
          centerContent={true}
          onPress={()=>{
                //JOIN COURSE HERE
              }
          }>
            Join this course
          </InfoItem> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff"
  },
  courseImage: {
    height: 240,
    position:'absolute',
    left:0,right:0,
    alignSelf: "center",
    backgroundColor: 'transparent',
    flexDirection: "column",
  },
  imageContentContainer: {
    position:'absolute',
    left:0, right:0,
    flexDirection: "column",
    justifyContent: "flex-end",
    height:240
  },
  courseTitleContainer:{
    backgroundColor: "rgba(0,0,0,.25)",
    flexDirection: "row"
  },
  courseTitle: {
    color:"white",
    fontSize: 24,
    marginBottom:20, marginTop:20, marginLeft:20,
    flex:1,
    // left:20, right:20
  },
  infoBox: {
    marginTop:240 // event image space
  },
  descriptionBox: {
    padding:15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa"
  }
});
