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

import Icon from 'react-native-vector-icons/MaterialIcons';
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

  componentWillMount(){
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

  componentDidMount(){
      venue.getMyCourses().then((courses) => {
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
    let courseImage;
    if (this.state.courses){
        for (let i=0; i<this.state.courses.length; i++){
            if (this.state.courses[i]["id"] === eventInfo.infoObject.courseId){
                courseImage = this.state.courses[i]["image"];
                break;
            }
        }
    }
    else{
        courseImage = eventInfo.image;
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
          You currently have no events assigned.
        </Text>
        <Text style={styles.feedbackForm} onPress={()=> Linking.openURL("http://goo.gl/forms/EmZAB93IcEDAwWkn1")}>
          Report Issues/Give Feedback
        </Text>
      </View>;
    }

    return (
      <View style={styles.container}>
            <Toolbar
                title="Venue Submissions"/>
            {displayDashboard}
            <View style={styles.navbar}>
                <View style={styles.navView}>
                    <TouchableOpacity onPress={()=> {
                        gotoRoute("submissions", this.props.navigator)}}>
                        <Icon name="view-list" size={24}/>
                        <Text style={styles.button}>Submissions</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.navViewSelected}>
                    <Icon name="event" color="#2196F3" size={24}/>
                    <Text style={styles.buttonSelected}>Events</Text>
                </View>

                <View style={styles.navView}>
                    <TouchableOpacity onPress={()=> {
                        gotoRoute("courses", this.props.navigator)}}>
                        <Icon name="library-books" size={24}/>
                        <Text style={styles.button}>Courses</Text>
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
    backgroundColor: "#fdfdfd",
    flexDirection: 'column',
  },
  cards: {
    flex:1,
    marginTop: 60,
    flexDirection: 'column'
  },
  navView: {
      flex: 1,
      opacity: 0.7,
      alignItems: 'center',
      justifyContent: 'center',
  },
  navViewSelected: {
      flex: 1,
      opacity: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  button: {
      flex: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 12,
      color: '#757575'
  },
  buttonSelected: {
      flex: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: 14,
      color: '#2196F3'
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
  }
});
