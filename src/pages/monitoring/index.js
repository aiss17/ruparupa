import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { 
    View, Text, 
    TouchableOpacity, Image, 
    BackHandler, FlatList, StyleSheet, ImageBackground
} from 'react-native'
import { Descriptions, Images } from '../../assets';
import Icon from 'react-native-vector-icons/Entypo';

class MonitoringEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            dataUser: [], 
            dataEvent: [],
            listVisible: true,
            gridVisible: false,
            isFetching: false
        }
    }

    backPressed = () => {
        BackHandler.exitApp();
		return true;
    };

    componentDidMount() {
        this.dataUser()
        this.dataLogin()
        this.dataMonitoring()
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    dataUser = async () => {
        try {
            const dataUser = await AsyncStorage.getItem("dataUser")
    
            if(dataUser != null) {
                this.setState({ dataUser: JSON.parse(dataUser) })
            }
        } catch (error) {
            console.log("Something wrong => " + error)
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

    async dataMonitoring() {
        let checkEvent;
        let data = await AsyncStorage.getItem('dataUser')
        let parseData = JSON.parse(data)
        let indexID = parseData.findIndex((val) => val.nama === this.state.username)
        if(indexID != -1) {
            checkEvent = parseData[indexID].event
        }
        console.log(parseData[indexID].event)

        if(checkEvent != null){
            console.log('masuk')
            this.setState({
                dataEvent: checkEvent
            })
        }

        this.setState({
            isFetching: false
        })
    }

    toggleListGrid() {
        if(this.state.listVisible) {
            this.setState({
                listVisible: false,
                gridVisible: true
            })
        } else {
            this.setState({
                listVisible: true,
                gridVisible: false
            })
        }
    }

    onRefresh() {
        this.setState({isFetching: true,},() => {this.dataMonitoring();});
   }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                <View 
                    style={{ height: 100, 
                        backgroundColor: '#38bffc', 
                        borderBottomRightRadius: 70, 
                        borderBottomLeftRadius: 70, 
                        justifyContent: 'center', 
                        alignItems: 'center' 
                    }}
                >
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={{ fontSize: 20 }} >Hello, </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Mr/Mrs. {String(this.state.username).toLowerCase()
                                    .replace(/^(.)/, function($1) { return $1.toUpperCase(); })
                                    .replace(/\s/g, ' ')
                                    .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })}</Text>
                    </View>
                </View>

                {this.state.listVisible && ( 
                    <FlatList
                        style= {{ marginTop: 10 }}
                        data= {this.state.dataEvent}
                        // extraData={this.state}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => {
                            return(
                                <TouchableOpacity
                                    activeOpacity= {.7}
                                    onPress={() => this.props.navigation.navigate('Details', {
                                        data: item
                                    })}
                                >
                                    <View style={{ flexDirection: 'row', marginVertical: 5}}>
                                        <View style={{ justifyContent: 'center', flex: 1.6 }}>
                                            <Image source={Images.party} style={{ alignSelf: 'center', height: 50, width: 70 }} />
                                        </View>

                                        <View style={{ flexDirection: 'column', flex: 3 }}>
                                            <Text style={styles.namaEvent}>
                                                {item.name}
                                            </Text>

                                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                                <Icon name={"location-pin"} size={20} style={{ color: '#38bffc' }} />

                                                <Text>
                                                    {item.location}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 1.4, justifyContent: 'center', alignItems: 'center' }}>
                                            <View 
                                                style={{ 
                                                    backgroundColor: 'fff', 
                                                    paddingVertical: 2, 
                                                    paddingHorizontal: 10,
                                                    borderRadius: 50,
                                                    borderWidth: 1,
                                                    borderColor: item.entry == 'free' ? '#1fc22d' : '#ebbc23' 
                                                }}
                                            >
                                                {item.entry == 'free' ? 
                                                    <Text style={{ color: '#1fc22d'}}>Free</Text> :
                                                    <Text style={{ color: '#ebbc23'}}>Paid</Text>
                                                }
                                            </View>
                                        </View>
                                        
                                    </View>
                                    <View style={{ height: 1, backgroundColor: '#baccbf', marginBottom: 5, marginTop: 10 }} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                )}

                {this.state.gridVisible && (
                    <FlatList 
                        style= {{ marginTop: 10 }}
                        data= {this.state.dataEvent}
                        numColumns= {2}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => {
                            return(
                                <TouchableOpacity
                                    style={{ 
                                        flex: 1,
                                        margin: 15, 
                                        borderWidth: 1,
                                        borderColor: '#38bffc',
                                        borderRadius: 20
                                    }}
                                    onPress={() => this.props.navigation.navigate('Details', {
                                        data: item
                                    })}
                                >
                                    <ImageBackground
                                        source={Images.party}
                                        style={{ height: 150,
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <View 
                                            style={{ 
                                                backgroundColor: 'rgba(52, 52, 52, 0.8)', 
                                                borderBottomLeftRadius: 20,
                                                borderBottomRightRadius: 20,
                                                height: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }} >
                                            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }} >
                                                {item.name}
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        }}
                    />
                )}

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ color: '#828282' }}>Pull to refresh...</Text>
                </View>
                

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.touchableOpacityStyle}
                    onPress={() => this.toggleListGrid()}
                >
                    <Image 
                        source={this.state.listVisible ? Images.grid : Images.list}
                        style={styles.floatingButtonStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }

}
export default MonitoringEvent;
const styles = StyleSheet.create({
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: 'red',
        borderWidth:1,
        borderColor:'#38bffc',
        backgroundColor:'#fff',
        borderRadius:50,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        //backgroundColor:'black'
    },
    namaEvent: {
        fontWeight: 'bold',
        marginBottom: 2
    }
})