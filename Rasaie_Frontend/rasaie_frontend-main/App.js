import * as React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';

import {ScrollView} from 'react-native-gesture-handler';

import Navigator from './routes/homeStack';

const confirmation = () => {
  return (
    // <NavigationContainer>
    //   <View
    //     style={{
    //       backgroundColor: 'rgb(255,255,255)',
    //       height: 700,
    //     }}>
    //     <ScrollView>
    //       <Image
    //         style={{
    //           height: 85,
    //           width: 85,
    //           marginTop: 70,
    //           marginLeft: '35%',
    //         }}
    //         source={require('./tick.jpg')}
    //       />
    //       <Text
    //         style={{
    //           marginTop: '2%',
    //           fontSize: 30,
    //           marginLeft: '33%',
    //         }}>
    //         ThankYou
    //       </Text>
    //       <Text
    //         style={{
    //           marginTop: '2%',
    //           fontSize: 28,
    //           marginLeft: '3%',
    //         }}>
    //         Your Order Has Been Placed
    //       </Text>
    //       <Text
    //         style={{
    //           marginTop: '2%',
    //           fontSize: 30,
    //           marginLeft: '29%',
    //         }}>
    //         Successfully
    //       </Text>
    //       <TouchableOpacity
    //         style={styles.SubmitButtonStyle}
    //         activeOpacity={0.5}>
    //         <Text style={styles.TextStyle}> Back To Home </Text>
    //       </TouchableOpacity>
    //     </ScrollView>
    //   </View>
    // </NavigationContainer>

    <Navigator></Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  SubmitButtonStyle: {
    marginTop: '8%',
    paddingTop: '3%',
    paddingBottom: '4%',
    width: 250,
    marginLeft: '16%',
    backgroundColor: 'rgb(0,157,224)',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  TextStyle: {
    marginTop: 1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default confirmation;
