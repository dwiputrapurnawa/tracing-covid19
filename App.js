import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tab from './src/ui/student/Tab';
import TabAdmin from './src/ui/admin/Tab';
import Login from './src/ui/student/login/Login';
import LoginAdmin from './src/ui/admin/login/Login';
import { ThemeProvider } from 'react-native-elements';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

const Stack = createStackNavigator();

function Startup({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{marginRight: 5}}>
        <Button title="Mahasiswa" onPress={() => navigation.navigate('Tab_Student')} />
      </View>
      <Button title="Admin" onPress={() => navigation.navigate('Tab_Admin')} />
    </View>
  );
}

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light} > 
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Startup" component={Startup} options={{headerShown: false}} />
            <Stack.Screen name="Tab_Student" component={Tab} options={{headerShown: false}} />
            <Stack.Screen name="Tab_Admin" component={TabAdmin} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{title: 'Login Admin'}} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ApplicationProvider>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
