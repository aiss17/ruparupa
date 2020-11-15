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
            username: ''
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
            console.log("Data baru yang dibuat => " + await AsyncStorage.getItem(key))
        } catch(err) {
            console.log("Something wrong => " + err)
        }
    }

    pushUser = async (key, item) => {
        await AsyncStorage.setItem("dataLogin", item);
        let dataUser = await AsyncStorage.getItem('dataUser')

        console.log(await AsyncStorage.getItem('dataUser'))
        let parseData = JSON.parse(dataUser)

        if(parseData != null) {
            let indexID = parseData.findIndex((val) => val.nama == this.state.username)

            if (indexID != -1) {
                setTimeout(() => {
                    this.props.navigation.navigate('HomeNavigation', {
                        screen : 'Home',
                        params : {
                            haha: 'haha'
                        }
                    })
                }, 2000);
            } else {
                const dataUser = 
                {
                    nama: item,
                    event: []
                }
        
                parseData.push(dataUser)
                const dataUserParse = JSON.stringify(parseData)
                this.setItem(key, dataUserParse)
                setTimeout(() => {
                    this.props.navigation.navigate('HomeNavigation', {
                        screen : 'Home',
                        params : {
                            haha: 'haha'
                        }
                    })
                }, 2000);
            }
        } else {
            const dataUser = [ 
                {
                    nama: item,
                    event: []
                }
            ]
    
            const dataUserParse = JSON.stringify(dataUser)
            this.setItem(key, dataUserParse)
            setTimeout(() => {
                this.props.navigation.navigate('HomeNavigation', {
                    screen : 'Home',
                    params : {
                        haha: 'haha'
                    }
                })
            }, 2000);
        }
        parseData = parseData == null? [] : parseData
        let indexID = parseData.findIndex((val) => val.nama == this.state.username)
        
    }

    sementara(key, item) {
        console.log("username nya adalah => " + item)
        if(item == null || item == '') {
            Alert.alert(
                'Warning',
                'Please enter your name below'
            )
        } else {
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