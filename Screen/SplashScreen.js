import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'HomeScreen'),
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
            <Text style={styles.logoword}>Joogi</Text>
        </View>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  logoword: {
    color: '#000',
    textAlign: 'center',
    flex: 1,
    fontSize: 60,
    marginTop: 120,
  },
});
