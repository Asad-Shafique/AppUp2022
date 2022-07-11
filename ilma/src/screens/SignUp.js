import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Dimensions, TextInput, TouchableOpacity, Alert , StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Colors from '../themes/Colors'
import Constants from '../http/Constants'
import Http from '../http/Http'
import Session from '../utils/Session'
import utils from '../utils/Utils'
import Loader from '../utils/loader'


const SignUp = ({ navigation }) => {

    const [countryCode, setCountryCode] = useState('FR')
    const [country, setCountry] = useState(null)
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withModal, setWithModal] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const [withCountryNameButton, setWithCountryNameButton] = useState(false)
    const [cText, setCText] = useState('');
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [openAlert, setOpenAlert] = useState(false)
    const [msg, setMsg] = useState("")
    const [buttonTxt, setButtonTxt] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);


    const emailRef = useRef()
    const phoneRef = useRef()
    const passRef = useRef()
    const rePassRef = useRef()

    useEffect(() => {
        setCText('')
        Session.cleanSignUpObj
    }, [setCText]);


    const onSelect = (country) => {
        setCText(country.name)
        console.log(country.cca2);
        console.log(country.callingCode);
        console.log(country.name);
        setCountryCode(country.cca2)
        setCountry(country)

    }

    const onSignUpClick = async () => {

        setLoading(true)
        Session.signUp.firstName = userName
        Session.signUp.lastName = ""
        Session.signUp.mobile = phone
        if (password == rePassword) {
            Session.signUp.password = password
        }
        else {
            utils.Alert("Info " , "Enter Same PASS")
            return
        }
        console.log(JSON.stringify(Session.signUp));
        await Http.post(Constants.END_POINT_SIGNUP, Session.signUp).then((response) => {
            setLoading(false)
            console.log("post request ==================");
            console.log(response.data);
            if (response.data.success) {
                navigation.replace('Login')
                console.log("response.data.data.msg" + JSON.stringify(response.data.message));
                
            }
            else {
              utils.Alert("Info", "User creation failed")

            }


        }, (error) => {
            console.log(error);
            setMsg(error)
            setOpenAlert(true)
            // Utils.Alert("Info", "Oops! Something went wrong. Please try again .")
        })
    }

    const confirmPress = () => {
        console.log("Confirm Button Pressed");
        if (success) {
            console.log("InsideIf");
            navigation.replace("Login")
            setOpenAlert(false)
        }
        else {
            console.log("Inside Else");
            setOpenAlert(false)
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.COLOR_WHITE }}>
            <Loader loading={loading}></Loader>
            <StatusBar backgroundColor={Colors.COLOR_THEME}></StatusBar>
            <View style={{ margin: 20 }}>
                <TouchableOpacity onPress={()=> navigation.replace('Login')}>
                    <Icon name='arrow-left' size={25} />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                <Text style={{ alignSelf: 'center' }}>Let's Get Started</Text>
                <Text>Create an account to get all features</Text>
            </View>
            <View style={{ flex: 0.7, width: "100%", marginTop: 20, justifyContent: 'space-around' }}>
                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: "80%", backgroundColor: Colors.COLOR_WHITE, borderWidth : 0.1, alignSelf: 'center', borderRadius: 20 }}>
                    <Icon name='user' size={20} style={{ marginLeft: 15 }} />
                    <TextInput
                      autoCapitalize='none'
                        onSubmitEditing={() => { emailRef.current.focus() }}
                        placeholder='name'
                        onChangeText={(value) => setUserName(value)}
                        style={{ width: 230, marginLeft: 10 }}
                    />
                </View>

                

                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: "80%", backgroundColor: Colors.COLOR_WHITE, borderWidth : 0.1, alignSelf: 'center', borderRadius: 20 }}>
                    <Icon name='phone' size={20} style={{ marginLeft: 15 }} />
                    <TextInput
                        keyboardType='numeric'
                        ref={phoneRef}
                        onSubmitEditing={() => { passRef.current.focus() }}
                        placeholder='Phone'
                        onChangeText={(value) => setPhone(value)}
                        style={{ width: 230, marginLeft: 10 }} />
                </View>

                


                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: "80%", backgroundColor: Colors.COLOR_WHITE, borderWidth : 0.1, alignSelf: 'center', borderRadius: 20 }}>
                    <Icon name='lock' size={20} style={{ marginLeft: 15 }} />
                    <TextInput
                        secureTextEntry
                        ref={passRef}
                        onSubmitEditing={() => { rePassRef.current.focus() }}
                        placeholder='Password'
                        onChangeText={(value) => setPassword(value)}
                        style={{ width: 230, marginLeft: 10 }} />
                </View>

                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', width: "80%", backgroundColor: Colors.COLOR_WHITE, borderWidth : 0.1, alignSelf: 'center', borderRadius: 20 }}>
                    <Icon name='lock' size={20} style={{ marginLeft: 15 }} />
                    <TextInput
                        secureTextEntry
                        ref={rePassRef}
                        placeholder='Confirm Password'
                        onChangeText={(value) => setRePassword(value)}
                        style={{ width: 230, marginLeft: 10 }} />
                </View>
            </View>


            <TouchableOpacity onPress={() => onSignUpClick()} style={{ height: 50,borderWidth : 0.1 ,justifyContent: 'center', alignItems: 'center', width: 150, backgroundColor: Colors.COLOR_THEME, borderRadius: 25, alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ color: Colors.COLOR_WHITE, fontWeight: 'bold' }}>CREATE</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center'
                }}
                onPress={() => navigation.replace('Login')}
            >
                <Text style={{ alignSelf: 'center', marginTop: 10 }}>Already have an account?</Text>
                <Text style={{ alignSelf: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}> Login here</Text>
            </TouchableOpacity>
            

        </View>
    )
}

export default SignUp