import React from 'react';
import { TouchableOpacity, StyleSheet, Text,  View, Button, Image, ScrollView   } from 'react-native';

export default function Acuctions() {
    return(
        <View style={styles.container}>
            <View style={styles.settingPage}>
                <View style={styles.settingHead}>
                 <Text style={styles.settingText}>Settings</Text>
                </View>

                <View style={styles.settingMenu}>
                    <Text style={styles.MenuText}>Account</Text>
                    <Text style={styles.MenuText}>Payment Methods</Text>
                    <Text style={styles.MenuText}>Notifications</Text>
                    <Text style={styles.MenuText}>Privacy</Text>
                    <Text style={styles.MenuText}>User Agreement</Text>
                    <TouchableOpacity 
                        onPress={() =>
                        navigation.navigate('App.js', {itemId: item.id,})
                        }>
                        <Text style={styles.MenuText}>Sign Out</Text>
                    </TouchableOpacity>
                  
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    mainIcon: {flexDirection: 'row', },
    mainIcons: {flexDirection: 'row',  width: 80, height: 90, paddingLeft: 10, marginLeft: 8, paddingRight:10, marginTop:30,},
    menu: {flexDirection: 'row', },
    menuText: {flexDirection: 'row', flex: 1, textAlign: 'center', },

    settingPage: {margin: 15, marginBottom: 240,},
    settingHead: {marginTop:10, marginBottom: 50,},
    settingText: {fontSize: 24, fontWeight: 'bold',},
    MenuText: {fontSize: 18, lineHeight: 42,},


    backbtn: {fontSize: 14, textAlign: 'right', marginRight: 0, backgroundColor: '#eee', padding:15,},
})
