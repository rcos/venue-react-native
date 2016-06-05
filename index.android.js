/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  View
} from 'react-native';

import routes from "./src/routes";

class venueReactNative extends Component {

  renderScene(route, navigator){
    var Comp = routes[route.title].component;
    return <Comp navigator={navigator}/>;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{title: 'signin'}}
        renderScene={this.renderScene}
      />
    );
  }
}

// <Navigator
//   style={styles.container},
//   renderScene={this.renderScene},
//   configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight;} }
// />

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
