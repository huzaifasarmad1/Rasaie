
// import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image,  ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UserAvatar from 'react-native-user-avatar';
const tankers = () => {
  return (
    <View style={{
backgroundColor:'rgb(235,235,235)',
height:680


    }}>
      <ScrollView>
    
      <Text style={{
        fontSize:30,
        marginLeft:'28%',
        marginTop:'10%',
        marginBottom:'5%'
      }}>Tankers List</Text>
      
      <View style={styles.MainContainer}>
     
  <Text style={styles.container}>Tanker 1</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
 
 <Text style={styles.container}>Tanker 2</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
      
 <Text style={{
    marginLeft:10,
    marginTop:8,
    // fontWeight:'bold',
    fontSize:20
  }}>Tanker 3</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
     
  <Text style={styles.container}>Tanker 4</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
   
<Text style={styles.container}>Tanker 5</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
    
  <Text style={styles.container}>Tanker 6</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
    
<Text style={styles.container}>Tanker 7</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
  
  <Text style={styles.container}>Tanker 8</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
   
 <Text style={styles.container}>Tanker 9</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
   <View style={styles.MainContainer}>
     
  <Text style={styles.container}>Tanker 10</Text>
  <Text style={styles.tinyLogo}>ABC-123</Text>
   </View>
 
      </ScrollView>
      </View>
  )}
  const styles = StyleSheet.create({
    container: {
      marginLeft:'4%',
    marginTop:'2%',
    // fontWeight:'bold',
    fontSize:20
    },
    tinyLogo: {
      marginLeft:'72%',
      marginTop:'-9%',
      // fontWeight:'bold',
      fontSize:20
    },
    MainContainer: {
      height:80,
        width:330,
        backgroundColor:'white',
        marginLeft:'4%',
        // marginRight:13,
        marginTop:'2%'
    },
  })
export default tankers;