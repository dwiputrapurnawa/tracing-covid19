import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home/Home';
import List from './list/List';
import News from './news/News';
import Scan from './scanqr/Scan';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabBottom() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if(route.name === 'Home') {
                    iconName = focused ? 'grid' : 'grid-outline'
                } else if (route.name === 'News') {
                    iconName = focused ? 'newspaper' : 'newspaper-outline'
                } else if (route.name === 'List') {
                    iconName = focused ? 'list' : 'list-outline'
                } else if (route.name === 'QR Scan') {
                    iconName = focused ? 'scan' : 'scan-outline'
                }

                return <Ionicons name={iconName} size={size} color={color} />
            }
        })}

        tabBarOptions={{
            activeTintColor: '#00E8FF',
            inactiveTintColor: 'gray',
        }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="List" component={List} />
            <Tab.Screen name="QR Scan" component={Scan} />
        </Tab.Navigator>
    );
}