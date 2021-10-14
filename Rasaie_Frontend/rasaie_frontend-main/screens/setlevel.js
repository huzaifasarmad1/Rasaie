import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import jwt_decode from "jwt-decode";
import {
  View,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator, 
  TouchableWithoutFeedback, 
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, TextInputMask} from 'react-native-paper';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import verification from './screens/verifcation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import profile from './profile';


export default function setlevel({navigation}) {
  async function getProfileInfo (){
    let profilevalue = await AsyncStorage.getItem('token');
      return profilevalue;
    };
    const pressHadnler = async() => {

      console.log('Insidee press handler')
      if(minlevel<=0){
        Alert.alert('Invalid minimum  or maximum level');
        return;  
      }
      if(maxlevel<=0){
        Alert.alert('Invalid minimum  or maximum level')
      return;
      }
      if(parseInt(minlevel)>(parseInt(maxlevel))){
        console.log(minlevel)
        console.log(maxlevel) 
        console.log(minlevel > maxlevel) 
        Alert.alert('Minimum Level Should be lesser than maximum level ')
        return;
      }
      var profiledetails  = await getProfileInfo ()
      let res=jwt_decode(profiledetails)
       console.log(res);
   let response= fetch('https://node---js.herokuapp.com/tanklevel', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id:res.id,
        minlevel: minlevel,
        maxlevel: maxlevel,
        ordered_on:'1996-12-07',    
        ordered_by:'asfdfd',
        last_modified_by:'gsdeff',
        last_modified_on:'1996-12-09',
       tankid:1, 
      })
    });

    console.log('The water level is setting to '+response) 
            navigation.navigate('waterlevel');
          // navigation.navigate('verifcation',{phoneno:value});
          }
        // console.log('decoded');
        
        // navigation.navigate('verifcation');
    
    const [spinner, onSpinnerChange] = React.useState(false);
    const [minlevel, onChangeminlevel] = React.useState(0);
    const [maxlevel, onChangemaxlevel] = React.useState(0);
    const keyboardVerticalOffset =  0
    return (

        <View style={styles.container}>
 
         
     {/* // behavior={Platform.OS == 'ios' ? 'padding' : 'height'} */}
     {/* // style={styles.container}> */}
       <Spinner
           visible={spinner}
           textContent={'Loading...'}
           textStyle={styles.spinnerTextStyle}
         />
         <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}  style={{ flex: 0 }}>
          {/* <KeyboardAvoidingView> */}
       <ScrollView  keyboardShouldPersistTaps={"handled"}>
 
         <View>
           <Image style={styles.tinyLogo} source={{ uri: 'logo' }} />
         </View>
       
         <Text style={styles.logo}>Enter the minimum level of Your tank: </Text>
         <View style={styles.inputContainer}>
           {/* <Text style={styles.prefix}>+92</Text> */}
           <TextInput
             placeholder="Minimum Level"
             keyboardType="number-pad"
             underlineColorAndroid="transparent"
             maxLength={10}
             backgroundColor="white"
             onChangeText={(text) => onChangeminlevel(text)}
             value={minlevel}
 style={{marginTop:-20}}
           />      
         </View>
         <Text style={styles.logo}>Enter the maximumm level of Your tank: </Text>
         <View style={styles.inputContainer}>
           {/* <Text style={styles.prefix}>+92</Text> */}
           <TextInput
             placeholder="Maximum Level"
             keyboardType="number-pad"
             underlineColorAndroid="transparent"
             maxLength={10}
             backgroundColor="white"
             onChangeText={(text) => onChangemaxlevel(text)}
             value={maxlevel}
 style={{marginTop:-20}}
           />
         </View>
         <TouchableOpacity
            style={styles.SubmitButtonStyle}
            onPress={pressHadnler}
            activeOpacity={0.5}>
            <Text style={styles.TextStyle}> Submit </Text>
</TouchableOpacity>
         </ScrollView>
      </KeyboardAvoidingView>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: 'white',
      paddingTop: 1,
    },
  tinyLogo: {
      paddingTop:'0%',
      width: '93%',
      height: 225,
      marginTop: '2%',
      marginLeft: '4%',
      // marginRight:"2%",
    },
      
    logo: {
      marginLeft: '4%',
      marginTop: '4%',
   fontSize: 20,
    },
    inputContainer: {
        marginTop: '5%',
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: '4%',
        borderRadius: 10,
      },
      prefix: {
        paddingHorizontal: '2%',
        color: 'black',
        marginTop:-20
      },
      spinnerTextStyle: {
        color: '#FFF'
      },
      SubmitButtonStyle: {
        marginTop: '15%',
        paddingTop: '2.5%',
        paddingBottom: '2.5%',
        height: 45,
        width: '70%',
        marginLeft: '15%',
        marginRight: 30,
        backgroundColor: 'rgb(55,136,181)',
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
      },
      TextStyle: {
        marginTop: '1%',
        color: '#fff',
        textAlign: 'center',
      },
})