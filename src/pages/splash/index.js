import CheckBox from '@react-native-community/checkbox';
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
        // BackHandler.addEventListener('hardwareBackPress', this.backPressed);
        setTimeout(() => {
            this.props.navigation.replace('Login')
        }, 2000);
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