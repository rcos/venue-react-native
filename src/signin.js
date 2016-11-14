//@flow

import React, { Component } from 'react';

var venue = require("venue-api-react");

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Linking,
  AsyncStorage
} from 'react-native';

import { Button, Toolbar } from 'react-native-material-design';

export default class Signin extends Component{

  state: {
    username: string,
    password: string
  };

  constructor(){
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  signInPress(){
    // Check username and password
    venue.authenticate(this.state.username, this.state.password).then(() => {
      this.props.navigator.resetTo({title: "dashboard"});
    }).catch((err) => {
      alert("Could not authenticate: " + err);
    });
  }

  loginWithCAS(){
    this.props.navigator.push({title: "casLogin"});
  }

  render(){
    return (
      <View style={styles.container}>
        <Toolbar
          title={"venue"}/>
        <Text style={styles.welcome}>
          login
        </Text>
        <TextInput
          placeholder={"Username"}
          style={styles.textInput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <View style={styles.actionButtons}>
          <Button text="CAS Login" value="CAS Login" onPress={()=> this.loginWithCAS()} />
          <Button text="Sign up" value="Sign up" onPress={()=> Linking.openURL(venue.getSignupURL())} />
          <Button text="Sign in" value="Sign in" onPress={()=> this.signInPress()} />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
