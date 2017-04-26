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

export default class SubmissionCard extends Component{

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
              <Text style={styles.cardTitle}> {this.props.event} </Text>
            </Card.Media>
            <Card.Body>
                <Text>Author: {this.props.author}</Text>
                <Text>Submitted: {this.props.date}</Text>
            </Card.Body>
        </Card>
    );
  }
}

SubmissionCard.propTypes = {
  submissionId: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  event: PropTypes.string,
  image: PropTypes.string,
  submissionInfo: PropTypes.object
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
