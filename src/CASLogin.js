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
import SplashScreen from 'react-native-splash-screen'

export default class Signin extends Component{

  state: {
    attemptingAuth: bool,
    webFlex: 1,
    casURL: string
  };

  constructor(){
    super();
    this.state = {
      attemptingAuth: false,
      casURL: venue.getDomain() + "/auth/cas?mobile=true"
    };
  }

  componentDidMount(){
      SplashScreen.hide();
  }

  // componentWillUpdate(){
  //     console.log("updating");
  // }


  whenNavigationStateChanges(navState: any){
    var navigator = this.props.navigator;
    if (navState.url  != this.state.casURL){
        if (!navState.url.includes("https://cas-auth.rpi.edu/cas/login")){
            Promise.resolve(this.setState({attemptingAuth: true})).then(()=>{
                fetch(this.state.casURL, {
                  method: 'GET'
                }).then((response) => {
                  return response.json();
                }).then((json) => {
                  //this.setState({attemptingAuth: true});
                  if (json['token']){
                      console.log("token");
                      venue.authenticateWithToken(json['token']).then(() => {
                            navigator.resetTo({title: "dashboard"});
                      });
                    }
                    else{
                        if (!navState.url.includes(venue.getDomain())){
                            this.setState({attemptingAuth: false});
                        }
                    }
                }).catch((err,arg2) => {
                    if (!navState.url.includes(venue.getDomain())){
                        this.setState({attemptingAuth: false});
                    }
                  // Ignore all the errors- they come from bad URLS during the
                  // navigation state change
                });
            });
        }
    }
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
              style={(this.state.attemptingAuth) ? styles.loadingScreen : styles.loadingScreenHidden}
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
  }
});
