import React from 'react';
import {  StyleSheet, Text,  View, Button, Image, ScrollView   } from 'react-native';

export default function Acuctions() {
    return(
        <View style={styles.container}>

       

            <View style={styles.settingPage}>
                <View style={styles.settingHead}>
                 <Text style={styles.backbtn}>&nbsp;Settings</Text>
                 <Text style={styles.settingText}>Account</Text>
                </View>

                <ScrollView>
                <View style={styles.pageBox}>
                    <Text style={styles.settingPage}>
                    This will have the basic user info like our Profile section in ShareChatter. They can also change their password here.
                    </Text>
                </View>
                </ScrollView>
            </View>            
        </View>
    )
}



const styles = StyleSheet.create({
    mainIcon: {flexDirection: 'row', marginTop:120,},
    mainIcons: {flexDirection: 'row',  width: 80, height: 90, paddingLeft: 10, marginLeft: 8, paddingRight:10, marginTop:30,},
    menu: {flexDirection: 'row', },
    menuText: {flexDirection: 'row', flex: 1, textAlign: 'center', },

    settingPage: {margin: 15, marginBottom: 240,},
    settingHead: {marginTop:10, marginBottom: 50,},
    settingText: {fontSize: 24, fontWeight: 'bold',},
    MenuText: {fontSize: 18, lineHeight: 42,},

    backbtn: {fontSize: 14, textAlign: 'right', marginRight: 0, backgroundColor: '#eee', padding:15,},

    pageBox: {backgroundColor: '#fff', borderColor:'#ECECEC', borderWidth: 2, margin:5, padding: 5, height: 1000,},
})
