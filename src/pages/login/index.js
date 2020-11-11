import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { 
    View, Text, 
    TouchableOpacity, Image, BackHandler, TextInput, Platform, Alert
} from 'react-native'
import { Descriptions, Images } from '../../assets';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            dataOtherUser: []
        }
    }

    backPressed = () => {
		BackHandler.exitApp();
		return true;
    };

    componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    setItem = async (key, item) => {
        try {
            await AsyncStorage.setItem(key, item);
            console.log(await AsyncStorage.getItem(key))
        } catch(err) {
            console.log("Something wrong => " + err)
        }
    }

    pushUser = async (key, item) => {
        const getOtherUser = await AsyncStorage.getItem(key)
        if(getOtherUser != null) {
            const getOtherUserParse = JSON.parse(getOtherUser);
            console.log(JSON.parse(getOtherUser))
            const dataUser = 
            {
                nama: item,
                event: []
            }
    
            getOtherUserParse.push(dataUser)
            const dataUserParse = JSON.stringify(getOtherUserParse)
            this.setItem("dataUser", dataUserParse)
            setTimeout(() => {
                this.props.navigation.replace('Home', {
                    dataUser: dataUser
                })
            }, 2000);
        } else {
            const dataUser = [ 
                {
                    nama: item,
                    event: []
                }
            ]
    
            const dataUserParse = JSON.stringify(dataUser)
            this.setItem("dataUser", dataUserParse)
            setTimeout(() => {
                this.props.navigation.navigate('Home', {
                    dataUser: dataUser
                })
            }, 2000);
        }
    }

    sementara(key, item) {
        console.log("hahahaha => " + item)
        if(item == null || item == '') {
            Alert.alert(
                'Warning',
                'Please enter your name below'
            )
        } else {
            console.log("error")
            this.pushUser(key, item)
        }
    }

    render() {
        return(
            <View style = {{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image source = {images.mileApp} style = {{ height: 94, width: 344, justifyContent: 'center', alignSelf: 'center' }} /> */}
                
                <Text style={{textAlign: 'center', fontSize: 25, color:'#38bffc'}}>{Descriptions.loginPagesDescription}</Text>

                <Image source={Images.party} style={{ height: 250, width: 250 }} />

                <TextInput
                    textContentType='username'
                    editable={true}
                    style={{
                        width: '80%',
                        fontSize: 14,
                        fontStyle: 'normal',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#0dadf5',
                        alignSelf: 'center'
                    }}
                    multiline={false}
                    returnKeyType={'done'}
                    maxLength={13}
                    defaultValue={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                    placeholder={"Enter your name"}
                />

                <TouchableOpacity
                    activeOpacity = {.7}
                    style = {style.button}
                    onPress = {() => this.sementara("dataUser", this.state.username)}
                >
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Login;

const style = {
    button: {
        marginTop: 20,
        padding: 10, 
        width: '80%', 
        backgroundColor: '#38bffc', 
        borderWidth: 1, 
        borderColor: '#0dadf5',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    }
}