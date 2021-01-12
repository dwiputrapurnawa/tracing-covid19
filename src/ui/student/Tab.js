import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../student/home/Home';
import Booking from '../student/booking/Booking';
import QRCode from '../student/qrcode/QRCode';

const Tab = createBottomTabNavigator();

export default function TabBottom() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{title: 'Dashboard'}} />
            <Tab.Screen name="Booking" component={Booking} />
            <Tab.Screen name="QRCODE" component={QRCode} />
        </Tab.Navigator>
    );
}