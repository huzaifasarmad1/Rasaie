import React, {Component, useState, useEffect} from 'react';
// import React, {} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Button } from 'react-responsive-button';
import Geolocation from '@react-native-community/geolocation';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {TouchableOpacity } from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
navigator.geolocation = require('@react-native-community/geolocation');
import {getDistance, getPreciseDistance} from 'geolib';
import { Input } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import PlacesInput from 'react-native-places-input';
Geocoder.init(""); // use a valid API key
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
var { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: width,
    height: height,
    // zoomEnabled:'true'
  },
  tinyLogo: {
    // marginRight:"2%",
    width: '100%',
    height: '97%',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  SubmitButtonStyle: {
    marginTop: RFValue(500),
    paddingTop: '2%',
    paddingBottom: '2.5%',
    alignItems:'center',
    height: '8%',
    width: '76%',
    marginLeft: '13%',
    marginRight: 30,
    backgroundColor: 'rgb(55,136,181)',
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    borderWidth: 3,
    borderColor: '#fff',
  },
  SubmitButtonStyle1: {
    marginTop: RFValue(350),
    paddingTop: '2%',
    paddingBottom: '2.5%',
    alignItems:'center',
    height: '8%',
    width: '76%',
    marginLeft: '13%',
    marginRight: 30,
    backgroundColor: 'rgb(55,136,181)',
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    borderWidth: 3,
    borderColor: '#fff',
  },
  TextStyle: {
    marginTop: '0%',
    color: '#fff',
    textAlign: 'center',
    fontSize: RFPercentage(3),
  },
  spinnerTextStyle: {
    color: '#FFF'
  },

});
async function setProfileInfo (profile_info){
 await AsyncStorage.setItem('address', profile_info);
};
async function getProfileInfo (){
let profilevalue = await AsyncStorage.getItem('token');
  return profilevalue;
};

export default class Map extends Component {
  
  _isMounted = false;
  
  constructor(props) {
    console.log('in class');
    super(props);
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    this.state = {
      initialRegion:{
      latitude:33.6593,
      longitude: 73.0238,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
      error: null
    },
    spinner: true
    };

    // this.state = {
    //   initialRegion:{
    //   latitude: 5,
    //   longitude: 5,
    //   latitudeDelta: 0.01,
    //   longitudeDelta: 0.01,
    //   error: null
    // },
    // spinner: true
    // };
  }
// state = {
  //   region: {
  //     latitude: 5,
  //     longitude: 5,
  //     latitudeDelta: 1,
  //     longitudeDelta: 1,
  //   },
  // };
  calculateDistance = () => {

    var pdis = getPreciseDistance(
      {latitude: 33.6593, longitude: 73.0238},
      {latitude: this.state.initialRegion.latitude, longitude: this.state.initialRegion.longitude},
    );
    // alert(
    //   `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
    // );
  };

  mangwao(e){
    this.setState({spinner:true});
    console.log('eeeeeeeeee',e);
    // console.log('e.nativeEvent.coordinate',e.nativeEvent.coordinate);
    // this.setState({
    //   initialRegion:{ 
    //   latitude: e.nativeEvent.coordinate.latitude,
    //   longitude: e.nativeEvent.coordinate.longitude,
    //   error: null,
    // }
    // });
    console.log('geocoder ia chaling')
    Geocoder.from(this.state.initialRegion.latitude,this.state.initialRegion.longitude)
        .then(json => {
          console.log("eaaaaaaaaaaaaaaaaaaaaaaaa");
            var addressComponent = json.results[0].address_components[0];
            // console.log('json.results',addressComponent)
            console.log(this.make_data(json.results));
            console.log('addressComponent');
            const address =  this.make_data(json.results);
            console.log('address',address)
            if(address.city == 'Islamabad' || address.city == 'Rawalpindi'){
              setProfileInfo(JSON.stringify(address));
              this.props.navigation.navigate('details');
              this.setState({spinner:false});
            }else{
              this.setState({spinner:false});
              Alert.alert('Sorry! We does not operate in your region')
            }
   })
        .catch(error => {
          console.warn(error);
          this.setState({spinner:false});
        });
  }
 make_data(data){
    let sublocality, city, postal_code, neighborhood, county, state;
    for (const element of data) {
      if (element.types.includes('sublocality')) {
        sublocality = element.formatted_address;
      }
      if (
        element.types.includes('locality') ||
        element.types.includes('administrative_area_level_3')
      ) {
        city = element.address_components[0].long_name;
      }
      if (element.types.includes('postal_code')) {
        postal_code = element.address_components[0].long_name;
      }
      if (element.types.includes('administrative_area_level_1')) {
        state = element.address_components[0].long_name;
      }

      if (element.types.includes('neighborhood')) {
        neighborhood = element.address_components[0].long_name;
      }
      if (element.types.includes('administrative_area_level_2')) {
        county = element.address_components[0].long_name;
      }
    }
    return {
      address: data[0].formatted_address,
      sublocality: sublocality,
      postal_code: postal_code,
      neighborhood: neighborhood,
      parish: county,
      city: city,
      state: state
    };
  }

