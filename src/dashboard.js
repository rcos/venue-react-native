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
  State
} from 'react-native';

var venue = require("venue-api-react");

import { Button, Toolbar, Card } from 'react-native-material-design';

import EventCard from "./EventCard";

export default class Dashboard extends Component{

  state: {
    events: [any],
    dataSource: [any]
  };

  constructor(){
    super();
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.title !== r2.title
    });
    this.state = {events: [], dataSource: ds.cloneWithRows([],[])};
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

  renderEventCard(eventInfo: {title:string, description:string, image:string, eventId:string, course: any, infoObject: any}){

    return (
      <EventCard
        navigator={this.props.navigator}
        title={eventInfo.title}
        description={eventInfo.description || ""}
        image={eventInfo.image}
        eventId={eventInfo.eventId}
        course={eventInfo.course}
        eventInfo={eventInfo.infoObject}
        />
    );

  }



  render(){
    return (
      <View style={styles.container}>
        <Toolbar
          style={[styles.toolbar]}
          title={"venue dashboard"}/>
          <ListView
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
          />
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
  }
});
