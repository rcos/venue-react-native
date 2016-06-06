import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  ListView
} from 'react-native';

var venue = require("venue-api-react");

import { Button, Toolbar, Card } from 'react-native-material-design';

import EventCard from "./EventCard";

export default class Dashboard extends Component{

  constructor(){
    super();
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.title !== r2.title
    });
    this.state = {events: [], dataSource: ds.cloneWithRows([],[])};
  }

  componentWillMount(){
    console.log("Fetching events");
    venue.getMyEvents().then((events) => {
      console.log(events);
      this.setState((state) => {
        state.events = events.map((e) => {
          return {
            title: e.info.title,
            description: e.info.description,
            course: e.courseNumber,
            image: e.info.imageURLs[0]
          };
        });
        console.log(state.events);
        state.dataSource = state.dataSource.cloneWithRows(
          state.events
        );
        debugger;
        return state;
      });
    });
  }

  renderEventCard(eventInfo){

    return (
      <EventCard
        navigator={this.props.navigator}
        title={eventInfo.title}
        description={eventInfo.description || ""}
        image={eventInfo.image}
        eventId={eventInfo.id}
        course={eventInfo.course}
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
  password: {
  }
});
