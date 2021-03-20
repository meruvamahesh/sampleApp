import React, {useState, createRef} from 'react';
import { StyleSheet, View, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native';

import Loader from './Components/Loader';

const IndexScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false); 

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            
            <View style={{alignItems: 'center'}}>
                <Text style={styles.logoword}>Joogi</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.social}>
                    <Text style={styles.socialButton}>
                        <Text style={styles.socialIcon}><Image source = {require('../assets/images/google.png')} /></Text>
                        <Text style={styles.socialText}>&nbsp;&nbsp;Continue with Google</Text>
                    </Text>
                    <Text style={styles.socialButton} >
                        <Text style={styles.socialIcon}><Image source = {require('../assets/images/facebook2.png')} /></Text>
                        <Text style={styles.socialText}>&nbsp;&nbsp;Continue with Facebook</Text>
                    </Text>
                    <Text style={styles.socialButton} 
                        onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.socialIcon}><Image source = {require('../assets/images/gmail2.png')} /></Text>
                        <Text style={styles.socialText}>&nbsp;&nbsp;Continue with Email</Text>
                    </Text>
                </View>

                <View style={styles.singup}>
                    <Text style={styles.account}>
                        No account?
                        <Text style={styles.green} onPress={() => navigation.navigate('RegisterScreen')}>
                            &nbsp;Create one
                        </Text>
                    </Text>
                </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default IndexScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  content: {
    marginLeft: 55,
    marginRight: 55,
  },
  logo: {
    marginTop: 0,
  },
  logoword: {
    color: '#000',
    textAlign: 'center',
    fontSize: 60,
  },
  socialButton: {
    padding: 15,
    marginTop: 15,
    borderColor: '#C6C4C5',
    borderRadius: 15,
    borderWidth: 1,
    fontSize:16,
    textAlign: 'left', 
    fontWeight: 'bold',
  },
  singup: {
      marginTop: 60,
  },
  account: {
    color: '#3C322D',
    fontSize: 16,
    textAlign: 'center',
  },
  green: {
    fontWeight: 'bold',
    color: '#16780E',
  },
  socialIcon: {
    marginRight: 120,
  },
  socialText: {
      paddingLeft: 30,
  },
});
