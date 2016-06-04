import React, { Component, PropTypes } from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';

import { Button, Card } from 'react-native-material-design';

export default class EventCard extends Component{

  static propTypes = {
    title: PropTypes.string,
    eventId: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    course: PropTypes.string
  }


  render(){

    const defaultImage = <Image style={styles.cardImage}
      source={require("./img/default_event.jpg")}
    />;
    img = defaultImage;

    if (this.props.image){
      img = <Image style={styles.cardImage}
        source={this.props.image}
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
                  onPress={() => alert("No information for this course is available at this time.")}/>
                <Button value="DETAILS" text="DETAILS"
                onPress={() => this.props.navigator.push(
                  {title: "details",
                  info: {
                    event: this.props.eventId
                  }})
                }/>
                <Button value="ATTEND" text="ATTEND"
                  onPress={() => this.props.navigator.push(
                    {title: "attend",
                    info: {
                      event: this.props.eventId
                    }})
                  }/>
            </Card.Actions>
        </Card>
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
  cardImage: {
    left:0,
    right:0,
    resizeMode: "cover"
    // alignSelf: 'center'
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
