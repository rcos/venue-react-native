//@flow
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

var venue = require("venue-api-react");

export default class Upload extends Component{

  static MODE = {
    TAKING_PHOTO: 1,
    INPUT_FORM: 2,
    UPLOADING:3
  }

  state: {
    mode:any,
    position: any,
    submissionTitle: string,
    submissionContent: string
  };

  camera:any;
  watchID:any;

  constructor(){
    super()
    this.state = {mode: Upload.MODE.INPUT_FORM,
      position: null,
      submissionTitle: "",
      submissionContent: ""
    };
    this.camera = undefined;
    this.watchID = null;
  }

  componentDidMount() {
    this.getLocation(true);
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState(state => state.position = position);
    });
  }

  getLocation(accuracy:bool) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState(state => state.position = position);
      },
      (error) => {
          if(accuracy) this.getLocation(false)
          else alert("Location could not be found")
      },
      {enableHighAccuracy: accuracy, timeout: 10000, maximumAge: 1000}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  changeState() {
      if (this.state.submissionTitle.length>0){
          this.setState({mode: Upload.MODE.TAKING_PHOTO});
      }
      else{
          ToastAndroid.show("Title is required!", ToastAndroid.SHORT);
      }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        var imagePath = data.path;
        this.setState((state)=>{
          state.mode = Upload.MODE.UPLOADING;
          return state;
        });

        // Upload to site
        venue.uploadToEvent({
          title: this.state.submissionTitle,
          content: this.state.submissionContent,
          eventId: this.props.eventId,
          filePath: imagePath,
          coordinates: [ this.state.position.coords.longitude, this.state.position.coords.latitude ]
      }).then((res) => {
          if (res.status > 200){
              ToastAndroid.show("Upload failed! Please try again.", ToastAndroid.SHORT);
              this.setState((state)=>{
                state.mode = Upload.MODE.INPUT_FORM;
                return state;
              });
          }
          else{
              ToastAndroid.show("Upload successful!", ToastAndroid.SHORT);
              this.props.navigator.pop();
          }
        });

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
    }else if (this.state.mode == Upload.MODE.INPUT_FORM){
      pageContent = (
          <View>
          <Toolbar
              icon='arrow-back'
              onIconPress={() => this.props.navigator.pop()}
              title="Upload"/>
            <View style={{marginTop: 200}}>
              <TextInput
                placeholder={"Submission Title*"}
                style={styles.textInput}
                onChangeText={(submissionTitle) => this.setState({submissionTitle})}
                value={this.state.submissionTitle}
              />
              <TextInput
                placeholder={"Submission Content"}
                style={styles.textInput}
                multiline={true}
                onChangeText={(submissionContent) => this.setState({submissionContent})}
                value={this.state.submissionContent}
              />
              <Button text="Take Photo and Submit" value="Take photo and submit" onPress={() => this.changeState()} />
            </View>
        </View>
      );
    }else if (this.state.mode == Upload.MODE.UPLOADING){
      pageContent = (
          <View>
            <Toolbar
                icon='arrow-back'
                onIconPress={() => this.props.navigator.pop()}
                title="Upload"/>
            <View style={{marginTop:200}}>
              <ProgressBarAndroid styleAttr='Large'  />
              <Text style={{textAlign:'center', marginTop:20}}> Upload in progress </Text>
            </View>
        </View>
      );
    }

    return (
      <View>
        {pageContent}
      </View>
    );
  }
}

Upload.propTypes = {
  eventId: PropTypes.string,
  eventInfo: PropTypes.object
};


const styles = StyleSheet.create({
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
  textInput: {
    fontSize:18,
    width:200,
    alignSelf: 'center',
    textAlign: 'center'
  },
  captureText: {
    marginTop: 30,
    textAlign: "center"
  }
});
