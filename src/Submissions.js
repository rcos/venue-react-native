import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  ListView,
  Linking,
  State,
  TouchableOpacity
} from 'react-native';

var venue = require("venue-api-react");

import { Button, Toolbar, Card } from 'react-native-material-design';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { gotoRoute } from './helpers';
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

  componentWillMount(){
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
    var displayCourses;
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
          You have no submissions.
        </Text>
        <Text style={styles.feedbackForm} onPress={()=> Linking.openURL("http://goo.gl/forms/EmZAB93IcEDAwWkn1")}>
          Report Issues/Give Feedback
        </Text>
      </View>;
    }

    return (
      <View style={styles.container}>
          <Toolbar
              title="Submissions"/>
          {displayCourses}
          <View style={styles.navbar}>
              <View style={styles.navViewSelected}>
                <Icon style={styles.navIconSelected} name="view-list" color="#2196F3" size={24}/>
                <Text style={styles.navTextSelected}>Submissions</Text>
              </View>

              <View style={styles.navView}>
                <TouchableOpacity style={styles.navHighlight} onPress={()=> {
                  gotoRoute("dashboard", this.props.navigator)}}>
                      <Icon style={styles.navIcon} name="event" size={24}/>
                      <Text style={styles.navText}>Events</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.navView}>
                  <TouchableOpacity style={styles.navHighlight} onPress={()=> {
                      gotoRoute("courses", this.props.navigator)}}>
                      <Icon style={styles.navIcon} name="library-books" size={24}/>
                      <Text style={styles.navText}>Courses</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd"
  },
  cards: {
    flex:1,
    marginTop: 60,
    flexDirection: 'column'
  },
  navHighlight: {
      flex: 1,
      alignItems: 'center'
  },
  navView: {
      flex: 1,
      opacity: 0.7,
      alignItems: 'center',
  },
  navViewSelected: {
      flex: 1,
      opacity: 1,
      alignItems: 'center',
  },
  navText: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Roboto',
      marginTop: 2,
      fontSize: 12,
      color: '#757575',
      paddingLeft: 12,
      paddingRight: 12,
      marginBottom: 8
  },
  navTextSelected: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 14,
      color: '#2196F3',
      paddingLeft: 12,
      paddingRight: 12,
      marginBottom: 8
  },
  navIcon: {
      marginTop: 8,
  },
  navIconSelected: {
      marginTop: 6,
  },
  navbar:{
    height: 56,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: "#fdfdfd",
    elevation: 8,
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
