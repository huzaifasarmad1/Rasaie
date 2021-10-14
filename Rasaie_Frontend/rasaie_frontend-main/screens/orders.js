import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const orders = () => {
  return (
    <View style={{
      backgroundColor: 'rgb(235,235,235)',
      height: 680
    }}>
      <ScrollView>
        <Text style={{
          fontSize: 30,
          marginLeft: '28%',
          marginTop: '10%',
          marginBottom: '5%'
        }}>Orders List</Text>

        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 1</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 2</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 3</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 4</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 5</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 6</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 7</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 8</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 9</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>
        <View style={styles.MainContainer}>

          <Text style={styles.order}>Order 10</Text>
          <Text style={styles.id}>ABC-123</Text>
        </View>

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  order: {
    marginLeft: '3%',
    marginTop: '2%',
    fontSize: 20
  },
  id: {
    marginLeft: '72%',
    marginTop: '-9%',
    fontSize: 20
  },
  MainContainer: {
    height: 80,
    width: 330,
    backgroundColor: 'white',
    marginLeft: '4%',
    marginTop: '2%'
  },
})
export default orders;