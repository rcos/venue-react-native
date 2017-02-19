//@flow

import React, { Component } from 'react';

var venue = require("venue-api-react");

import {
  Text,
  View,
  StyleSheet,
  WebView,
  ActivityIndicator
} from 'react-native';

import { Button, Toolbar } from 'react-native-material-design';

export default class Signin extends Component{

  state: {
    attemptingAuth: bool,
    webFlex: 1
  };

  constructor(){
    super();
    this.state = {
      attemptingAuth: false
    };
  }

  whenNavigationStateChanges(navState: any){
    var navigator = this.props.navigator;
    this.setState({attemptingAuth: true});
    fetch(navState.url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (json['token']){
        if (this.state.attemptingAuth){
            venue.authenticateWithToken(json['token']).then(() => {
            console.log("attempting to reset");
            navigator.resetTo({title: "dashboard"});
          });
        }
      }
    }).catch((err,arg2) => {
      // Ignore all the errors- they come from bad URLS during the
      // navigation state change
    });
  }

  render(){
        return (
          <View style={styles.container}>
            <Toolbar
              title={"venue - Login with CAS"}/>
            <WebView
              style={(this.state.attemptingAuth) ? styles.hidden : styles.webview}
              source={{uri: venue.getDomain() + "/auth/cas?mobile=true"}}
              onNavigationStateChange={this.whenNavigationStateChanges.bind(this)}
              >
              CAS Login Page
            </WebView>
            <ActivityIndicator
              style={ (this.state.attemptingAuth) ? styles.loadingScreen : styles.loadingScreenHidden }
              size="large"/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  webview: {
    marginTop:55,
    flex: 1,
  },
  hidden:{
      flex: 0,
      width: 0,
      height: 0,
      opacity: 0
  },
  loadingScreenHidden:{
      flex: 0,
      width: 0,
      height: 0,
      opacity: 0
  },
  loadingScreen:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
  },
  text: {
      flex: 1,
      fontSize: 30
  }
});
