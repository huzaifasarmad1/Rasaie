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
export default function mobilenumber({navigation}) {
  const [isLoading, setLoading] = useState(true);
  // let [data, setData] = useState('1');

  const [value, onChangeText] = React.useState('');

  const [verify, onSend] = React.useState('Verify Me');
  const [spinner, onSpinnerChange] = React.useState(false);
  const getMoviesFromApiAsync = async () => {
    console.log("ohhhho");
    try {
      console.log("ohhhho1");
      let response = await fetch(
        `https://node---js.herokuapp.com/users/sendText?recipient=${value}`);
      console.log("ohhhho2");
      console.log("ohhhho2");
      let json = await response.json();
      console.log('json.res');
      console.log('json.res');
      console.log('json.res');
      if (json.res == 'Done') {
        console.log("oo");
        console.log(navigation);
        navigation.navigate('verifcation', {phoneno: value});
      } else {
        console.log('wrong no bro');
      }
      console.log('second wrong no bro');
      onSpinnerChange(false);
      return json;
    } catch (error) {
      console.log('catching');
      console.error(error);
      onSpinnerChange(false);
    }
  };

  
  // AsyncStorage.getItem('token', (err, result) => {
  //   // console.log("results");
  //   // console.log(result);
    
  //     // setData(()=>jwt_decode(result));
  //     // decoded = jwt_decode(result);
  //     // console.log(data);
  // });

  


  const pressHadnler = async() => {
    
    if(value.length<10 ){
      Alert.alert('Alert', 'Number should be 10 digits long');
      return;
      }
      else if(verify=='Please Wait while we send message'){
        Alert.alert('You will shortly receive a confirmation message ');
      }
      else{
        onSend('Please Wait while we send message');
        onSpinnerChange(true);
        await getMoviesFromApiAsync();
    
        navigation.navigate('verifcation', {phoneno:value});
      // navigation.navigate('verifcation',{phoneno:value});
      }
    // console.log('decoded');
    
    // navigation.navigate('verifcation');
  };
  const keyboardVerticalOffset =  0
  // const keyboardVerticalOffset = 0
  // if(data!=1){
  //   navigation.navigate('map');
  // }
// console.log(data);
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
      
        <Text style={styles.logo}>Enter Your Mobile Number: </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+92</Text>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="number-pad"
            underlineColorAndroid="transparent"
            maxLength={10}
            backgroundColor="white"
            onChangeText={(text) => onChangeText(text)}
            value={value}
style={{marginTop:-20}}
          />
        </View>
        
        <Text style={styles.logo1}>To Receive A Validation Code.</Text>
        <KeyboardAvoidingView>
        <View style={styles.MainContainer}>
      
       <TouchableOpacity
            style={styles.SubmitButtonStyle}
            onPress={pressHadnler}
            activeOpacity={0.5}>
            <Text style={styles.TextStyle}> Verify Me </Text>
</TouchableOpacity>

 </View>
 </KeyboardAvoidingView>

      </ScrollView>
      </KeyboardAvoidingView>
      </View>
       // <View style={{flex: 1, padding: 24}}>
    //   {isLoading ? (
    //     <ActivityIndicator/>
    //   ) : (
    //     <FlatList
    //       data={data}
    //       keyExtractor={({id}, index) => id}
    //       renderItem={({item}) => (
    //         <Text>
    //           {item.title}, {item.releaseYear}
    //         </Text>
    //       )}
    //     />
    //   )}
    // </View>
  );
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
  logo1: {

    marginLeft: '4%',
    marginTop: '2%',
    fontSize: 20,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
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
});
// export default HelloWorldApp;
