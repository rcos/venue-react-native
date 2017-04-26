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
import Icon from 'react-native-vector-icons/MaterialIcons';
var dateFormat = require('dateformat');

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
    let verificationContainer;
    if (this.props.submissionInfo.verified){
         {
            verificationContainer = <View style={styles.verifiContainer}>
                <Icon name="done" color="#00FF00" size={24}></Icon>
                <Text>Verified</Text>
            </View>;
        }
    }
    else{
        verificationContainer = <View style={styles.verifiContainer}>
            <Icon name="warning" color="#FF0000" size={24}></Icon>
            <Text>Unverified</Text>
        </View>;
    }

    let date = " "+dateFormat(this.props.date, "mm/dd h:MMtt");
    let author = " "+this.props.author;
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
                <View style={styles.bodyContainer}>
                    <View style={styles.cardInfo}>
                        <Text style={{fontWeight: 'bold'}}>Author:
                            <Text style={{fontWeight: 'normal'}}>
                                {author}
                            </Text>
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>Submitted:
                            <Text style={{fontWeight: 'normal'}}>
                                {date}
                            </Text>
                        </Text>
                    </View>
                    {verificationContainer}
                </View>
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
  },
  bodyContainer: {
      flexDirection: 'row'
  },
  verifiContainer: {
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  cardInfo: {
      flexDirection: 'column',
      flex: 3,
      justifyContent: 'center'
  }
});
