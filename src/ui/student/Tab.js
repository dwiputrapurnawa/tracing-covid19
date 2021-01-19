import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../student/home/Home';
import Booking from '../student/booking/Booking';
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
                    } else if (route.name === 'Booking') {
                        iconName = focused ? 'bookmarks' : 'bookmarks-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}

            tabBarOptions={{
                activeTintColor: '#1dc9d3',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{title: 'Dashboard'}} />
            <Tab.Screen name="Booking" component={Booking} />
        </Tab.Navigator>
    );
}