// import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Header from './components/header';
const keyboardVerticalOffset =  0
// import {uuid} from 'uuidv4';
import Spinner from 'react-native-loading-spinner-overlay';
export default function login ({navigation}) {
  const [spinner, onSpinnerChange] = React.useState(false);
  const phoneno = navigation.getParam('phoneno') || 'testk';
  console.log(phoneno);
  async function setProfileInfo (profile_info){
    await AsyncStorage.setItem('token', profile_info);
};
async function getProfileInfo (){
  let profileinfovalue = await AsyncStorage.getItem('token')
  console.log(profileinfovalue);
    return profileinfovalue;
};
  const pressHadnler = async () => {
    console.log('hellp');
    onSpinnerChange(true);
    console.log(value)
    if (value.length>=3) {

      console.log('in IF');
      let response = await fetch('https://node---js.herokuapp.com/users/putUser', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          name: `${value}`,
          phoneno: `${phoneno}`,
          is_tanker_owner: 1,
        }),
      });
      let json =  await response.json();
      console.log("helloooooooo111111",json);
      console.log(json.token);
      await setProfileInfo(JSON.stringify(json.token));
      navigation.navigate('setlevel');
    } else {
      console.log('sad man');
      Alert.alert('Alert', 'Please Enter a Valid Name');
    }
    onSpinnerChange(false); 
  };

  
  const [isSelected, setSelection] = React.useState(false);
  // const [value1, onChangeText1] = React.useState('');
  // const [value2, onChangeText2] = React.useState('');
  // const [value3, onChangeText3] = React.useState('');
  // const [value4, onChangeText4] = React.useState('');
  const [value, onChangeText] = React.useState('');
  const state = {
    text: '  ',
  };

  return ( 
    <View style={styles.container}>
      <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
       <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}  style={{ flex: 0 }}>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={[styles.row, {paddingTop: 50}]}>
          {/* {/ <View> /} */}
          <Image style={styles.tinyLogo} source={{ uri: 'logo' }} />
          {/* {/ </View> /} */}
          <Text style={[styles.column, styles.text]}>Rasaie Login</Text>

          <TouchableOpacity
            style={[
              styles.column,
              styles.TouchableOpacityS,
              {marginTop: 20, borderRadius: 10},
            ]}
            // onPress={() => this._onPressAppoimentButton()}
          >
            <TextInput
              style={{alignItems: 'center', justifyContent: 'center'}}
              onChangeText={(text) => onChangeText(text)}
              // value={value}
              placeholder="Enter Your Name"
              underlineColorAndroid="transparent"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.column, styles.btn]}
            onPress={pressHadnler}>
            <Text style={styles.textBtn}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 0,
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  column: {
    // margin:50,
    // marginTop:20,
    justifyContent: 'space-around',
  },
  tinyLogo: {
    width: '93%',
    height: 200,
    marginTop: '2%',
    marginLeft: '4%',
    // marginRight:"2%",
  },
  text: {
    marginTop: 30,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    // margin: 10,
  },
  TouchableOpacityS: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: '65%',
    height: 50,
    // borderRadius: '10px 10px 0px 0px',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
  },
  btn: {
    marginTop: 50,
    backgroundColor: 'rgb(55,136,181)',
    width: '40%',
    height: 45,
    // borderRadius: 10,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: 'white',
    fontSize: 18,
    margin: 10,
  },
  image: {
    flex: 1,
  },
  logo: {
    height: 150,
    width: 350,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

// export default login;