  componentDidMount() {
    this.setState({
      initialRegion:{          
        latitude: 33.6593,
         longitude: 73.0238,
      latitudeDelta:  0.05,
      longitudeDelta: 0.05,
      error: null,
    },
  
    });
    
    console.log("here111111111")
    console.log("here111111111")
    console.log("here111111111")
    console.log("here111111111")
    console.log("here111111111")
    this._isMounted = false;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('in position')
    console.log("here22222222",position)
        this.setState({
          initialRegion:{          
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta:  0.05,
          longitudeDelta: 0.05,
          error: null,
        },
        spinner:false
        });
        console.log("this.state.initialRegion");
        console.log(this.state.initialRegion);
        // await fetch(
        //   'https://www.mapquestapi.com/geocoding/v1/reverse?key=&location='+position.coords.latitude+'%2C'+position.coords.longitude+'&outFormat=json&thumbMaps=false',
        // )
        //   .then((response) => response.json())
        //   .then((responseJson) => {
        //     console.log(
        //       'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
        //     );
        //   });

      },
      
      (error) =>
        {
          this.setState({
            initialRegion:{          
              latitude: 33.6593,
               longitude: 73.0238,
                latitudeDelta:  0.095,
                longitudeDelta: 0.095,
          },
            error: error.message,
           
           
          spinner:false
          }),
         
  
        console.log('error aagya h shyd'+error)
        }
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
    
  }
  componentDid() {
    Alert("Hello");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          initialRegion:{          
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta:  0.05,
          longitudeDelta: 0.05,
          error: null,
        }
        });
        // console.log(this.state.latitude);
        // console.log(this.state.longitude);
      },
      (error) =>
      this.setState({
        initialRegion:{          
          latitude: 33.6593,
           longitude: 73.0238,
        latitudeDelta:  0.095,
        longitudeDelta: 0.095,
      },
        error: error.message,
       
       
      spinner:false
      }),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
    );
  }

  onChangeValue = (initialRegion) => {
    console.log(this._isMounted);
    console.log(this.state.initialRegion.latitude);
    if(this._isMounted==true && this.state.initialRegion.latitude==5){
      console.log("yhere")
      this.componentDid();
    }
    else{
      console.log("here is the first here");
      console.log("here is the second here");
     

      // this.props.navigation.navigate('map');
      this.setState({
 initialRegion:initialRegion,
        spinner:false
      });
     
    }
   // this.calculateDistance();
   // alert(JSON.stringify(initialRegion));
  }
  
 pressHandler = () => {
    console.log("Aannjnmkmjka");
    this.mangwao(this.state.initialRegion);
  
  }
  selecthandler=(lat,long,place)=>{
    console.log('inside select handler')
console.log(lat,long,place)
    // this.setState(place) ;
    this.setState({
      place:place,
      initialRegion:{          
      latitude: lat,
      longitude: long,
      latitudeDelta:  0.05,
      longitudeDelta: 0.05,
      error: null,
    }
    });
  }
render() {
  
    // console.log(this.state);
    return (
      <View style={{flex:1,width: '100%', height: '100%'}}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        
        <PlacesInput
        placeHolder={'Search'}
        searchRadius={50000}
        stylesContainer={{
            position: 'relative',
            alignSelf: 'stretch',
            margin: 0,
            top: '3%',
            left: 0,
            right: 0,
            bottom: 0,
            shadowOpacity: 0,
            borderColor: '#dedede',
            borderWidth: 1,
            marginBottom: 10
        }}
        stylesList={{
            top: 50,
            borderColor: '#dedede',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            left: -1,
            right: -1
        }}
        googleApiKey=""
        onSelect={  
          // console.log(place)
          place => { this.selecthandler(place.result.geometry.location.lat,place.result.geometry.location.lng,place)}
            // var myplace =JSON.stringify(place); console.log(place.result.geometry.location.lat+'ye to mene socha he ni');
          // this.props.goToPoint(get(place, 'result.geometry.location.lat'), get(place, 'result.geometry.location.lng' .result.geometry.location.lat))
          
        
        } 
     />
      <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsUserLocation={true}
          zoomEnabled={true}
          // scrollEnabled={true}
          // showsScale={true}
          region={this.state.initialRegion
          //   {

          //   latitude: this.state.initialRegion.latitude,
          //   longitude: this.state.initialRegion.longitude,
          //   latitudeDelta:  0.005,
          //   longitudeDelta: 0.005,
          // }
          }
          onRegionChangeComplete={this.onChangeValue}
          >
           
           <Marker
            onSelect={(e) => log('onSelect', e)}
            onDrag={(e) => log('onDrag', e)}
            onDragStart={(e) => log('onDragStart', e)}
            onDragEnd={(e) => log('onDragEnd', e)}
            onPress={(e) => log('onPress', e)}
            draggable 
            opacity={0}
            coordinate={this.state.initialRegion}
            
            ></Marker> 
         
          </MapView>
          
         <View
          style={{
            top: '50%',
            left: '50%',
            marginLeft: -22,
            marginTop: -53,
            position: 'absolute',
          }}>
          <Image
            style={{height: 40, width: 40}}
            source={{ uri: 'map' }}
          />
        </View>
         <SafeAreaView
          // onPress={this.pressHandler}
          style={[styles.SubmitButtonStyle]}
          >
       <TouchableOpacity
            onPress={this.pressHandler}
            activeOpacity={0.5}>

<Text style={styles.TextStyle}> Mangwao </Text>
          </TouchableOpacity>
         
        </SafeAreaView>  
     
    
       </View>
    );
  }
}