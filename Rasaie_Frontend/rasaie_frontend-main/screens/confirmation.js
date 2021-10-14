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
import {ScrollView} from 'react-native-gesture-handler';

export default function confirmation({navigation}) {
  const pressHadnler = () => {
    navigation.navigate('map');
  };
  return (
    <View
      style={{
        backgroundColor: 'rgb(255,255,255)',
        height: 700,
      }}>
      <ScrollView>
        <Image
          style={{
            height: 85,
            width: 85,
            marginTop: 70,
            marginLeft: '35%',
          }}
          source={{ uri: 'tick' }}
        />
        <View style={{ flexDirection: 'row',alignItems: 'center'}}>
     <Text style={{fontSize: 20,width: '100%',textAlign: 'center',lineHeight:30}} >
     ThankYou{'\n'}Your Order Has Been Placed{'\n'}Successfully
     </Text>
</View>
        <Text style={{fontSize: 20,}}>

        </Text>
        
        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity={0.5}
          onPress={pressHadnler}>
          <Text style={styles.TextStyle}> Back To Home </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
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
// export default confirmation;
