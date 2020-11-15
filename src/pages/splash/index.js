import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { 
    View, Text, 
    TouchableOpacity, BackHandler, TextInput, Platform, Dimensions, ImageBackground
} from 'react-native'
import { Images } from '../../assets';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isSelected: false
        }
    }

    componentDidMount() {
        this.dataEvent();
        // BackHandler.addEventListener('hardwareBackPress', this.backPressed);
        setTimeout(() => {
            this.props.navigation.replace('Login')
        }, 2000);
    }
    
    setItem = async (key, item) => {
        try {
            await AsyncStorage.setItem(key, item);
            console.log(await AsyncStorage.getItem(key))
        } catch(err) {
            console.log("Something wrong => " + err)
        }
    }

    dataEvent() {
        const dataEvent = [
            {
                name: "Metallica Concert",
                location: "Palace Grounds",
                entry: "paid",
                type: "concert"
            },
            {
                name: "Saree Exhibition",
                location: "Malleswaram Grounds",
                entry: "free",
                type: "exhibition"
            },
            {
                name: "Wine tasting event",
                location: "Links Brewery",
                entry: "paid",
                type: "party"
            },
            {
                name: "Startups Meet",
                location: "Kanteerava Indoor Stadium",
                entry: "paid",
                type: "meeting"
            },
            {
                name: "Summer Noon Party",
                location: "Kumara Park",
                entry: "paid",
                type: "party"
            },
            {
                name: "Rock and Roll nights",
                location: "Sarjapur Road",
                entry: "paid",
                type: "concert"
            },
            {
                name: "Barbecue Fridays",
                location: "Whitefield",
                entry: "paid",
                type: "meeting"
            },
            {
                name: "Summer workshop",
                location: "Indiranagar",
                entry: "free",
                type: "meeting"
            },
            {
                name: "Impressions & Expressions",
                location: "MG Road",
                entry: "free",
                type: "meeting"
            },
            {
                name: "Italian carnival",
                location: "Electronic City",
                entry: "free",
                type: "meeting"
            },
        ]
        const dataEventParse = JSON.stringify(dataEvent);

        this.setItem("dataEvent", dataEventParse);
    }

    render() {
        return(
            // <View style={{ flex: 1 }}>
                <ImageBackground
                    source={Images.splashScreen}
                    style={{ width: windowWidth, height: windowHeight }}
                >
                    <View style={style.view}>
                        <Text style={style.textInImageCome}>Come join us!</Text>
                        <Text style={style.textInImage}>Make your day to be a </Text>
                        <Text style={style.textInImage}>Good Day...</Text>
                    </View>
                </ImageBackground>
            // </View>
        )
    }
}
export default Splash;

const style = {
    view: {
        flex: 1,
        margin: 30
    },
    textInImageCome: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
    },
    textInImage: {
        fontSize: 20,
        color: 'white'
    }
}