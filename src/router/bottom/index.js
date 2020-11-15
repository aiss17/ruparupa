import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Monitoring } from '../../pages'
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
        
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                console.log(JSON.stringify(options))
                const label =
                    options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;
                
                const icon = 
                    options.tabBarLabel == "Home"
                    ? "event-note" : "event-available" 
        
                const isFocused = state.index === index;
        
                const onPress = () => {
                    const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    });
        
                    if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                    }
                };
        
                const onLongPress = () => {
                    navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                    });
                };
        
                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                        key={index}
                    >
                        <Icon name={icon} size={25} style={{ color: isFocused ? '#38bffc' : '#000', textAlign: 'center' }} />
                        <Text style={{ color: isFocused ? '#38bffc' : '#000', textAlign: 'center' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default class HomeNavigation extends Component{
    constructor(props){
        super(props)

    }

    componentDidMount() {
        // alert(JSON.stringify(this.props))
    }

    render() {
        return (
            <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
                <Tab.Screen 
                    name="Home" 
                    component={Home} 
                    options={{
                        tabBarLabel: 'Home'
                    }}
                />
                <Tab.Screen 
                    name="Monitoring" 
                    component={Monitoring} 
                    options={{
                        tabBarLabel: 'Monitoring'
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            
                        },
                    })}
                />
            </Tab.Navigator>
        );
    }
}
