import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Image, BackHandler, DeviceEventEmitter, Linking } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Colors from "../themes/Colors";
import Loader from "../utils/loader";
import FontSize from "../utils/FontSize";
import AppImages from "../themes/AppImages";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Utils from '../utils/Utils'

const Bookings = () => {


    const [name, setName] = useState("");
    const [standard, setStandard] = useState("");
    const [phone, setPhone] = useState("")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        checkGPS()
        getuser()

    }, [])

    const onBookPress = () => {
        Utils.Alert("Success", " Your Ride Has Been Booked, The Contractor Will Call You Soon ")
    }
    const checkGPS = () => {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings<br/><br/> Please Open Your Google Location <br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
            preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
            providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
        }).then(function (success) {
            console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
        }).catch((error) => {
            console.log(error.message); // error.message => "disabled"
        });

        BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
            //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
            LocationServicesDialogBox.forceCloseDialog();
        });

        DeviceEventEmitter.addListener('locationProviderStatusChange', function (status) { // only trigger when "providerListener" is enabled
            console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        });

        LocationServicesDialogBox.stopListener();
    }

    const goToSpecificLoation = (data) => {
        console.log(" data to : " + JSON.stringify(data));
        
        if (data.to == "Swat") {
            console.log("Swat");
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + '34.8065' + ',' + '72.3548');
        }
        else if (data.to == "Neelum Valley") {
            console.log("Neelum valley");
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + '34.5985' + ',' + '73.9073');
        }
        else if (data.to == "Zairat") {
            console.log("Zairat");
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + '30.3939' + ',' + '67.7169');
        }
        else if (data.to == "Naran") {
            console.log("Naran");
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + '34.9093' + ',' + '73.6507');
        }

        return
        if (data.to = "") {
            alert("Empty")
        }
        
        else if (data.to = "Naran") {
            console.log("Narannnnn");
            return
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + '34.9093' + ',' + '73.6507');
        }
        else if (data.to = "Neelum Valley") {
            console.log("Neelum Valley");
            return
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + '34.5985' + ',' + '73.9073');
        }
        else if (data.to = "Zairat") {
            console.log("Zairat");
            return
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + '30.3939' + ',' + '67.7169');
        }
        else if (data.to = "Swat") {
            console.log("Swat");
            return
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + '34.8065' + ',' + '72.3548');
        }

    }

    const getuser = async () => {
        console.log("getUser");
        await firestore()
            .collection('datas')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let data = []
                querySnapshot.forEach(documentSnapshot => {
                    data.push(documentSnapshot.data())
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                });
                console.log("data array : " + data);
                setUsers(data)
            });

      addUser()

    }

    const addUser = () => {

        console.log("data ::" + JSON.stringify(users));
        setLoading(false)
    }

    return (
        <ScrollView style={{
            flex: 1
        }}>
            <Loader loading={loading}></Loader>
            <StatusBar backgroundColor={Colors.COLOR_THEME}></StatusBar>

            <View style={{ height: 150, backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 60, borderBottomRightRadius: 60, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: FontSize.FONT_SIZE_24, color: 'white', fontWeight: "bold" }}>BOOKINGS</Text>
            </View>

            {/* 
                <TouchableOpacity onPress={() => addUser()}>
                    <Text>Submit</Text>
                </TouchableOpacity> */}

            {
                users.map((data, index) => <View key={index}>
                    <View style={{ width: "90%", backgroundColor: 'white', alignSelf: "center", marginTop: 20, marginBottom: 10, borderRadius: 30, height: 250 }}>

                        <View style={{ backgroundColor: Colors.THEME_COLOR, justifyContent: "center", alignItems: "center", height: 30, width: 150, position: "absolute", right: 0, top: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 30 }}>
                            <Text style={{ color: 'white' }}>{data.price}</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>From</Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} >{data.from}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>To    </Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} >{data.to}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-evenly" }}>
                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>Desc</Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10, width: 250 }} >{data.desc}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-evenly" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>Days</Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} >{data.days}</Text>

                                <TouchableOpacity onPress={() => goToSpecificLoation(data)} style={{ height: 30, position: "absolute", right: 0, top: 10, width: 150, backgroundColor: Colors.THEME_COLOR, justifyContent: "center", alignItems: "center", borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }}>
                                    <Text style={{ color: 'white' }}>See Route Planning</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => onBookPress()} style={{ height: 50, justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, position: "absolute", bottom: 0 }}>
                            <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 10, fontWeight: "bold" }}>Book Your Ride</Text>
                        </TouchableOpacity>

                    </View>

                </View>)
            }
        </ScrollView>
    )
}

export default Bookings