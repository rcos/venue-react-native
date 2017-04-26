//@flow

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
  TouchableOpacity,
  PanResponder
} from 'react-native';

var venue = require("venue-api-react");

import { Button, Toolbar, Card } from 'react-native-material-design';
import { gotoRoute } from './helpers'
import EventCard from "./EventCard";

export default class Dashboard extends Component{

  state: {
    events: [any],
    courses: [any],
    dataSource: [any],
    page: string
  };

  constructor(){
    super();
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.title !== r2.title
    });
    this.state = {events: [], dataSource: ds.cloneWithRows([],[]), page: "dashboard"};
  }

  componentDidMount(){
    venue.getMyEvents().then((events) => {
      this.setState((state) => {
        state.events = events.map((e) => {
          return {
            title: e.info.title,
            description: e.info.description,
            course: e.courseNumber,
            image: e.info.imageURLs[0],
            eventId: e._id,
            infoObject: e
          };
        });
        state.dataSource = state.dataSource.cloneWithRows(
          state.events
        );
        return state;
      });
    });
  }

  componentWillMount(){
      venue.getMyCourses().then((courses) => {
          console.log(courses);
          this.setState((state) => {
              state.courses = courses.map((c) => {
                  return {
                      id: c._id,
                      image: c.imageURLs[0]
                  }
              });
              return state;
          })
      });
  }

  renderEventCard(eventInfo: {title:string, description:string, image:string, eventId:string, course: any, infoObject: any}){
      console.log(eventInfo.infoObject);
    let courseImage;
    if (this.state.courses){
        for (let i=0; i<this.state.courses.length; i++){
            if (this.state.courses[i]["id"] === eventInfo.infoObject.courseId){
                courseImage = this.state.courses[i]["image"];
                break;
            }
        }
        console.log(courseImage);
    }
    else{
        courseImage = eventInfo.image;
        console.log(courseImage);
    }

    return (
      <EventCard
        navigator={this.props.navigator}
        title={eventInfo.title}
        description={eventInfo.description || ""}
        image={eventInfo.image}
        eventId={eventInfo.eventId}
        course={eventInfo.course}
        eventInfo={eventInfo.infoObject}
        courseImage={courseImage}
        />
    );

  }



  render(){
    let displayDashboard;
    if(this.state.events.length > 0) {
      displayDashboard = <ListView
        style={styles.cards}
        dataSource={this.state.dataSource}
        renderRow={(info) => this.renderEventCard(info)}
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
      displayDashboard = <View style={styles.eventsHelp}>
        <Text style={styles.eventsHelpMessage}>
          There are no events on the venue
        </Text>
        <Text style={styles.mobileSiteMessage} onPress={()=> gotoRoute("courses", this.props.navigator)}>
          Check out the Courses page to enroll in courses
        </Text>
        <Text style={styles.feedbackForm} onPress={()=> Linking.openURL("http://goo.gl/forms/EmZAB93IcEDAwWkn1")}>
          Report Issues/Give Feedback
        </Text>
      </View>;
    }

    return (
      <View style={styles.container}>
            <View style={styles.toolbar}>
                <Image
                    source={require('./img/toolbarlogo.png')}
                    style={styles.logo}/>
            </View>
            <View style={styles.navbar}>
                <View style={styles.navView}>
                    <TouchableOpacity onPress={()=> {
                        gotoRoute("submissions", this.props.navigator)}}>
                        <Text style={styles.button}>SUBMISSIONS</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.navViewSelected}>
                    <Text style={styles.buttonSelected}>EVENTS</Text>
                </View>

                <View style={styles.navView}>
                    <TouchableOpacity onPress={()=> {
                        gotoRoute("courses", this.props.navigator)}}>
                        <Text style={styles.button}>COURSES</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {displayDashboard}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'column',
  },
  logo: {
      height: 20,
      width: 108,
      position: 'absolute',
      bottom: 0
  },
  cards: {
    flex:1,
    marginTop: 12,
    flexDirection: 'column'
  },
  cardTitle: {
    color: "#fff",
    fontSize:24
  },
  navView: {
      flex: 1,
      opacity: 0.6,
      alignItems: 'center',
      justifyContent: 'center'
  },
  navViewSelected: {
      flex: 1,
      opacity: 1,
      borderBottomColor: '#fff',
      borderBottomWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
  },
  button: {
      flex: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 14,
      color: '#fff'
  },
  buttonSelected: {
      flex: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 14,
      color: '#fff'
  },
  navbar:{
    height: 48,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: "#2196F3",
    elevation: 2,
  },
  toolbar:{
    height: 24,
    backgroundColor: "#2196F3",
    elevation: 2,
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
  eventsHelp:{
    flex:1,
    marginTop: 60,
    flexDirection: 'column'
  },
  eventsHelpMessage:{
    fontSize:18,
    width:400,
    marginTop:100,
    marginBottom:50,
    alignSelf: 'center',
    textAlign: 'center'
  },
  mobileSiteMessage: {
    // fontSize:14,
    // marginTop:20,
    color: '#2196F3',
    // alignSelf: 'center',
    textAlign: 'center'
  }
});
