import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Screens
import MyStuff from './Account';
import CrowdFunds from './CrowdFunds';
import Auctions from './Auctions';
import Settings from './Settings';

const Tab = createMaterialTopTabNavigator();

const App= ({navigation}) => {

  return (
      // Tab Navigator for My Stuff, Auctions, CrowdFunds and Settings Screens
      <Tab.Navigator
        tabBarOptions={{ 
          showIcon: true, 
          labelStyle: {
            textTransform: "none", //for not making label capitalize
            fontSize: 12,
            margin: 0,
            padding: 0,
          },
        }}
        style={{ marginTop: 26, borderColor: '#000', borderWidth: 0}}
      >
        
        <Tab.Screen name="Auctions" component={Auctions} 
          options={{
            tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="gavel" color='gray' size={27} /> ),
          }}
        />
        <Tab.Screen name="My Stuff" component={MyStuff} 
          options={{
            tabBarLabel: 'My Stuff',
            tabBarIcon:() => ( <Icon name='person-outline' size={25} color='gray'/> ),
          }}
        />
        <Tab.Screen name="CrowdFunds" component={CrowdFunds} 
          options={{
            tabBarLabel: 'CrowdFunds',
            tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="currency-usd-circle" color='gray' size={26} /> ),
          }}
        /> 
        <Tab.Screen name="Settings" component={Settings} 
          options={{
            tabBarIcon:() => ( <Icon name='ios-settings' size={25} color='gray'/> ),
          }}
        />
      </Tab.Navigator>
  );
}

export default App;
