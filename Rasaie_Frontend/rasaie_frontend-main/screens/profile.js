import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';

const profile = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <Image
          style={{width: '93%', height: 200, marginTop: '2%', marginLeft: '4%'}}
          source={{ uri: 'logo' }}
        />
        <Text
          style={{
            fontSize: 30,
            marginLeft: '40%',
            marginTop: '3%',
          }}>
          Profile
        </Text>
        <Text
          style={{
            fontSize: 25,
            marginLeft: '6%',
            marginTop: '3%',
            flexDirection: 'row',
            // fontWeight:'bold',
          }}>
          Name
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            underlineColorAndroid="transparent"
            maxLength={10}
            backgroundColor="white"
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            marginLeft: '6%',
            marginTop: '3%',
            flexDirection: 'row',
            // fontWeight:'bold',
          }}>
          Contact
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Number"
            underlineColorAndroid="transparent"
            maxLength={10}
            backgroundColor="white"
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            marginLeft: '6%',
            marginTop: '3%',
            flexDirection: 'row',
            // fontWeight:'bold',
          }}>
          Address
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Address"
            underlineColorAndroid="transparent"
            maxLength={10}
            backgroundColor="white"
          />
        </View>
        <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity={0.5}>
          <Text style={styles.TextStyle}> Submit </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: '1%',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: '5%',
    borderRadius: 10,
  },
});
export default profile;
