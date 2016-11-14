//@flow

import React, { Component } from 'react';

var venue = require("venue-api-react");

import {
  Text,
  View,
  StyleSheet,
  WebView
} from 'react-native';

import { Button, Toolbar } from 'react-native-material-design';

export default class Signin extends Component{

  state: {
    attemptingAuth: bool
  };

  constructor(){
    super();
    this.state = {
      attemptingAuth: false
    };
  }

  whenNavigationStateChanges = async (navState: any) => {
    var navigator = this.props.navigator;
    fetch(navState.url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (json['token']){
        if (!this.state.attemptingAuth){
          venue.authenticateWithToken(json['token']).then(() => {
            navigator.resetTo({title: "dashboard"});
          });
          this.setState({attemptingAuth:true});
        }
      }
    } catch(error) {
      // Handle error
      throw error;
    }
  }

  setLoginToken = async (token) => {
    try {
      await AsyncStorage.setItem('@venue:token', token);
    } catch (error) {
      throw error;
      // Error saving data
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Toolbar
          title={"venue - Login with CAS"}/>
        <WebView
          style={styles.webview}
          source={{uri: venue.getDomain() + "/auth/cas?mobile=true"}}
          onNavigationStateChange={this.whenNavigationStateChanges.bind(this)}
          >
          CAS Login Page
        </WebView>
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
    marginTop:55
  }
});
