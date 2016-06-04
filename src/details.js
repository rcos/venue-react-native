import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  ListView
} from 'react-native';

export default class Details extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text> Detail View </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
