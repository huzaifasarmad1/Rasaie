import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {ScrollView} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
const keyboardVerticalOffset =  0
export default function verification({navigation}) {

  
  const CELL_COUNT = 6;
  const pressHadnler = () => {
    navigation.navigate('login');
  };
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [spinner, onSpinnerChange] = React.useState(false);
  const [disabled, setdisabled] = React.useState(true)
  const phoneno = navigation.getParam('phoneno');
  console.log('v' + phoneno);

  async function setProfileInfo (profile_info){
   await AsyncStorage.setItem('token', profile_info);
};
async function getProfileInfo (){
  let profilevalue = await AsyncStorage.getItem('token');
  console.log(profilevalue+'is profile value')
    return profilevalue;
};
const getMoviesFromApiAsync = async () => {
  console.log("ohhhho");
  try {
    console.log("ohhhho1");
    let response = await fetch(
      `https://node---js.herokuapp.com/users/sendText?recipient=${phoneno}`);
    console.log("ohhhho2");
    let json = await response.json();
    console.log('json.res');
    if (json.res == 'Done') {
      console.log("oo");
      console.log(navigation);
      // navigation.navigate('verifcation', {phoneno: value});
    } else {
      console.log('wrong no bro');
    }
    // onSpinnerChange(false);
    return json;
  } catch (error) {
    console.log('catching');
    console.error(error);
    // onSpinnerChange(false);
  }
};
const dissabled = () => {
    
  console.log("disable chal raha hai ")
  setdisabled(() => false)
  

};
const enabled = () => {
 console.log("enable chal raha hai ")
  if(setdisabled==false){
    console.log('chal gya')
  }
  else{
    console.log('ni chala')
  }
};
const enabled1 = () => {
  if(disabled==true){
    console.log('resned to nhi chak raha')
  }
  else{
    console.log('enable chal raha haiatgygvgv')
    

    getMoviesFromApiAsync();
    
  }
  
};
// const check = () => {
// console.log("check chal raha hai ")
  // if (value.length == 6) {
    // validateCode();
  // }
// };
// };

  const validateCode = async () => {
    try {
      onSpinnerChange(true);
      let response = await fetch(
        `https://node---js.herokuapp.com/users/validate?phoneno=${phoneno}&code=${value}`,
      );
      let json = await response.json();
      console.log(json);
      if (json.res == 'verified') {
        // console.log(json.token);
        // setProfileInfo(JSON.stringify(json.token));
        // AsyncStorage.setItem(
        //   'token',
        //   JSON.stringify(json.token),
        //   () => {
            // AsyncStorage.mergeItem(
            //   'token',
            //   JSON.stringify(json.token),
            //   () => {
              //   AsyncStorage.getItem('token', (err, result) => {
              //     console.log("result");
              //     console.log(result);
              //   });
              // }
            // );
        //   }
        // );
        // console.log("to")
        // const a=getProfileInfo();
        // console.log("a");
        // console.log(a);
        // AsyncStorage.getItem('token', (err, result) => {
        //   console.log("result");
        //   console.log(result);
        // });
        setValue('');
        console.log("spinner");
        console.log(spinner);

          navigation.navigate('login', {phoneno: phoneno});
      } else {
        Alert.alert('Number is invalid ');
        // console.log('wrong no bro');
        // navigation.navigate('verifcation', {phoneno: phoneno});
        setValue('');
      }
        onSpinnerChange(false);
      return json;
    } catch (error) {
      console.error(error);
      onSpinnerChange(false);
    }
  };

  const check = () => {
    console.log('abc');
    if (!spinner && value.length == 6) {
      validateCode();
    }
  };

  // const checkNum = () => {
  //   if (value === '123456') {
  //     // pressHadnler();
  //     console.log('hello');
  //   } else {
  //     console.log(ref.value);
  //   }
  // };
  // navigation.header = null;
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 680,
      }}>
              <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}  style={{ flex: 0 }}>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View>
       
          <Image style={styles.tinyLogo} source={{ uri: 'logo' }} />
        </View>
        <View
          style={{
            marginTop: 1,
          }}>
          <CountDown
            until={59}
            digitStyle={{backgroundColor: 'transparent'}}
            digitTxtStyle={{color: 'rgb(123,187,233)'}}
            onFinish={dissabled}
            
  onPress={() => alert('hello')}
            size={20}
            timeToShow={['M', 'S']}
            timeLabels="none"
            separatorStyle={{color: 'rgb(123,187,233)', marginTop: -5}}
            showSeparator
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            marginTop: '4%',
            marginLeft: '4%',
            // marginRight:5,
            color: 'black',
            shadowColor: '#0ca4ff',
            fontWeight: 'normal',
          }}>
          Enter the verification code sent to your mobile number via SMS:
        </Text>
        <SafeAreaView style={styles.root}>
          <Text style={styles.title}>Verification Code:</Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            check={check()}
            // onChangeText={checkNum}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </SafeAreaView>
        <Text
          style={{
            alignItems: 'center',
            color: 'black',
            fontSize: 15,
            marginLeft: '30%',
            marginTop: '2%',
            marginBottom: '1%',
            fontStyle: 'italic',
          }}>
          Did'nt Received Code?
        </Text>
        <TouchableOpacity
//  disabled={disabled}

        >
 <Text
//  disabled={true}
          style={{
            alignItems: 'center',
            color: 'black',
            fontSize: 15,
            marginLeft: '45%',
           marginTop: '1%',
            textDecorationLine: 'underline',
            fontStyle: 'italic',
          }}
          onPress={enabled1}>
 Resend?
        </Text>
        </TouchableOpacity>
        
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: '93%',
    height: 200,
    marginTop: '2%',
    marginLeft: '4%',
  },
  logo: {
    marginLeft: 15,
    marginTop: 40,
    shadowColor: '#0ca4ff',
    fontSize: 20,
  },
  root: {flex: 1, padding: '4%'},
  title: {textAlign: 'center', fontSize: 20, color: 'black'},
  codeFieldRoot: {marginTop: '8%'},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: 'black',
  },
  
  spinnerTextStyle: {
    color: '#FFF'
  },
});
// export default verification;
