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

import SubmissionCard from "./SubmissionCard";
import CourseCard from "./CourseCard";

export default class Submissions extends Component{

  state: {
    submissions: [any],
    dataSource: [any]
  };

  constructor(){
    super();
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.title !== r2.title
    });
    this.state = {submissions: [], dataSource: ds.cloneWithRows([],[])};
  }

  componentDidMount(){
    console.log("submissions");
    console.log(venue.getMySubmissions());
    venue.getMySubmissions().then((subs) => {
        this.setState((state) => {
        state.submissions = subs.map((s) => {
          return {
            image: s.images[0],
            event: s.sectionEvent["info"]["title"],
            author: s.submitter["firstName"],
            date: s.updatedAt,
            submissionId: s._id,
            infoObject: s
          };
        });
        state.dataSource = state.dataSource.cloneWithRows(
          state.submissions
        );
        return state;
      });
    });
  }

  renderSubmissionCard(submissionInfo: {submissionId:string, image:string, event:string, author:string, date:string, infoObject: any}){

    return (
      <SubmissionCard
        navigator={this.props.navigator}
        image={submissionInfo.image}
        event={submissionInfo.event || ""}
        author={submissionInfo.author}
        date={submissionInfo.date}
        submissionId={submissionInfo.submissionId}
        submissionInfo={submissionInfo.infoObject}
        />
    );

  }

  render(){
    let displayCourses;
    if (this.state.submissions.length > 0){
        displayCourses = <ListView
          style={styles.cards}
          dataSource={this.state.dataSource}
          renderRow={(info) => this.renderSubmissionCard(info)}
          renderFooter={()=>{
            return (
              <Text style={styles.feedbackForm} onPress={()=> Linking.openURL("http://goo.gl/forms/EmZAB93IcEDAwWkn1")}>
                Report Issues/Give Feedback
              </Text>
            );
          }}
        />;
    }
    else {
      displayCourses = <View style={styles.coursesHelp}>
        <Text style={styles.coursesHelpMessage}>
          You have no submissions
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
          title={"venue submissions"}/>
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
