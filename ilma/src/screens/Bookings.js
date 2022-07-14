import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Image, BackHandler, DeviceEventEmitter, Linking } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Colors from "../themes/Colors";
import Loader from "../utils/loader";
import FontSize from "../utils/FontSize";
import AppImages from "../themes/AppImages";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Utils from '../utils/Utils'
import Modal from 'react-native-modal'
import Modal2 from 'react-native-modal'
import Icon from "react-native-vector-icons/FontAwesome5";
import { FloatingAction } from "react-native-floating-action";
import call from "react-native-phone-call";


const Bookings = ({ navigation }) => {

    const [searchText, setSearchText] = useState('');
    const [name, setName] = useState("");
    const [standard, setStandard] = useState("");
    const [phone, setPhone] = useState("")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState("")
    const [visible2, setVisible2] = useState(false)
    const [image, setImage] = useState()
    const [filteredData, setFilteredData] = useState([])

    const actions = [
        {
            text: "Phone Call Contractor",
            icon: AppImages.phone2,
            name: "phone",
            position: 2
        },
        {
            text: "Whatsapp Contractor",
            icon: AppImages.whatsapp,
            name: "whatsapp",
            position: 1
        },
    ]


    useEffect(() => {
        setLoading(true)
        checkGPS()
        getuser()

    }, [])


    const searchTexts = (e) => {

        setSearchText(e)
        let text = e.toLowerCase()
        console.log("data in search == >" + JSON.stringify(users))
        let user = users
        let filteredName = user.filter((item) => {
            console.log("Item is === >" + JSON.stringify(item));
            return (
                item.from.toLowerCase().match(text) ||
                item.to.toLowerCase().match(text) ||
                item.days.toLowerCase().match(text)
            )
        })
        if (!text || text === '') {
            setData(users)
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
            // set no data flag to true so as to render flatlist conditionally


        } else if (Array.isArray(filteredName)) {

            setData(filteredName)
        }
    }

    const onBookPress = (data) => {
        // console.log(data);
        setData(data)
        setVisible(true)
        // Utils.Alert("Success", " Your Ride Has Been Booked, The Contractor Will Call You Soon ")
    }
    const onBookRideClick = () => {
        setVisible(false)
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
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + data.lat + ',' + data.lng);
        }
        else if (data.to == "Neelum Valley") {
            console.log("Neelum valley");
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + data.lat + ',' + data.lng);
        }
        else if (data.to == "Zairat") {
            console.log("Zairat");
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + data.lat + ',' + data.lng);
        }
        else if (data.to == "Naran") {
            console.log("Naran");
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + data.lat + ',' + data.lng);
        }

    }



    const goToDestination = (name) => {

        console.log("name === >" + name);
        if (name == "location") {
            return
            let lat = data.item.lat;
            let lng = data.item.lng;
            console.log("latitude ===> " + lat + "====== longitutde ===>" + lng);
            //geo:0,0?q=" + latitude + "," + longitude + "(" + label + ")
            // openMap({ latitude: { lat }, longitude: { lng }, zoom: 50 }, navigation = true,);
            //'geo:24.8497667,67.0541147'
            Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng);
        }
        else if (name == 'phone') {
            onPhoneCall()
        }
        else {
            Linking.openURL("whatsapp://send?text=hello&phone=03492055477");
        }

    }

    const onPhoneCall = () => {
        const args = {
            number: "03492055477", // String value with the number to call
            prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
            skipCanOpen: true // Skip the canOpenURL check
        }

        call(args).catch(console.error)
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
                    // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                });
                // console.log("data array : " + data);
                setUsers(data)
            });
            setLoading(false)

        // addUser()

    }

    const addUser = () => {

        // console.log("data ::" + JSON.stringify(users));
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
                <TouchableOpacity
                    onPress={() => navigation.navigate("Upcomings")}
                    style={{ height: 50, width: 50, position: "absolute", top: 20, right: 10 }}>
                    <View style={{ height: 10, width: 10, borderRadius: 20, backgroundColor: 'orange', position: "absolute", right: 10 }}></View>
                    <Icon name="inbox" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* <View style={{
                width: "80%",
                height: 40,
                backgroundColor: Colors.THEME_WHITE,
                alignSelf: "center",
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20
            }}>
                <View style={{
                    marginLeft: 10
                }}>
                    <Icon name="search" size={20} />
                </View>
                <View>
                    <TextInput style={{
                        height: 40,
                        width: 200,
                        marginLeft: 10,
                        justifyContent: "center",
                        fontSize: 16
                    }}
                        onChangeText={(text) => searchTexts(text)}
                        value={searchText}
                        clearTextOnFocus
                        placeholder="Search Here"
                    />
                </View>
            </View> */}

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
                                <ScrollView fadingEdgeLength={100} style={{ height: 50 }}>
                                    <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, marginLeft: 10 }} >{data.desc}</Text>
                                </ScrollView>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-evenly" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>Days</Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} >{data.days}</Text>


                            </View>
                        </View>

                        <TouchableOpacity onPress={() => onBookPress(data)} style={{ height: 50, justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, position: "absolute", bottom: 0 }}>
                            <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 10, fontWeight: "bold" }}>RIDE DETAILS</Text>
                        </TouchableOpacity>

                    </View>

                </View>)
            }

            <Modal isVisible={visible}>
                <View style={{ height: "100%", backgroundColor: 'white', borderRadius: 50 }}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Icon name="xing" size={20} style={{ position: "absolute", right: 30, top: 20 }} />
                    </TouchableOpacity>

                    <View style={{ marginTop: 20 }}>
                        <View style={{ justifyContent: "space-evenly", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold" }}>   From                    </Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, marginLeft: 10, width: 250 }} >{data.from}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-evenly", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold" }}>   To                         </Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, marginLeft: 10, width: 250 }} >{data.to}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-evenly", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold" }}>   days                     </Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, marginLeft: 10, width: 250 }} >{data.days}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-evenly", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold" }}>   Description        </Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, marginLeft: 10, width: "50%" }} >{data.desc}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-evenly", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold" }}>   Price                   </Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, marginLeft: 10, width: 250 }} >{data.price}</Text>
                            </View>
                        </View>


                        <View style={{ justifyContent: "space-evenly", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold" }}>   Famous Places    </Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, width: 170 }} >{data.must}</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: "space-evenly", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold" }}>   Package                </Text>
                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, width: 170 }} >{data.details}</Text>
                            </View>
                        </View>



                        <View style={{ justifyContent: "space-evenly", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>

                                <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold" }}>   See Location       </Text>
                                <TouchableOpacity onPress={() => goToSpecificLoation(data)} style={{ height: 30, width: 170, backgroundColor: Colors.THEME_COLOR, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}>
                                    <Text style={{ color: 'white' }}>See Route Planning</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, marginLeft: 10, fontWeight: "bold", alignSelf: "center" }}>   Images       </Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                <TouchableOpacity
                                    // onPress={() => onModal2Press(1)}
                                    style={{ height: 200, width: "40%" }}
                                >
                                    <Image source={{ uri: data.img1 }} style={{ height: "100%", width: "100%" }} resizeMode='contain' />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    // onPress={() => onModal2Press(2)}
                                    style={{ height: 200, width: "40%" }}
                                >
                                    <Image source={{ uri: data.img2 }} style={{ height: "100%", width: "100%", marginLeft: 20 }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => onBookRideClick()} style={{ height: 40, justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, position: "absolute", bottom: 0 }}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 10, fontWeight: "bold" }}>BOOK YOUR RIDE</Text>
                    </TouchableOpacity>
                </View>
                <FloatingAction
                    actions={actions}
                    showBackground={false}
                    iconHeight={25}
                    iconWidth={25}
                    onPressItem={(name) => goToDestination(name)}
                />
            </Modal>

        </ScrollView >
    )
}

export default Bookings