import {createStackNavigator} from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation';

import mainpage from '../screens/mainpage';
import mobilenumber from '../screens/mobilenumber';
import verifcation from '../screens/verifcation';
import confirm from '../screens/profile';
import map from '../screens/map';
import login from '../screens/login';
import waterlevel from '../screens/waterlevel';
import confirmation from '../screens/confirmation';
import setlevel from '../screens/setlevel';
import details from '../screens/details';

const screens = {
  mainPage:{
    screen:mainpage,
    navigationOptions: {headerShown: false,},
  },
  map: {
    screen: map,
    navigationOptions: {headerShown: false,},
  },
  waterlevel:{
    screen:waterlevel,
    navigationOptions: {headerShown: false,},
  }, 
  login: {
    screen: login,
    navigationOptions: {
      headerShown: false,
      headerStyle: {
        backgroundColor: 'white',
      },

    },
  },
  details: {
    screen: details,
  },
 
  setlevel:{
    screen:setlevel,
    navigationOptions: {headerShown: false,},
  }, 
  


  


 
 
   Home: {
    screen: mobilenumber,
    navigationOptions: {headerShown: false,},
  },
  
  
  

  details: {
    screen: details,
  },
  verifcation: {
    screen: verifcation,
    navigationOptions: {headerShown: false,},
  },
 
  
  
  
  
 


 

 
 
  
 
  // map: {
  //   screen: map,
  //   navigationOptions: {headerShown: false,},
  // },
  
  
  confirmation: {
    screen: confirmation,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
