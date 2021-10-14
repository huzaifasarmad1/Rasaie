// import React, {useState,Component} from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Button,
//   Alert,
//   SafeAreaView,
// } from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import {TextInput} from 'react-native-paper';
// import PercentageBar from 'react-native-percentage-reactangle';
// import * as Progress from 'react-native-progress';
// import { color } from 'd3-color';
// import { interpolateRgb } from 'd3-interpolate';
// // import React, { Component } from 'react';
// // import ReactDOM, { render } from 'react-dom';
// import LiquidFillGauge from 'react-liquid-gauge';
// import Spinner from 'react-native-loading-spinner-overlay';
// export default function waterlevel({navigation}) {
// console.log('inside water level')
// state = {
//   value: 50
// };
// startColor = '#6495ed'; // cornflowerblue
// endColor = '#dc143c'; // crimson
// const radius = 200;
// startColor = '#6495ed'; // cornflowerblue
// endColor = '#dc143c'; // crimson
//         const interpolate = interpolateRgb(startColor, endColor);
//         const fillColor = interpolate(this.state.value / 100);
//         const gradientStops = [
//             {
//                 key: '0%',
//                 stopColor: color(fillColor).darker(0.5).toString(),
//                 stopOpacity: 1,
//                 offset: '0%'
//             },
//             {
//                 key: '50%',
//                 stopColor: fillColor,
//                 stopOpacity: 0.75,
//                 offset: '50%'
//             },
//             {
//                 key: '100%',
//                 stopColor: color(fillColor).brighter(0.5).toString(),
//                 stopOpacity: 0.5,
//                 offset: '100%'
//             }
//         ];
 
// return(

// <View>
// <View style={{
//   justifyContent: 'center',
//         alignItems: 'center',
//         overflow: 'hidden',
//         marginTop:'2%'
//  }}>
//  <LiquidFillGauge
//                     style={{ margin: '0 auto' }}
//                     width={radius * 2}
//                     height={radius * 2}
//                     value={this.state.value}
//                     percent="%"
//                     textSize={1}
//                     textOffsetX={0}
//                     textOffsetY={0}
//                     textRenderer={(props) => {
//                         const value = Math.round(props.value);
//                         const radius = Math.min(props.height / 2, props.width / 2);
//                         const textPixels = (props.textSize * radius / 2);
//                         const valueStyle = {
//                             fontSize: textPixels
//                         };
//                         const percentStyle = {
//                             fontSize: textPixels * 0.6
//                         };
 
//                         return (
//                             <tspan>
//                                 <tspan className="value" style={valueStyle}>{value}</tspan>
//                                 <tspan style={percentStyle}>{props.percent}</tspan>
//                             </tspan>
//                         );
//                     }}
//                     riseAnimation
//                     waveAnimation
//                     waveFrequency={2}
//                     waveAmplitude={1}
//                     gradient
//                     gradientStops={gradientStops}
//                     circleStyle={{
//                         fill: fillColor
//                     }}
//                     waveStyle={{
//                         fill: fillColor
//                     }}
//                     textStyle={{
//                         fill: color('#444').toString(),
//                         fontFamily: 'Arial'
//                     }}
//                     waveTextStyle={{
//                         fill: color('#fff').toString(),
//                         fontFamily: 'Arial'
//                     }}
//                     onClick={() => {
//                         this.setState({ value: Math.random() * 100 });
//                     }}
//                 />
//                 <View
//                     style={{
//                         // margin: '20px',
//                         width: 120
//                     }}
//                 >
//                     {/* <button
//                         type="button"
//                         className="btn btn-default btn-block"
//                         onClick={() => {
//                             this.setState({ value: Math.random() * 100 });
//                         }}
//                     >
//                         Refresh
//                     </button> */}
//                 </View>
            
        
    

//         <Progress.Pie progress={0.9} size={200} />
//         <PercentageBar 
//         // source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}  
//         width={230}
//         percent={70}
//         borderWidth={0}
//         /> 
// </View>
// </View>
// )
// }


