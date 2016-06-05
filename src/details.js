import React, { Component } from 'react';

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

export default class Details extends Component{
  render(){
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
                event: this.props.eventId
              }
            })
          }]}
          title={"Event Name"}/>
        <ScrollView>
          <Image
            style={styles.eventImage}
            resizeMode={Image.resizeMode.cover}
            source={require("./img/default_event.jpg")}>
            <View style={styles.imageContentContainer}>
              <View style={styles.eventTitleContainer}>
                <Text style={styles.eventTitle}>
                  Event Name
                </Text>
              </View>
            </View>
          </Image>
          <View style={styles.infoBox}>
            <View style={styles.descriptionBox}>
              <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dignissim ullamcorper ligula vulputate maximus. Cras vestibulum risus ac feugiat ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc vitae vulputate arcu. Vestibulum ac varius dolor, et pharetra est. Fusce viverra pellentesque commodo. In eget fringilla felis. Etiam auctor et ante eu dictum. Nam vulputate ante nec sem euismod, et interdum lacus aliquet. Nulla sit amet metus laoreet, tempor arcu quis, elementum lorem. Ut tempus neque ac luctus finibus. Aenean orci erat, elementum sed ornare sit amet, tincidunt non sapien. Nulla semper nisl finibus risus ultricies, non vehicula sem volutpat. </Text>
              <Text style={{marginBottom:10}}> Instructor Note: Get picture in front of performers </Text>
            </View>
            <InfoItem centerContent={true} icon="clock-o">
            Event on 2/4 (Tuesday)
            </InfoItem>
            <InfoItem iconColor="#29B6F6" icon="location-arrow">
            86 Crawland Ave. {"\n"}
            Mass Parkway, 12180
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
    flex:1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  eventTitleContainer:{
    backgroundColor: "rgba(0,0,0,.25)"
  },
  eventTitle: {
    color:"white",
    fontSize: 24,
    marginBottom:20,marginLeft:20, marginTop:20
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
