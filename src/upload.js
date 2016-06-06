import React, { Component, PropTypes } from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  ProgressBarAndroid,
  ToastAndroid
} from 'react-native';

import { Button, Toolbar, Card } from 'react-native-material-design';

import Camera from 'react-native-camera';

export default class Upload extends Component{

  static propTypes = {
    eventId: PropTypes.string
  }

  static MODE = {
    TAKING_PHOTO: 1,
    // INPUT_FORM: 2,
    UPLOADING:3
  }

  constructor(){
    super()
    this.state = {mode: Upload.MODE.TAKING_PHOTO};
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        var imagePath = data.path;
        this.setState((state)=>{
          state.mode = Upload.MODE.UPLOADING;
          return state;
        });
        setTimeout(() => {
          ToastAndroid.show("Upload Successful!", ToastAndroid.SHORT);
          this.props.navigator.pop();
        }, 3000);
      })
      .catch(err => {
        alert("Unable to take photo");
        console.error(err);
      });
  }

  render(){

    var pageContent;
    if (this.state.mode == Upload.MODE.TAKING_PHOTO){
      pageContent =  (
        <View>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
          </Camera>
          <View style={styles.capture}>
            <Text style={styles.captureText} onPress={() => this.takePicture()}>[CAPTURE]</Text>
          </View>
        </View>
      );
    }else if (this.state.mode == Upload.MODE.UPLOADING){
      pageContent = (
        <View style={{marginTop:200}}>
          <ProgressBarAndroid styleAttr='Large'  />
          <Text style={{textAlign:'center', marginTop:20}}> Upload in progress </Text>
        </View>
      );
    }

    return (
      <View>
        {pageContent}
        <Toolbar
        icon='arrow-back'
        onIconPress={() => this.props.navigator.pop()}
        title={"Upload to Event Name"}/>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    position:"absolute",
    top: Dimensions.get('window').height - 200,
    width:100,
    left: Dimensions.get('window').width/2 - 100,
    height:100,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    margin: 40,
    marginBottom:200
  },
  captureText: {
    marginTop: 30,
    textAlign: "center"
  }
});
