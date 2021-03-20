import React, {useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import Loader from './Components/Loader';

const RegisterScreen = (props) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPassword2, setUserPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const firstnameInputRef = createRef();
  const lastnameInputRef = createRef();
  const locationInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const password2InputRef = createRef();


  //pickSingleWithCamera(cropping, mediaType = 'photo') {
  const pickSingleWithCamera = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => alert(e));
  };
  
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userFirstName) {
      alert('Please fill First Name.');
      return;
    }
    if (!userLastName) {
      alert('Please fill Last Name.');
      return;
    }
    if (!userLocation) {
      alert('Please fill Location.');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email.');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password.');
      return;
    } else if (userPassword.length < 8 || userPassword.length > 16) {
      alert('Password should be minimum 8 characters and maximum 16 characters.');
      return;
    } 
    var pwd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    var pwdCharacter = ".!@#$%&*-_";
    if (pwd.test(userPassword) == false) {
        alert("Password should contain atleast one number, one uppercase and one lowercase letter.");   
        return false;
    }
    /*if(pwdCharacter.test(userPassword) == false){
        alert("Password should contain atleast one special character.")
        return false;     
    }*/

    if (!userPassword2) {
      alert('Please fill Confirm Password.');
      return;
    }
    if (userPassword == userPassword2) {} else {
      alert('Confirm Password does not match.');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      firstName: userFirstName,
      lastName: userLastName,
      location: userLocation,
      userEmail: userEmail,
      userPassword: userPassword,
    };
    
    fetch('http://192.168.0.103:8080/user/addUser', {
      method: 'POST',
      // Adding body or contents to send 
      body: JSON.stringify({ 
        firstName: userFirstName,
        lastName: userLastName,
        location: userLocation,
        userEmail: userEmail,
        userPassword: userPassword,
        userType: "General"
      }), 
        
      // Adding headers to the request 
      headers: { 
          "Content-type": "application/json; charset=UTF-8"
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        //alert(responseJson);
        // If server response message same as Data Matched
        if (responseJson == "OK") {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext('Registration Unsuccessful');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.logo}>
              <Text style={styles.logoword}>Joogi</Text>
          </View>
        </View>
        <KeyboardAvoidingView enabled>
        <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserFirstName) => setUserFirstName(UserFirstName)}
              underlineColorAndroid="#f000"
              placeholder="First Name"
              placeholderTextColor="#8b9cb5"
              ref={firstnameInputRef}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                firstnameInputRef.current && firstnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserLastName) => setUserLastName(UserLastName)}
              underlineColorAndroid="#f000"
              placeholder="Last Name"
              placeholderTextColor="#8b9cb5"
              ref={lastnameInputRef}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                lastnameInputRef.current && lastnameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserLocation) => setUserLocation(UserLocation)}
              underlineColorAndroid="#f000"
              placeholder="Location"
              placeholderTextColor="#8b9cb5"
              ref={locationInputRef}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                onSubmitEditing={() =>
                  password2InputRef.current && password2InputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword2) => setUserPassword2(UserPassword2)}
                placeholder="Confirm Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={password2InputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>
         
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}

          <View style={styles.note}> 
            <Text style={styles.notebook}>Note:Your password must contain at least one lower case letter, one upper case letter, one number, one special character and be 8-16 charcters in length. (We know, but blame the spammers!)</Text>
          </View>
          
          <View style={styles.singup}>
            <Text style={styles.account}>I agree to <Text style={styles.bluetext}>Terms</Text></Text>
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
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
  
  buttonStyle: {
    backgroundColor: '#258BEF',
    borderWidth: 0,
    color: '#FFFFFF',
    padding: 10,
    borderColor: '#258BEF',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontWeight:'bold',
    padding: 10,
    fontSize: 18,
  },
  note: {
    width: 300,
    margin:10,
    marginLeft: 30,
    marginRight: 30,  
  },
  notebook: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  singup: {
    marginTop: 10,
  },
  account: {
    color: '#3C322D',
    fontSize: 16,
    textAlign: 'center',
  },
  bluetext: {
    fontWeight: 'bold',
    color: '#218DF2',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
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
});
