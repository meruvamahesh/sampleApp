import React from 'react';
import {  StyleSheet, Text,  View, Button, Image, ScrollView   } from 'react-native';

export default function Acuctions() {
    return(
        <View style={styles.container}>


            <ScrollView>
            <View style={styles.detailBox}>
                <View style={styles.banner}>
                    <Text style={styles.bannerBox}>
                    </Text>
                </View>

                <View style={styles.textHeadBox}>
                    <Text style={styles.textHeadBoxtext}>2000 Chevrolet Silverado 1500 Silverado</Text>
                    <Text></Text>
                    <Text></Text>
                </View>

                <View style={styles.vintext}>
                    <Text>14,562 miles . Clean title . Verified VIN</Text>
                    <Text style={styles.happytext}><Text></Text>Happy Valley, Oregon</Text>
                    <Text style={styles.reserveText}>152 bids . 4d 10h . Reserve not met</Text>
                </View>

                <View style={styles.bidbtn}>
                   
                <Button title="Makea Bid Now!" onPress={() => Alert.alert('Simple Button pressed')} />
                       
                </View>
            </View>

            <View style={styles.aboutBox}>
                <Text style={styles.aboutHead}>About this Vehicle</Text>
                <Text style={styles.aboutText}>2000 Chevrolet Silverado 1500.
                        Silverado Trim Includes Fifth Wheel
                        Hitch - Max Tongue Wt. 1500, 750 Ibs </Text>
            </View>

            <View style={styles.detailBox}>
                <View style={styles.banner}>
                    <Text style={styles.bannerBox}>
                    </Text>
                </View>

                <View style={styles.textHeadBox}>
                    <Text style={styles.textHeadBoxtext}>2000 Chevrolet Silverado 1500 Silverado</Text>
                    <Text></Text>
                    <Text></Text>
                </View>

                <View style={styles.vintext}>
                    <Text>14,562 miles . Clean title . Verified VIN</Text>
                    <Text style={styles.happytext}><Text></Text>Happy Valley, Oregon</Text>
                    <Text style={styles.reserveText}>152 bids . 4d 10h . Reserve not met</Text>
                </View>

                <View style={styles.bidbtn}>
                   
                <Button title="Makea Bid Now!" onPress={() => Alert.alert('Simple Button pressed')} />    
                </View>
            </View>
            </ScrollView>           
        </View>
    )
}



const styles = StyleSheet.create({
    mainIcon: {flexDirection: 'row', },
    mainIcons: {flexDirection: 'row', width: 80, height: 90, paddingLeft: 10, marginLeft: 8, paddingRight:10, marginTop:30,},
    menu: {flexDirection: 'row',},
    menuText: {flexDirection: 'row', flex: 1, textAlign: 'center', },


    detailBox: {backgroundColor: '#fff', borderWidth: 1, borderColor: '#F4F4F4', margin: 15, flex:1,}  ,
    bannerBox: {width: 326, height:285, marginTop: -90,},

    textHeadBox: {flexDirection:'row', padding: 10,},
    textHeadBoxtext: {flexDirection:'row', fontSize: 24, fontWeight: 'bold', width: 250,},
    vintext: {marginLeft: 10, fontSize: 16,},
    happytext: {fontSize: 16, color: '#0258C9',},
    reserveText: {fontSize: 16, color: '#636363', marginBottom: 50, marginTop:30,},

    bidbtn: {textAlign:'center', fontWeight:'bold', backgroundColor: '#0258C9', fontSize: 24, color: '#fff', marginLeft: 15, marginRight:15,},

    aboutBox: {backgroundColor: '#fff', borderWidth: 1, borderColor: '#F4F4F4', padding:15, margin: 15, flex:1,}  ,
    aboutHead: {fontSize: 18, fontWeight: 'bold', color: '#000',},
    aboutText: {fontSize: 14, color: '#000',},
})
