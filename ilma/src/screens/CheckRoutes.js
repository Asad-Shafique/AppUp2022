import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, TouchableOpacity , Linking, ScrollView } from "react-native";
import firestore from '@react-native-firebase/firestore';
import Constants from "../http/Constants";
import Session from "../utils/Session";
import Http from "../http/Http";
import Utils from '../utils/Utils'
import Loader from "../utils/loader";
import Colors from "../themes/Colors";
import FontSize from "../utils/FontSize";

const CheckRoutes = ({ navigation }) => {

    useEffect(() => {

    });

    const [loading, setLoading] = useState(false)
    return (
        <ScrollView style={{ flex: 1 }}>
            <Loader loading={loading}></Loader>
            <StatusBar backgroundColor={Colors.COLOR_THEME}></StatusBar>

            <View style={{ height : 150, backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 60, borderBottomRightRadius: 60, justifyContent: "center", alignItems: "center" }}>

                <Text style={{ fontSize: FontSize.FONT_SIZE_26, color: 'white', fontWeight: "bold" }}>Medical Portal</Text>

            </View>

            <View style={{ width: "90%", backgroundColor: 'white', alignSelf: "center", marginTop: 20, marginBottom: 10, borderRadius: 30, height: 150 }}>

                <View style={{ backgroundColor: Colors.THEME_COLOR, justifyContent: "center", alignItems: "center", height: 30, width: 150, position: "absolute", right: 0, top: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <Text style={{ color: 'white' }}>2000 /- Rs</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>Name       </Text>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} > Hamza</Text>
                    </View>
                </View>

                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>speciality</Text>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} > General Doctor</Text>
                    </View>
                </View>
                <View style = {{  flexDirection : "row" , position : "absolute" , bottom : 0}}>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'03492055477'}`) } style={{ height: 40, justifyContent: "center", alignItems: "center", width: "49%", backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 30}}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 2, fontWeight: "bold" }}>Phone Call</Text>
                    </TouchableOpacity>
                    <View style = {{ width : 6 }}></View>
                    <TouchableOpacity onPress={()=> Linking.openURL(`whatsapp://send?phone=${'03492055477'}`) } style={{ height: 40, justifyContent: "center", alignItems: "center", width: "49%", backgroundColor: Colors.THEME_COLOR, borderBottomRightRadius: 30}}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 2, fontWeight: "bold" }}> Whatsapp call</Text>
                    </TouchableOpacity>
                </View>

            </View>


            <View style={{ width: "90%", backgroundColor: 'white', alignSelf: "center", marginTop: 20, marginBottom: 10, borderRadius: 30, height: 150 }}>

                <View style={{ backgroundColor: Colors.THEME_COLOR, justifyContent: "center", alignItems: "center", height: 30, width: 150, position: "absolute", right: 0, top: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <Text style={{ color: 'white' }}>1500 /- Rs</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>Name       </Text>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} > Hammad</Text>
                    </View>
                </View>

                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>speciality</Text>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} > General Doctor</Text>
                    </View>
                </View>
                <View style = {{  flexDirection : "row" , position : "absolute" , bottom : 0}}>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'03172065541'}`) } style={{ height: 40, justifyContent: "center", alignItems: "center", width: "49%", backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 30}}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 2, fontWeight: "bold" }}>Phone Call</Text>
                    </TouchableOpacity>
                    <View style = {{ width : 6 }}></View>
                    <TouchableOpacity onPress={()=> Linking.openURL(`whatsapp://send?phone=${'03172065541'}`) } style={{ height: 40, justifyContent: "center", alignItems: "center", width: "49%", backgroundColor: Colors.THEME_COLOR, borderBottomRightRadius: 30}}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 2, fontWeight: "bold" }}> Whatsapp call</Text>
                    </TouchableOpacity>
                </View>

            </View>


            <View style={{ width: "90%", backgroundColor: 'white', alignSelf: "center", marginTop: 20, marginBottom: 10, borderRadius: 30, height: 150 }}>

                <View style={{ backgroundColor: Colors.THEME_COLOR, justifyContent: "center", alignItems: "center", height: 30, width: 150, position: "absolute", right: 0, top: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <Text style={{ color: 'white' }}>5500 /- Rs</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>Name       </Text>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} > Darab</Text>
                    </View>
                </View>

                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>speciality</Text>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} > Heart Surgon</Text>
                    </View>
                </View>
                <View style = {{  flexDirection : "row" , position : "absolute" , bottom : 0}}>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'03331348702'}`) } style={{ height: 40, justifyContent: "center", alignItems: "center", width: "49%", backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 30}}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 2, fontWeight: "bold" }}>Phone Call</Text>
                    </TouchableOpacity>
                    <View style = {{ width : 6 }}></View>
                    <TouchableOpacity onPress={()=> Linking.openURL(`whatsapp://send?phone=${'03331348702'}`) } style={{ height: 40, justifyContent: "center", alignItems: "center", width: "49%", backgroundColor: Colors.THEME_COLOR, borderBottomRightRadius: 30}}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 2, fontWeight: "bold" }}> Whatsapp call</Text>
                    </TouchableOpacity>
                </View>

            </View>


            <View style={{ width: "90%", backgroundColor: 'white', alignSelf: "center", marginTop: 20, marginBottom: 10, borderRadius: 30, height: 150 }}>

                <View style={{ backgroundColor: Colors.THEME_COLOR, justifyContent: "center", alignItems: "center", height: 30, width: 150, position: "absolute", right: 0, top: 0, borderTopRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <Text style={{ color: 'white' }}>1000 /- Rs</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>Name       </Text>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} > khizer</Text>
                    </View>
                </View>

                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_TEXT_BLACK, margin: 10, fontWeight: "bold" }}>speciality</Text>
                        <Text style={{ fontSize: FontSize.FONT_SIZE_16, color: Colors.THEME_COLOR, margin: 10 }} > General Doctor</Text>
                    </View>
                </View>
                <View style = {{  flexDirection : "row" , position : "absolute" , bottom : 0}}>

                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${'03162547872'}`) } style={{ height: 40, justifyContent: "center", alignItems: "center", width: "49%", backgroundColor: Colors.THEME_COLOR, borderBottomLeftRadius: 30}}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 2, fontWeight: "bold" }}>Phone Call</Text>
                    </TouchableOpacity>
                    <View style = {{ width : 6 }}></View>
                    <TouchableOpacity onPress={()=> Linking.openURL(`whatsapp://send?phone=${'03162547872'}`) } style={{ height: 40, justifyContent: "center", alignItems: "center", width: "49%", backgroundColor: Colors.THEME_COLOR, borderBottomRightRadius: 30}}>
                        <Text style={{ color: Colors.THEME_TEXT_WHITE, letterSpacing: 2, fontWeight: "bold" }}> Whatsapp call</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}
export default CheckRoutes