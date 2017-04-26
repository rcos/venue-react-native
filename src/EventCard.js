//@flow

import React, { Component, PropTypes } from 'react';

import venue from 'venue-api-react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Linking,
  Image
} from 'react-native';

import { Button, Card } from 'react-native-material-design';

export default class EventCard extends Component{

  render(){

    const defaultImage = <Image style={styles.cardImage}
      resizeMode={Image.resizeMode.cover}
      source={require("./img/default_event.jpg")}
    />;

    var img:Image = defaultImage;

    if (this.props.image){
      img = <Image style={styles.cardImage}
        resizeMode={Image.resizeMode.cover}
        source={{uri: venue.getDomain() + this.props.image}}
      />;
    }

    return (
        <Card>
            <Card.Media
                image={img}
                overlay
                height={200}
            >
              <Text style={styles.cardTitle}> {this.props.title} </Text>
            </Card.Media>
            <Card.Body>
                <Text>{this.props.description}</Text>
            </Card.Body>
            <Card.Actions position="left">
                <Button value={this.props.course} text={this.props.course}
                  onPress={() => this.props.navigator.push(
                    {title: "coursedetails",
                    info: {
                      courseId: this.props.courseId,
                      courseInfo: {
                          name: this.props.eventInfo.courseName,
                          description: this.props.eventInfo.courseDescription,
                          id: this.props.eventInfo.courseId,
                          imageURLs: this.props.courseImage
                  }}})
                }/>
                <Button value="DETAILS" text="DETAILS"
                onPress={() => this.props.navigator.push(
                  {title: "details",
                  info: {
                    event: this.props.eventId,
                    eventInfo: this.props.eventInfo
                  }})
                }/>
                <Button value="ATTEND" text="ATTEND"
                  onPress={() => this.props.navigator.push(
                    {title: "upload",
                    info: {
                      eventId: this.props.eventId,
                      eventInfo: this.props.eventInfo
                    }})
                  }/>
            </Card.Actions>
        </Card>
    );
  }
}

EventCard.propTypes = {
  title: PropTypes.string,
  eventId: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  course: PropTypes.string,
  eventInfo: PropTypes.object,
  courseImage: PropTypes.string
};

const styles = StyleSheet.create({
  cardTitle: {
    color: "#fff",
    fontSize:24
  },
  cardImage: {
    left:0,
    right:0
  }
});
