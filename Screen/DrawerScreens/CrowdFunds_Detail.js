import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList,  Image, Text, View, Alert } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Screens
import CrowdFunds from './CrowdFunds';

import Loader from '../Components/Loader';

const handleSubmitPress = () => {
 //here goes to donate screen which is not yet developed 
};

const Crowdfund_DetailsScreen= ({route, navigation}) => {
  
  const { itemId } = route.params;
  const [loading, setLoading] = useState(true);
  //const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  //alert(JSON.stringify(itemId));
  useEffect(() => {
    // for showing loading screen
    setLoading(true);
    // Service to get the data from the server to render
    fetch('http://192.168.0.103:8080/crowdfunds/findById/'+JSON.stringify(itemId))
      // Sending the currect page with get request
      .then((response) => response.json())
      // Successful response from the API Call setting to data object
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      // for hiding loading screen
      .finally(() => setLoading(false));
  }, []);

  return (
    
    <View style={{ flex: 1, marginTop: 0,}}>
      <Loader loading={loading} />

      <ScrollView style={{ marginTop: 10, borderColor: '#000', borderWidth: 0}}>
        <View style={{padding: 14, paddingTop: 0, borderColor: '#000', borderWidth: 0}}>
      
          <View style={{ alignSelf: "center", width: '98%', margin: 10, borderColor: '#D3D3D3', borderWidth: 0}}>
            <View>
              <Image source={{ uri: data.pic }} style={{width: '100%', height: 180, borderRadius: 7,}} />
            </View>

            <View style={styles.backArrow} >
              {/* navigating to CrowdFunds screen */}
              <TouchableOpacity onPress={() => navigation.navigate('CrowdFunds') }> 
                  <Icon name='arrow-back' size={25} color='white'/>
              </TouchableOpacity>
            </View>
            <View style={styles.dotsIcon}>
              <TouchableOpacity onPress={() => navigation.navigate('CrowdFunds') }>
                <MaterialCommunityIcons name='dots-vertical' size={25} color='white'/>
              </TouchableOpacity>
            </View>
            <View style={styles.camIcon}>
              <TouchableOpacity onPress={() => navigation.navigate('CrowdFunds') }>
                {/* for timebeing img count is hardcoded */}
                <Text style={{color:'#fff', fontSize: 18}}>1 <Icon name='camera' size={20} color='white'/></Text>
              </TouchableOpacity>
            </View>

            <View style={{marginLeft: 5, marginRight: 5}}>
              <Text style={{fontSize: 26, fontWeight: 'bold'}}>{data.title}</Text>
            </View>
            <View style={{marginVertical: 10, marginHorizontal: 5}}>
              <Text style={{fontStyle: 'italic'}}>Last Donation: {data.lastDonationDate}</Text>
            </View>
            <View style={{marginVertical: 10, marginHorizontal: 5}}>
              <Text>${data.fundCollected} raised of ${data.minFinalAmt} goal</Text>
              
              {/* here for timebeing progress value hardcoded it supposed to get from spring boot*/}
              <ProgressBar progress={0.0} color={Colors.lightGreen500}/>
            </View>

            <View style={{marginVertical: 10, marginHorizontal: 5}}>
              <Text>{data.description}</Text>
            </View>
  
          </View>
                          
        </View>        
      </ScrollView>

      <View>
        <TouchableOpacity
          style={styles.donateBtn}
          activeOpacity={0.5}
          onPress={handleSubmitPress}>
          <Text style={styles.donateText}>DONATE NOW!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  backArrow: {position: 'absolute', top: 0, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', },
  dotsIcon: {position: 'absolute', top: 0, right:0, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', },
  camIcon: {position: 'absolute', top: 140, right:5, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', },
  donateBtn: {  backgroundColor: '#00CC00', borderRadius: 5, margin: 5, marginHorizontal: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',},
  donateText: { color: '#fff', fontWeight: 'bold', fontSize: 22, padding: 5,},
})

export default Crowdfund_DetailsScreen;