/////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, SafeAreaView, } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import jwt_decode from "jwt-decode";
// import * as firebase from "firebase";
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseConfig} from "./config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app(); // if already initialized, use that one
}
const waterlevel = ({navigation}) => {
  const [spinner, onSpinnerChange] = React.useState(false);
  const [value, onValueChange] = React.useState(false);
  const [messagesent, onMessageSentChange] = React.useState(false);
  const [oneTimeMsg, onMsgChange] = React.useState(0);
  const [maxLevel, onMaxLevelChange] = React.useState(0);
  const [lastMessageSent, onLastMessageSentChange] = React.useState();
  const number = navigation.getParam('phoneno');
  useEffect(() => {
    async function fetchMyAPI() {
    let response = await fetch(
      `https://node---js.herokuapp.com/tanklevel/1`);
      let json = await response.json();///
      onMaxLevelChange(json[0].maxlevel)
       }
    fetchMyAPI()

    // Update the document title using the browser API
      //  setInterval(async () => {
      //   var tank=database().ref("TANK0001")
      //   let datasnap = await tank.once("value");
      //   let val = datasnap.val();
      //   if(val && maxLevel){
      //     await distance(val)
      //   }
      //  }, 10000);
      var tank=database().ref("TANK0001")
      tank.on("value",(datasnap)=>{
        let val = datasnap.val();
        if(val && maxLevel){
          distance(val)
        }
      });
  });

  useEffect( () => () => console.log("unmount"), [] );

  async function getProfileInfo (){
    let profilevalue = await AsyncStorage.getItem('token');
      return profilevalue;
    };
var distance=async(value,)=>{
  var profiledetails  = await getProfileInfo ()
  let res=jwt_decode(profiledetails)
  var phoneno=res.phoneno
    var firstpercentage=(value/maxLevel)*100
    var percentage = Math.round(firstpercentage)
    if(percentage > 100){
      percentage = 100
    }
    // console.log('percentage',percentage)
    onValueChange(percentage)
    if(messagesent){return;}
    if(percentage>=80){
      // console.log('Water is less than 20%',oneTimeMsg)
      if(oneTimeMsg>=80){
        // console.log('inside if')
      }
        else{
          if(!lastMessageSent ||  Math.round((((new Date(lastMessageSent) - new Date()) % 86400000) % 3600000) / 60000) > 30){
            // console.log('inside else2222222222',lastMessageSent)
            onMessageSentChange(true)
            onLastMessageSentChange(new Date())
    //       let response = await fetch(
    //         `https://node---js.herokuapp.com/tanklevel/sendStatus?recipient=${phoneno}`);
    //         let json = await response.json();
    //         if (json.res == 'Done') {
    // // console.log('Message sent Successfully')
    // onMsgChange(value)
    //         }
    //         else{
    //           console.log('Issue sending message') 
    //         }
          }else{
            console.log('message was sent in last 30 mins')
          }

        }
        onMsgChange(percentage)
}
else{
  console.log('Everything is going great')
  onMsgChange(percentage)
}
}
 const pressHandler = async () => {
    onSpinnerChange(true);
navigation.navigate('map')
onSpinnerChange(false);
  }
  return(
  <View style={styles.container}>
    <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
    <ImageBackground source={require('../waterlevel.jpg')} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>{value}%</Text>
      <Text style={styles.text2}>Tank is Empty</Text>
      <SafeAreaView
          // onPress={this.pressHandler}
          style={[styles.SubmitButtonStyle]}
          >
       <TouchableOpacity
            onPress={pressHandler}
            activeOpacity={0.5}>

<Text style={styles.TextStyle}> Order Now </Text>
          </TouchableOpacity>
         
        </SafeAreaView>  
    </ImageBackground>
  </View>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  SubmitButtonStyle: {
    marginTop: RFValue(400),
    paddingTop: '2%',
    paddingBottom: '2.5%',
    alignItems:'center',
    height: '8%',
    width: '76%',
    marginLeft: '13%',
    marginRight: 30,
    backgroundColor: 'rgb(55,136,181)',
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    borderWidth: 3,
    borderColor: '#fff',
  },
  TextStyle: {
    marginTop: '0%',
    color: '#fff',
    textAlign: 'center',
    fontSize: RFPercentage(3),
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: RFPercentage(10),
    lineHeight: 134,
    fontWeight: "bold",
    textAlign: "center",
     backgroundColor: 'transparent',
        marginTop:'3%',
    // marginBottom:'50%'
    alignItems:'center',
    flexDirection:'column'
  },
  text2:{
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    textAlign: "center",
    color:"white"
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default waterlevel;

