import React, { Component, PropTypes } from 'react';

import {
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

export default class Details extends Component{

  static propTypes = {
    eventId: PropTypes.string
  };

  render(){

    var evt = this.props.eventInfo;

    return (
      <View style={styles.container}>
        <Toolbar
          icon='arrow-back'
          onIconPress={() => this.props.navigator.pop()}
          actions={[{
            icon: "file-upload",
            onPress: () => this.props.navigator.push({
              title: "upload",
              info: {
                event: this.props.eventId,
                eventInfo: this.props.eventInfo
              }
            })
          }]}
          title={evt.info.title}/>
        <ScrollView>
          <Image
            style={styles.eventImage}
            resizeMode={Image.resizeMode.cover}
            source={require("./img/default_event.jpg")}>
          </Image>
          <View style={styles.imageContentContainer}>
            <View style={styles.eventTitleContainer}>
            <Text numberOfLines={2} style={styles.eventTitle}>
              {evt.info.title}
            </Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.descriptionBox}>
              <Text style={{marginBottom:10}}> {evt.info.description} </Text>
              {evt.additionalNotes ?
                <Text style={{marginBottom:10, fontWeight:'bold'}}> Instructor Note: {evt.additionalNotes} </Text>
              :null}
            </View>
            <InfoItem icon="clock-o">
              Start: {dateFormat(evt.info.times.start, "h:MMtt ddd mmmm dS")} {"\n"}
              End : {dateFormat(evt.info.times.end, "h:MMtt ddd mmmm dS")}
            </InfoItem>
            <InfoItem iconColor="#29B6F6" icon="location-arrow">
            {evt.info.location.address}
            </InfoItem>
            <InfoItem
            iconColor="#aaa"
            icon="upload"
            centerContent={true}
            onPress={()=>{
              this.props.navigator.push({
                title: "upload",
                info: {
                  event: this.props.eventId
                }
              });
            }}>
              Upload To Event
            </InfoItem>
          </View>
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
  eventImage: {
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
  eventTitleContainer:{
    backgroundColor: "rgba(0,0,0,.25)",
    flexDirection: "row"
  },
  eventTitle: {
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
