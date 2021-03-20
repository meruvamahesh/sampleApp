import React, {useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Switch, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/Loader';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
	fetch('http://192.168.0.103:8080/user/login', {
    method: 'POST',
    // Adding body or contents to send 
    body: JSON.stringify({ userEmail: userEmail, userPassword: userPassword}), 
      
    // Adding headers to the request 
    headers: { 
      "Accept": "application/json",
      "Content-type": "application/json; charset=UTF-8"
    },
  })
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(responseJson.status);
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        console.log(responseJson.userEmail);
        //alert(responseJson.userEmail);
        // If server response message same as Data Matched
        if(responseJson == "NOT_FOUND") {
            setErrortext('Please check your email id or password');
            console.log('Please check your email id or password');
        } else if (responseJson.userEmail) {
            AsyncStorage.setItem('user_Email', responseJson.userEmail);
            AsyncStorage.setItem('user_Id', ""+responseJson.id);
            AsyncStorage.setItem('user_FirstName', responseJson.firstName);
            AsyncStorage.setItem('user_LastName', responseJson.lastName);
            AsyncStorage.setItem('user_Location', responseJson.location);
            console.log(responseJson.userEmail);
            //alert(responseJson.userEmail);
            navigation.navigate('HomeScreen');
        } else {
            setErrortext('Please check your email id or password');
            console.log('Please check your email id or password');
        }
        
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

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
            <View style={styles.logo}>
                <Text style={styles.logoword}>Joogi</Text>
            </View>
            
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1,}}>
                    <Switch style={styles.rememberMeSwitch}
                      trackColor={{ false: "#767577", true: "#307ecc" }}
                      thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                </View>
                <View style={{flex:1,}}>
                    <Text style={styles.remembermeText}>Remember Me</Text>
                </View>
            </View> 

            <TouchableOpacity
              style={styles.loginBtn}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.forgotText}>
                <Text style={styles.passwordText}>Forgot your password?</Text>
            </View> 
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CDCBCC', 
    width: 300,
    height: 40,
    padding:8,
    margin:10,
  },
  rememberMeSwitch: {
    justifyContent: 'flex-end',
    textAlign: 'center',
    marginRight: 350,
    marginLeft: 150,
  },
  remembermeText: {
    marginTop: 4,
    marginLeft: -165,
    borderColor: '#000000',
    justifyContent: 'flex-start',
    textAlign: 'center',
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold', 
  },
  passwordText: {
    color: '#2489F6',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 15,
    marginTop: 15,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  logo: {
    marginTop: 0,
    textAlign: 'center',
  },
  logoword: {
    color: '#000',
    textAlign: 'center',
    fontSize: 60,
  },
  loginBtn: {
    marginTop: 20,
    marginLeft: 80,
    marginRight: 80,
    textAlign: 'center',
  },
  loginText: {
      backgroundColor: '#248BF0',
      color: '#fff', 
      fontWeight: 'bold',
      fontSize: 18,
      padding: 15,
      borderRadius: 5,
      textAlign: 'center',
      width: 200, 
  },
});
