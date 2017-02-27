import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  ListView,
  Linking,
  State
} from 'react-native';

var venue = require("venue-api-react");

import { Button, Toolbar, Card } from 'react-native-material-design';

//import Course from "./CourseCard";

export default class Courses extends Component{

  state: {
    courses: [any],
    dataSource: [any]
  };

  constructor(){
    super();
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.title !== r2.title
    });
    this.state = {courses: [], dataSource: ds.cloneWithRows([],[])};
  }

  componentWillMount(){
    venue.getMyCourses().then((courses) => {
        console.log(courses);
        // console.log(courses);
    });
  }

  render(){
    let displayCourses;

    if (false){
        displayCourses = <Text></Text>;
    }
    else {
      displayCourses = <View style={styles.coursesHelp}>
        <Text style={styles.coursesHelpMessage}>
          There are no Courses on the venue
        </Text>
        <Text style={styles.feedbackForm} onPress={()=> Linking.openURL("http://goo.gl/forms/EmZAB93IcEDAwWkn1")}>
          Report Issues/Give Feedback
        </Text>
      </View>;
    }

    return (
      <View style={styles.container}>
        <Toolbar
          icon='arrow-back'
          onIconPress={() => this.props.navigator.pop()}
          style={[styles.toolbar]}
          title={"venue courses"}/>
          {displayCourses}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  cards: {
    flex:1,
    marginTop: 60,
    flexDirection: 'column'
  },
  cardTitle: {
    color: "#fff",
    fontSize:24
  },
  toolbar: {
    alignItems: 'center'
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 48,
    textAlign: 'center',
    margin: 10,
    marginTop: 100,
    marginBottom:50
  },
  textInput: {
    fontSize:18,
    width:200,
    alignSelf: 'center',
    textAlign: 'center'
  },
  feedbackForm:{
    fontSize:14,
    marginTop:20,
    height:50,
    color: '#2196F3',
    alignSelf: 'center',
    textAlign: 'center'
  },
  coursesHelp:{
    flex:1,
    marginTop: 60,
    flexDirection: 'column'
  },
  coursesHelpMessage:{
    fontSize:18,
    width:400,
    marginTop:100,
    marginBottom:50,
    alignSelf: 'center',
    textAlign: 'center'
  },
});
