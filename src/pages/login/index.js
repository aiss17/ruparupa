import CheckBox from '@react-native-community/checkbox';
import React, { Component } from 'react'
import { 
    View, Text, 
    TouchableOpacity, Image, BackHandler, TextInput, Platform
} from 'react-native'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isSelected: false
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

    render() {
        return(
            <View style = {{ flex: 1, backgroundColor: '#fff', marginTop: 100 }}>
                {/* <Image source = {images.mileApp} style = {{ height: 94, width: 344, justifyContent: 'center', alignSelf: 'center' }} /> */}
                
                <Text style={{textAlign: 'center', fontSize: 20, color:'#767676', margin: 30}}>Your one stop platform to manage all of your field service management</Text>

                <TextInput
                    textContentType='username'
                    editable={true}
                    style={{
                        width: '80%',
                        fontSize: 14,
                        fontStyle: 'italic',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#0dadf5',
                        marginBottom: 20,
                        alignSelf:'center'
                    }}
                    multiline={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => { this.password.focus(); }}
                    maxLength={13}
                    defaultValue={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                    placeholder={"Enter your organization's name"}
                />

                <TextInput
                    textContentType='password'
                    editable={true}
                    style={{
                        width: '80%',
                        fontSize: 14,
                        fontStyle: 'italic',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#0dadf5',
                        alignSelf: 'center'
                    }}
                    multiline={false}
                    returnKeyType={'next'}
                    ref={(input) => { this.password = input; }}
                    maxLength={13}
                    defaultValue={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder={"Password"}
                />

                <View style={{flexDirection:'row', marginHorizontal: 40, marginTop: 5}}>
                    <View style={{justifyContent: 'flex-start', flex: 4, flexDirection: 'row'}}>
                        <CheckBox
                            value={this.state.isSelected}
                            onValueChange={() => this.setState({
                                isSelected: !this.state.isSelected
                            })}
                        />

                        <Text style={{marginTop: 5}}>Remember me</Text>
                    </View>

                    <View style={{justifyContent: 'flex-start', flex: 4}}>
                        <Text style={{marginTop: 5, textAlign: 'right', color: '#38bffc'}}>Forgot password?</Text>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity = {.7}
                    style = {style.button}
                    onPress = {() => alert('Anda berhasil login')}
                >
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                        LOGIN
                    </Text>
                </TouchableOpacity>

                <View style={{ height: 0.5, backgroundColor: '#baccbf', marginVertical: 30, width: '80%', justifyContent: 'center', alignSelf: 'center' }} />
                
                <View style={{marginHorizontal: 40}}>
                    <Text style={{fontSize: 15}}>
                        Don't have an account?
                    </Text>

                    <Text style={{color: '#38bffc', fontSize: 20}}>
                        Create your organization
                    </Text>
                </View>
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