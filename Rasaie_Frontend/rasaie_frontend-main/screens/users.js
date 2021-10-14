
// import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UserAvatar from 'react-native-user-avatar';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
const users = () => {
  return (
    <View style={{
      backgroundColor: 'rgb(235,235,235)',
      height: 680


    }}>
      <ScrollView>

        <Text style={{
          fontSize: 30,
          marginLeft: 120,
          marginTop: 40
        }}>Users List</Text>

        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>
        <View style={styles.MainContainer}>
          <UserAvatar style={styles.tinyLogo} size={65} name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
          <Text style={styles.name}>Huzaifa</Text>
        </View>

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  name: {
    marginLeft: '30%',
    marginTop: '-17%',
    fontSize: 20
  },
  tinyLogo: {
    marginTop: '3%',
    width: 60,
    height: 60,
    marginLeft: '3%',
    flexDirection: 'row'
  },
  MainContainer: {
    height: 80,
    width: 330,
    backgroundColor: 'white',
    marginLeft: '4%',
    marginTop: '2%'

  },
})
export default users;