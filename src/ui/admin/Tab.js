import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home/Home';
import List from './list/List';
import News from './news/News';
import Scan from './scanqr/Scan';

const Tab = createBottomTabNavigator();

export default function TabBottom() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="List" component={List} />
            <Tab.Screen name="QR Scan" component={Scan} />
        </Tab.Navigator>
    );
}