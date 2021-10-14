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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import jwt_decode from "jwt-decode";
import Spinner from 'react-native-loading-spinner-overlay';
export default function details({navigation}) {

  const [spinner, onSpinnerChange] = React.useState(false);
  const phoneno = navigation.getParam('phoneno');
  console.log('v' + phoneno);

  const [name, onChangeName] = React.useState('---');

  const [phoneNo, onChangePhone] = React.useState('-------');

  const [id, onChangeID] = React.useState('');

  const [address, onChangeAddress] = React.useState('Useless Placeholder');
  const [value, onChangeText] = React.useState('Useless Placeholder');
  // const [value,onChangeText] = React.useState('')
  async function getProfileInfo (profile_info){
    return await AsyncStorage.getItem('token')
   };
// Similar to componentDidMount and componentDidUpdate:
// React.useEffect(() => {
  // Update the document title using the browser 
React.useEffect(() => {
  async function fetchMyAPI() {
    const tokenvalue = await getProfileInfo();
       console.log("result");
       console.log(tokenvalue);
       let res=jwt_decode(tokenvalue)
       console.log(res.name);
       onChangeName(res.name);
   
       onChangeID(res.id);
   
       onChangePhone(res.phoneno);



       const addressvalue = await  AsyncStorage.getItem('address')
       console.log("result");
       console.log("result");
       console.log("result");
       console.log(addressvalue);
       console.log("result");
       console.log("result");
       console.log("result");
       console.log("result");
       console.log("result");
       console.log("result");
    let res1=JSON.parse(addressvalue);
    console.log('response');
       console.log(res1);
      onChangeText(res1.address)
     }
  fetchMyAPI()
  


},[])
const pressHadnler = async () => {
  if(value){
    onSpinnerChange(true);
    let response = await fetch('https://node---js.herokuapp.com/orders', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderby: `${id}`,
          name: `${name}`,
          order_address: `${value}`,
          customer_contact_number:`${phoneNo}`,
          driver_id: `${id}`,
          tanker_id:`${id}`
        }),
      });
      let json =  await response.json();
      console.log(json);
      onSpinnerChange(false);
    navigation.push('confirmation');
  }
  else{
    Alert.alert('Please Enter a valid address ');
  }
 
  };
  const pressHandler = () => {
    console.log('inside press handler')
    navigation.navigate('waterlevel');
  };
  return (
    <View
      style={{
        backgroundColor: 'rgb(255,255,255)',
      }}>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      <ScrollView>
        <View
          style={{
            backgroundColor: 'transparent',
          }}></View>

        <Image style={styles.tinyLogo}  source={{ uri: 'logo' }} />

        <View>
          <Text
            style={{
              fontSize: 20,
              marginLeft: '10%',
              marginTop: '2%',
              flexDirection: 'row',
            }}>
            Sub Total
          </Text>
          <Text
            style={{
              flexDirection: 'row',
              fontWeight: 'bold',
              fontSize: 20,
              marginLeft: '66%',
              marginTop: '-8%',
            }}>
            Rs 1000
          </Text>
        </View>
        {/* <View
          style={{
            marginTop: '3%',
          }}>
          <TextInput
            placeholder="Promo Code"
            underlineColorAndroid="transparent"
            maxLength={10}
            backgroundColor="white"
          />
        </View> */}
        {/* <View style={styles.MainContainer}>
          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={0.5}>
            <Text style={styles.TextStyle}> Apply </Text>
          </TouchableOpacity>
        </View> */}




        <View>
          <Text
            style={{
              fontSize: 20,
              marginLeft: '10%',
              marginTop: '4%',
              flexDirection: 'row',
            }}>
            Total Charges
          </Text>
          <Text
            style={{
              flexDirection: 'row',
              fontWeight: 'bold',
              fontSize: 20,
              marginLeft: '66%',
              marginTop: '-7%',
            }}>
            Rs 1000
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              marginLeft: '5%',
              marginTop: '5%',
              flexDirection: 'row',
              fontWeight: 'bold',
            }}>
            Contact details
          </Text>
          <Text
            style={{
              fontSize: 21,
              marginLeft: '10%',
              marginTop: '2%',
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: '10%',
              marginTop: 2,
            }}>
            0{phoneNo}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: '5%',
              marginTop: '3%',
              flexDirection: 'row',
              fontWeight: 'bold',
            }}>
            Delivery details
          </Text>
          {/* <Text
            style={{
              fontSize: 20,
              marginLeft: '10%',
              marginTop: '2%',
            }}>
            2, Street 3,Rawalpindi
          </Text> */}
{/* <Button
  onPress={pressHandler}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}
        <TextInput
        multiline
            // placeholder="Promo Code"
            onChangeText={text => onChangeText(text)}
            value={value}
            underlineColorAndroid="transparent"
            maxLength={100}
            backgroundColor="white"
            autoCorrect={false}
            keyboardType="visible-password"
            autocomplete="off"
            editable={true}
            numberOfLines={3}
      disabled={false}
            
            style={{borderWidth:0.5,borderColor:'grey',margin:'2%'}}

          />

        </View>
        <View style={styles.MainContainer}>
          <TouchableOpacity
            style={styles.orderButtonStyle}
            activeOpacity={0.5}
            onPress={pressHadnler}>
            <Text style={styles.orderTextStyle}> Place Order </Text>
          </TouchableOpacity>
     
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'white',
  },
  tinyLogo: {
    width: '93%',
    height: 200,
    marginTop: '2%',
    marginLeft: '4%',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  SubmitButtonStyle: {
    marginTop: '2%',
    paddingTop: '3%',
    paddingBottom: '4%',
    width: '30%',
    marginLeft: '34%',
    backgroundColor: 'rgb(55,136,181)',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  orderButtonStyle: {
    marginTop: '2%',
    paddingTop: '3%',
    paddingBottom: '4%',
    width: '70%',
    marginLeft: '15%',
    // marginRight: 30,
    backgroundColor: 'rgb(55,136,181)',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20,
  },
  TextStyle: {
    marginTop: '1%',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderTextStyle: {
    marginTop: '1%',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
// export default details;
