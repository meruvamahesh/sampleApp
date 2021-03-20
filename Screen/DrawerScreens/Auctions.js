import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList,  Image, Text, View, Alert, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Screens
import Auctions_Detail from './Auctions_Detail';

import Loader from '../Components/Loader';

const Stack = createStackNavigator();

const AuctionsScreen= ({navigation}) => {

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => getData(), []);

  const getData = () => {
    console.log(page);
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      // Service to get the data from the server to render
      fetch('http://192.168.0.103:8080/auctions/findAllAuctions?page='+ page + '&size=2&sort=id')
        // Sending the currect page with get request
        .then((response) => response.json())
        //.then((json) => setData(json))
        .then((responseJson) => {
          // Successful response from the API Call
          console.log(responseJson);
          if (responseJson.auctions.length > 0) {
            //alert("loading another page");
            setPage(page + 1);
            // After the response increasing the page
            setDataSource([...dataSource, ...responseJson.auctions]);
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
      {/*<Loader loading={loading} />*/}
      
      <ScrollView style={{ marginTop: 10, borderColor: '#000', borderWidth: 0}}>
          <View style={{padding: 14, paddingTop: 0, borderColor: '#000', borderWidth: 0, backgroundColor: '#ECECEC'}}>
              
              <View style={{ borderColor: '#000', borderWidth: 0}}>
                  <Text style={styles.h1}>Auctions</Text>
              </View>

              <FlatList
                data={dataSource}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    onPress={() =>
                      navigation.navigate('Auctions_Detail', {itemId: item.id,}) // navigating to Auction_Detail screen with parameter id
                    }
                    style={{padding: 5, width: '49%', marginTop: 5, marginRight: 5, borderRadius: 5, borderColor: '#D3D3D3', borderWidth: 1, backgroundColor: '#FFF'}}>
                    <View>
                      <View>
                        <Image
                          source={{
                            uri: item.img1
                          }}
                          style={{width: '100%', height: 120, borderRadius: 2,}}
                        />
                      </View>
                      
                    <View style={styles.favouriteIcon} >
                        <TouchableOpacity onPress={() => Alert.alert('Favorite Button pressed') }>
                            <MaterialCommunityIcons name='heart-outline' size={25} color='gray'/>
                        </TouchableOpacity>
                      </View>
                    
                      <View style={{height: 40, marginLeft: 5, marginRight: 5}}>
                        {/* will show text only in single line and extra text will be showing as ...*/}
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 14, fontWeight: 'bold'}}>{item.title}</Text>
                        <Text style={{fontStyle: 'italic'}}>{item.minBids} bids - 6d 25m</Text>
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
    // Stack Navigator for Auctions and Auctions_Detail Screens
    <Stack.Navigator>
      <Stack.Screen name="Auctions" component={AuctionsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Auctions_Detail" component={Auctions_Detail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  h1: {fontWeight: 'bold', fontSize: 26, textAlign:'left',},
  favouriteIcon: {position: 'absolute', top: 85, right:0, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', },
})

export default App;
