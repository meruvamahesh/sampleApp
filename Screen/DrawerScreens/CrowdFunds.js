import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList,  Image, Text, View, Alert, HeaderBackButton } from 'react-native';
// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { ProgressBar, Colors } from 'react-native-paper';

// Import Screens
import CrowdFunds_Detail from './CrowdFunds_Detail';

import Loader from '../Components/Loader';

const Stack = createStackNavigator();

const CrowdfundsScreen= ({navigation}) => {
  
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);
  //const [loading, setLoading] = useState(false);
  //const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => getData(), []);

  const getData = () => {
    console.log(page);
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      // Service to get the data from the server to render
      fetch('http://192.168.0.103:8080/crowdfunds/findAllCrowdfunds?page='+ page + '&size=2&sort=id')
        // Sending the currect page with get request
        .then((response) => response.json())
        .then((responseJson) => {
          // Successful response from the API Call
          console.log(responseJson);
          if (responseJson.crowdfunds.length > 0) {
            //alert("loading another page");
            setPage(page + 1);
            // After the response increasing the page
            setDataSource([...dataSource, ...responseJson.crowdfunds]);
            setLoading(false);
          } else {
            //alert("End of list.");
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{ flex: 1, marginTop: 0,}}>

        <Loader loading={loading} />
        <ScrollView style={{ marginTop: 10, borderColor: '#000', borderWidth: 0}}>
            <View style={{padding: 14, paddingTop: 0, borderColor: '#000', borderWidth: 0}}>
                
                <View style={{ borderColor: '#000', borderWidth: 0}}>
                    <Text style={styles.h1}>CrowdFunds</Text>
                </View>

                <FlatList
                  data={dataSource}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      onPress={() =>
                        navigation.navigate('CrowdFunds_Detail', {itemId: item.id,}) // navigating to CrowdFunds_Detail screen with parameter id
                      }
                      style={{width: '48%', marginTop: 10, marginRight: 10, borderRadius: 7, borderColor: '#D3D3D3', borderWidth: 1}}>
                      <View>
                        <View>
                          <Image
                            source={{
                              uri: item.pic
                            }}
                            style={{width: '100%', height: 120, borderRadius: 7,}}
                          />
                        </View>
                        <View style={{height: 90, marginLeft: 5, marginRight: 5}}>
                          {/* will show text only in single line and extra text will be showing as ...*/}
                          <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 14, fontWeight: 'bold'}}>{item.title}</Text>
                          {/* will show text only in 2 line2 and extra text will be showing as ...*/}
                          <Text numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
                          <Text style={{fontStyle: 'italic'}}>Last Donation: {item.lastDonationDate}</Text>
                        </View>
                        <View style={{height: 22, marginLeft: 5, marginRight: 5}}>
                          <Text>${item.fundCollected} of ${item.minFinalAmt}</Text>
                          {/* here for timebeing progress value hardcoded it supposed to get from spring boot*/}
                          <ProgressBar progress={0.0} color={Colors.lightGreen500}/>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  onEndReached={getData}
                  onEndReachedThreshold={0.5}
                />
            </View>
          
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const App= ({navigation}) => {

  return (
    // Stack Navigator for CrowdFunds and CrowdFunds_Detail Screens
    <Stack.Navigator>
      <Stack.Screen name="CrowdFunds" component={CrowdfundsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="CrowdFunds_Detail" component={CrowdFunds_Detail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  h1: {fontWeight: 'bold', fontSize: 26, textAlign:'left',},
})

export default App;
