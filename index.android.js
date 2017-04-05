/**
 * Venue React Native App
 * @flow
 */

 import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  View,
  BackAndroid
} from 'react-native';

import routes from "./src/routes";
import config from "./src/config"
var venue = require("venue-api-react");

class venueReactNative extends Component {

  constructor(){
    super()
    venue.setDomain("https://venue.cs.rpi.edu");
    // venue.setDomain("http://192.168.0.23:9000");
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.navigator.pop();
      return true;
    });
  }

  configureScene(route, navigator){
      //Transitions based on route title
      switch (route.title) {
          //add route transitions here
          //case 'routename':
            //return Navigator.SceneConfigs.TRANSITION
      }
      //DEFAULT TRANSITION
      return Navigator.SceneConfigs.FadeAndroid;
  }

  renderScene(route, navigator){
    var Comp = routes[route.title].component;
    console.log(route.info);
    return <Comp {...route.info} navigator={navigator}/>;
  }

  render() {
    let initialState;
    if(config.cas_login_only){
      initialState = {title: "casLogin"};
    }else{
      initialState = {title: 'signin'};
    }
    return (
      <Navigator
        ref={(nav) => this.navigator = nav}
        configureScene={this.configureScene}
        style={styles.container}
        initialRoute={initialState}
        renderScene={this.renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  toolbar: {
    textAlign: 'center'
  },
  welcome: {
    fontSize: 48,
    textAlign: 'center',
    margin: 10,
    marginTop: 100,
    marginBottom:50
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('venueReactNative', () => venueReactNative);
