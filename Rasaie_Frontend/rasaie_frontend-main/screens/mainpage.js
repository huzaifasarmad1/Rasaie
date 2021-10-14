import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
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
} from 'react-native';
import {TextInput, TextInputMask} from 'react-native-paper';
import Home from '../screens/mobilenumber';
import Map from '../screens/map';       
import WaterLevel from '../screens/waterlevel'; 
// import verification from './screens/verifcation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
export default function mainpage({navigation}) {
  // const [isLoading, setLoading] = useState(true);
  // let [data, setData] = useState('1');

  const [res, onChangeText] = React.useState('');
  const [loaded, setOnLoaded] = React.useState(false);
  const [spinner, onSpinnerChange] = React.useState(true);


  const gettoken = async () => {
    try {
      let value = await AsyncStorage.getItem('token')
    console.log("resultssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
    console.log(value);
      onChangeText(value);
      setOnLoaded(true);
      onSpinnerChange(false);
  ;
    }
catch{
  console.log('inn catchhhh')
}
 }
 gettoken();
// let value = await AsyncStorage.getItem('token')
  //   console.log("resultssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
  //   console.log(value);
  //     onChangeText(value);
  //     setOnLoaded(true);
  //     onSpinnerChange(false);
  // ;

console.log('loaded',loaded)
if(loaded){
  if(!res){
    return <Home navigation={navigation} />
  } else{
    return <WaterLevel navigation={navigation} />
  } 
}else{
  return <View>
      <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
  </View>
}
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 50,
  },
  tinyLogo: {
    width: '93%',
    height: 200,
    marginTop: '2%',
    marginLeft: '4%',
    // marginRight:"2%",
  },
  logo: {
    marginLeft: '4%',
    marginTop: '8%',

    fontSize: 20,
  },
  logo1: {
    marginLeft: '4%',
    marginTop: '5%',
    fontSize: 20,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  SubmitButtonStyle: {
    marginTop: '30%',
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
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
// export default HelloWorldApp;
