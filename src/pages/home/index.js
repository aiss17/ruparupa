import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { 
    View, Text, 
    TouchableOpacity, Image, 
    BackHandler, FlatList
} from 'react-native'
import { Descriptions, Images } from '../../assets';

class Home extends Component {
    constructor(props) {
        super(props);

        const params = props.route.params
        this.state = {
            username: '',
            dataUser: params.dataUser, 
            dataEvent: [],
            dataDummy: [
                {
                    name: 'faisal',
                    tempat: 'Setu Bungur'
                }
            ]
        }
    }

    backPressed = () => {
		BackHandler.exitApp();
		return true;
    };

    componentDidMount() {
        
        this.dataEvent()
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }
    
    dataEvent = async () => {
        try {
            const dataEvent = await AsyncStorage.getItem("dataEvent")
    
            if(dataEvent != null) {
                this.setState({ dataEvent: JSON.parse(dataEvent) })
            }
        } catch (error) {
            console.log("Something wrong => " + error)
        }
    }

    render() {
        console.log(this.state.dataEvent)
        return (
            <View style={{ flex: 1 }} >
                <View style={{ height: 150, backgroundColor: 'red', borderBottomRightRadius: 70, borderBottomLeftRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25 }} >Hello,</Text>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }} >
                        Mr/Mrs. {String(this.state.dataUser.nama).toLowerCase()
                                .replace(/^(.)/, function($1) { return $1.toUpperCase(); })
                                .replace(/\s/g, ' ')
                                .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })}
                    </Text>
                </View>

                <FlatList
                    style= {{ marginTop: 10 }}
                    data= {this.state.dataEvent}
                    // extraData={this.state}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                        return(
                            <TouchableOpacity
                                activeOpacity= {.7}
                                onPress={() => alert("yeay")
                                }
                            >
                                <View style={{ flexDirection: 'row', marginVertical: 5}}>
                                    <View style={{ justifyContent: 'center', flex: 1.7 }}>
                                        <Image source={Images.party} style={{ alignSelf: 'center', height: 50, width: 70 }} />
                                    </View>

                                    <View style={{ flexDirection: 'column', flex: 3.8 }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Text>
                                                Nama Event
                                            </Text>

                                            <Text>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                </View>
                                <View style={{ height: 1, backgroundColor: '#baccbf', marginBottom: 5, marginTop: 10 }} />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }
}

export default Home;