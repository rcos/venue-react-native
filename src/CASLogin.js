//@flow

import React, { Component } from 'react';

var venue = require("venue-api-react");

import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Linking,
    Image,
    WebView,
    ActivityIndicator
} from 'react-native';

import { Button, Toolbar } from 'react-native-material-design';
import SplashScreen from 'react-native-splash-screen';
import { getCASLT } from './helpers';
import { casLogPost } from './helpers';
export default class Signin extends Component{

  state: {
    attemptingAuth: bool,
    username: string,
    password: string,
    lt: string,
    execution: string,
  };

  constructor(){
    super();
    this.state = {
      attemptingAuth: false,
      username: "",
      password: "",
      lt: "",
      execution: ""
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    this.setState({"attemptingAuth": true});
    //Important: Must do this here due to the call to set state.
    //Parse the cas login token from the response HTML
    var navigator = this.props.navigator;
    getCASLT(venue.getDomain()+'/auth/cas?mobile=true').then((res) =>{
        console.log("getCASLT");
        let rescopy = (' '+res).slice(1);
        //already got token
        if(res[0] == '{'){
            let text = JSON.parse(res);
            venue.authenticateWithToken(text["token"]).then(() => {
                console.log("Resetting to dashboard");
                navigator.resetTo({title: "dashboard"});
            });
        }
        //find and set POST values in state, then it's the buttons job
        else{
            this.setState({"attemptingAuth": false})
            let tok = res.match(/LT-\d*-\w*-cas-auth.server.rpi.edu/g);
            let ex = rescopy.match(/e\d+s\d+/g);
            if (tok.length > 0 && ex.length > 0){
                this.setState({lt: tok[0], execution: ex[0]});
            }
        }
    });
  }

  //triggers authentication attempt
  signInPress(){
      var navigator = this.props.navigator;
      this.setState({'attemptingAuth': true});
      casLogPost(venue.getDomain()+'/auth/cas?mobile=true',this.state.username, this.state.password, this.state.lt, this.state.execution)
      .then((headers)=>{
          //get ST-token from headers
          var cookies = headers.get("Location");
          let tokarray = cookies.match(/ticket=ST-\d*-\w*-cas-auth.server.rpi.edu/g);
          if (tokarray.length < 1){
               //wrong password er sumthin
              this.setState({'attemptingAuth': false});
          }
          let stTok = tokarray[0];
          fetch("https:///venue.cs.rpi.edu/auth/cas?mobile=true&"+stTok, {
                method: 'GET'
          }).then((response) => {
                return response.json();
              }).then((json) => {
                  console.log("HERES JSON");
                  console.log(json);
                  //this.setState({attemptingAuth: true});
                  if (json['token']){
                      venue.authenticateWithToken(json['token']).then(() => {
                          navigator.resetTo({title: "dashboard"});
                      });
                  }
                 }).catch((err,arg2) => {
                 // Ignore all the errors- they come from bad URLS during the
                 // navigation state change
              });
      });
}

    render(){
        let display;
        if (this.state.attemptingAuth){
            display =
            <View>
                <Toolbar
                    title={"venue"}/>
                <ActivityIndicator
                    color="#2196F3"
                    animating={this.state.attemptingAuth}
                    style={styles.loadingScreen}
                    size="large"/>
            </View>;
        }
        else{
            display =
            <View>
                <Toolbar
                  title={"venue"}/>
                <Text style={styles.welcome}>
                  CAS Login
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
                  <Button text="Sign up" value="Sign up" onPress={()=> Linking.openURL(venue.getSignupURL())} />
                  <Button text="Sign in" value="Sign in" onPress={()=> this.signInPress()} />
                </View>
            </View>;
        }
        console.log("Login token is: "+this.state.lt);
        console.log("execution  is: "+this.state.execution);
        return (
          <View style={styles.container}>
            {display}
          </View>

        );
      }
    }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      opacity: 1
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
    },
    loadingScreen:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      },
  });



//   whenNavigationStateChanges(navState: any){
//     var navigator = this.props.navigator;
//     console.log("navurl: "+navState.url);
//     fetch(navState.url, {
//       method: 'GET'
//     }).then((response) => {
//       return response.json();
//     }).then((json) => {
//         console.log("HERES JSON");
//         console.log(json);
//       //this.setState({attemptingAuth: true});
//       if (json['token']){
//         if (!this.state.attemptingAuth){
//             venue.authenticateWithToken(json['token']).then(() => {
//             console.log("Resetting to dashboard");
//             //navigator.resetTo({title: "dashboard"});
//           });
//         }
//       }
//     }).catch((err,arg2) => {
//       // Ignore all the errors- they come from bad URLS during the
//       // navigation state change
//     });
//   }
//
//   render(){
//         //console.log("login token is: "+this.state.lt);
//         return (
//           <View style={styles.container}>
//             <View style={styles.toolbar}>
//               <Image
//                   source={require('./img/toolbarlogo.png')}
//                   style={styles.logo}/>
//             </View>
//             <WebView
//               style={(this.state.attemptingAuth) ? styles.hidden : styles.webview}
//               source={{uri: venue.getDomain() + "/auth/cas?mobile=true"}}
//               onNavigationStateChange={this.whenNavigationStateChanges.bind(this)}
//               >
//               CAS Login Page
//             </WebView>
//             <ActivityIndicator
//               style={(this.state.attemptingAuth) ? styles.loadingScreen : styles.loadingScreenHidden}
//               size="large"/>
//           </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   },
//   toolbar:{
//     height: 48,
//     backgroundColor: "#2196F3",
//     elevation: 2,
//   },
//   logo: {
//       height: 20,
//       width: 108,
//       position: 'absolute',
//       bottom: 0
//   },
//   webview: {
//     marginTop:55,
//     flex: 1,
//   },
//   hidden:{
//       flex: 0,
//       width: 0,
//       height: 0,
//       opacity: 0
//   },
//   loadingScreenHidden:{
//       flex: 0,
//       width: 0,
//       height: 0,
//       opacity: 0
//   },
//   loadingScreen:{
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 8,
//   },
//   text: {
//       flex: 1,
//       fontSize: 30
//   }
// });
