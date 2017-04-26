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
import { gotoRoute } from './helpers'
import CourseCard from "./CourseCard";

export default class Courses extends Component{

  state: {
    courses: [any],
    dataSource: [any],
    allCourses: bool,
  };

  constructor(){
    super();
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.title !== r2.title
    });
    this.state = {courses: [], dataSource: ds.cloneWithRows([],[]), allCourses: false};
  }

  // componentDidUpdate(){
  //     if (!this.state.allCourses){
  //         venue.getMyCourses().then((courses) => {
  //             this.setState((state) => {
  //             state.courses = courses.map((c) => {
  //               return {
  //                 title: c.name,
  //                 description: c.description,
  //                 course: c.courseNumber,
  //                 image: c.imageURLs[0],
  //                 courseId: c._id,
  //                 infoObject: c
  //               };
  //             });
  //             state.dataSource = state.dataSource.cloneWithRows(
  //               state.courses
  //             );
  //             return state;
  //           });
  //         });
  //     }
  //     else {
  //         venue.getCourses().then((courses) => {
  //             this.setState((state) => {
  //             state.courses = courses.map((c) => {
  //               return {
  //                 title: c.name,
  //                 description: c.description,
  //                 course: c.courseNumber,
  //                 image: c.imageURLs[0],
  //                 courseId: c._id,
  //                 infoObject: c
  //               };
  //             });
  //             state.dataSource = state.dataSource.cloneWithRows(
  //               state.courses
  //             );
  //             return state;
  //           });
  //         });
  //     }
  // }

  componentWillMount(){
      venue.getMyCourses().then((courses) => {
          this.setState((state) => {
          state.courses = courses.map((c) => {
            return {
              title: c.name,
              description: c.description,
              course: c.courseNumber,
              image: c.imageURLs[0],
              courseId: c._id,
              infoObject: c
            };
          });
          state.dataSource = state.dataSource.cloneWithRows(
            state.courses
          );
          return state;
        });
      });
  }

  renderCourseCard(courseInfo: {title:string, description:string, image:string, courseId:string, course: any, infoObject: any}){

    return (
      <CourseCard
        navigator={this.props.navigator}
        title={courseInfo.title}
        description={courseInfo.description || ""}
        image={courseInfo.image}
        courseId={courseInfo.courseId}
        courseInfo={courseInfo.infoObject}
        />
    );

  }

  render(){
    let displayCourses;
    if (this.state.courses.length > 0){
        displayCourses = <ListView
          style={styles.cards}
          dataSource={this.state.dataSource}
          renderRow={(info) => this.renderCourseCard(info)}
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
        <Text style={styles.feedbackForm} onPress={()=> Linking.openURL(venue.getDomain()+"?mobile=true")}>
          You have not joined any courses. Press here to add courses on the mobile site.
        </Text>
        <Text style={styles.feedbackForm} onPress={()=> Linking.openURL("http://goo.gl/forms/EmZAB93IcEDAwWkn1")}>
          Report Issues/Give Feedback
        </Text>
      </View>;
    }

    return (
      <View style={styles.container}>
          <Toolbar
              title="Courses"/>
          {/* <View>
              <Button
              text={(this.state.allCourses) ? "All Courses" : "My Courses"}
              onPress={() => this.setState({allCourses: !this.state.allCourses})}
              />
          </View> */}
          {displayCourses}
          <View style={styles.navbar}>
              <View style={styles.navView}>
                <TouchableOpacity style={styles.navHighlight} onPress={()=> {
                  gotoRoute("submissions", this.props.navigator)}}>
                    <Icon style={styles.navIcon} name="view-list" size={24}/>
                    <Text style={styles.navText}>Submissions</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.navView}>
                <TouchableOpacity style={styles.navHighlight} onPress={()=> {
                  gotoRoute("dashboard", this.props.navigator)}}>
                      <Icon style={styles.navIcon} name="event" size={24}/>
                      <Text style={styles.navText}>Events</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.navViewSelected}>
                    <Icon style={styles.navIconSelected} name="library-books" color="#2196F3" size={24}/>
                    <Text style={styles.navTextSelected}>Courses</Text>
              </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    flexDirection: 'column'
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
});
