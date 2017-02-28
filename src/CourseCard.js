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

export default class CourseCard extends Component{

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
      console.log(this.props.image);
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
            <Card.Actions position="center">
            <Button value="DETAILS" text="DETAILS"
              onPress={() => this.props.navigator.push(
                {title: "coursedetails",
                info: {
                  courseId: this.props.courseId,
                  courseInfo: this.props.courseInfo
                }})
              }/>
            </Card.Actions>
        </Card>
    );
  }
}

CourseCard.propTypes = {
  title: PropTypes.string,
  courseId: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  course: PropTypes.string,
  courseInfo: PropTypes.object
};

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
  cardImage: {
    left:0,
    right:0
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
