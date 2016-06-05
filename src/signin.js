import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet
} from 'react-native';

import { Button, Toolbar } from 'react-native-material-design';

export default class Signin extends Component{

  signInPress(){
    this.props.navigator.push({title: "dashboard"});
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
        />
        <TextInput
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <View style={styles.actionButtons}>
          <Button text="Sign up" value="Sign up" onPress={()=> console.log("Sign up")} />
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
