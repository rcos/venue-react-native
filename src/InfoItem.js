import React, { Component } from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class InfoItem extends Component{

  static styles = StyleSheet.create({
    container: {
      height:80,
      paddingTop:10,
      paddingLeft:10,
      left:0, right:0,
      flexDirection: 'row',
      borderBottomColor: "#ccc",
      borderBottomWidth: 1
    },
    icon:{
      marginTop:5,
      marginLeft:15,
      marginRight:15
    },
    itemDescription: {
      marginTop: 5,
      fontSize: 18,
      flex:1,
    },
    itemDescriptionCentered: {
      flex:1,
      marginTop:15,
      fontSize: 18
    },
    smallText: {
      fontSize: 14
    }
  });

  render(){
    var styles = InfoItem.styles;
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.container} >
          <Icon.Button
            style={styles.icon}
            name={this.props.icon}
            size={30}
            color={this.props.iconColor || "#ccc"}
            backgroundColor="#fff"/>
          <Text numberOfLines={2}
            style={[
              this.props.centerContent ? styles.itemDescriptionCentered : styles.itemDescription,
              this.props.smallText && styles.smallText,
            ]}>
            {this.props.children}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
