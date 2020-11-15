import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { 
    View, Text, 
    TouchableOpacity, Image, BackHandler, StyleSheet, Dimensions, ScrollView
} from 'react-native'
import { Images } from '../../assets';
import LocationIcon from 'react-native-vector-icons/Entypo';
import DateIcon from 'react-native-vector-icons/Fontisto';
import DollarIcon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment'

var idLocale = require('moment/locale/id'); 
moment.updateLocale('id', idLocale);

class Details extends Component {
    constructor(props) {
        super(props);
        
        const params = props.route.params
        this.state = {
            dataEvent: params.data,
            image: null,
            username: '',
            dataOtherUser: [],
            dataEventUser: [],
            checkJoin: false
        }
    }

    backPressed = () => {
		this.props.navigation.goBack();
		return true;
    };

    componentDidMount() {
        this.dataLogin()
        this.checkJoin()
        this.imageSelection()
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    imageSelection() {
        if(this.state.dataEvent.type == "concert") {
            this.setState({
                image: Images.concert
            })
        } else if(this.state.dataEvent.type == "meeting") {
            this.setState({
                image: Images.meeting
            })
        } else if(this.state.dataEvent.type == "party") {
            this.setState({
                image: Images.party
            })
        } else {
            this.setState({
                image: Images.exhibition
            })
        }
    }

    dataLogin = async () => {
        try {
            const dataLogin = await AsyncStorage.getItem("dataLogin")
    
            if(dataLogin != null) {
                this.setState({ username: dataLogin })
            }
        } catch (error) {
            console.log("Something wrong => " + error)
        }
    }

    async checkJoin() {
        let checkEvent;
        let data = await AsyncStorage.getItem('dataUser')
        let parseData = JSON.parse(data)
        let indexID = parseData.findIndex((val) => val.nama === this.state.username)
        if(indexID != -1) {
            checkEvent = parseData[indexID].event
        }

        let indexEvent = checkEvent.findIndex((val) => val.name == this.state.dataEvent.name)
        if(indexEvent == -1) {
            this.setState({
                checkJoin: true
            })
        }
    }

    async joinEvent(event) {
        console.log(event)
        let eventPush;
        let data = await AsyncStorage.getItem('dataUser')
        let parseData = JSON.parse(data)
        let indexUser = parseData.findIndex((val) => val.nama == this.state.username)
        if (indexUser != -1) {
            eventPush = parseData[indexUser].event
        }

        let indexEvent = eventPush.findIndex((val) => val.name == event.name)
        if(indexEvent == -1) {
            eventPush.push(event)
            this.setState({
                checkJoin: false
            })
        } else {
            eventPush.splice(indexEvent, 1)
            this.setState({
                checkJoin: true
            })
        }

        this.getDataStorage(eventPush)
    }

    async getDataStorage(eventTemp) {
        let data = await AsyncStorage.getItem('dataUser')
        let parseData = JSON.parse(data)
        let indexID = parseData.findIndex((val) => val.nama == this.state.username)
        if (indexID != -1) {
            parseData[indexID].event = eventTemp
        }
        await AsyncStorage.setItem("dataUser", JSON.stringify(parseData))
        console.log(await AsyncStorage.getItem('dataUser'))
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <Image source={this.state.image} style={{ height: 300, width: Dimensions.get('window').width }} />

                    <View style={{ marginHorizontal: 25, marginTop: 10 }}>
                        <Text style={styles.title} >
                            {this.state.dataEvent.name.toUpperCase()}
                        </Text>

                        <View style={{ flexDirection: 'row', marginTop: 5 }} >
                            <LocationIcon name={"location-pin"} size={25} style={{ color: '#38bffc' }} />
                            <Text style={{ fontSize: 15, marginLeft: 10, color: '#828282' }} >
                                {this.state.dataEvent.location}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 3 }} >
                            <DateIcon name={"date"} size={25} style={{ color: '#38bffc' }} />
                            <Text style={{ fontSize: 15, marginLeft: 10, color: '#828282' }} >
                                {moment(new Date()).format("dddd, DD MMMM yyyy")}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }} >
                            <Text style={{ 
                                fontSize: 20, 
                                color: this.state.dataEvent.entry == 'free' ? '#1fc22d' : '#ebbc23' }} 
                            >
                                {this.state.dataEvent.entry.toUpperCase()}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                marginTop: 15,
                                backgroundColor: this.state.checkJoin ? '#38bffc' : '#adadad',
                                height: 40,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            activeOpacity= {.7}
                            onPress={() => this.joinEvent(this.state.dataEvent)}
                        >
                            {this.state.checkJoin ? 
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>
                                    JOIN
                                </Text>
                                :
                                <Text style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>
                                    Cancel Join
                                </Text>
                            }
                        </TouchableOpacity>

                        <Text style={{ color: '#777', marginTop: 15, fontWeight: 'bold' }}>DESCRIPTION</Text>
                        <Text style={{ color: '#828282', marginTop: 5, textAlign: 'justify' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

}
export default Details;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#545454'
    }
})
