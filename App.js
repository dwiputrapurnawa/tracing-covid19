import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tab from './src/ui/student/Tab';
import TabAdmin from './src/ui/admin/Tab';
import Login from './src/ui/student/login/Login';
import LoginAdmin from './src/ui/admin/login/Login';
import { ThemeProvider } from 'react-native-elements';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { Button } from 'react-native-elements';

const Stack = createStackNavigator();

function Startup({ navigation }) {
  return (
    <Layout style={styles.container}>

      <Text style={styles.header_text}>Choose Your Role</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tab_Student')}>
        <Image style={styles.image_student} source={require('./src/img/student.png')} />
        <Text style={styles.student_text}>Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tab_Admin')}>
        <Image style={styles.image_admin} source={require('./src/img/admin.png')} />
        <Text style={styles.student_text}>Admin</Text>
      </TouchableOpacity>
    </Layout>
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 0.2,
    borderLeftWidth: 0.2,
    width: 230,
    height : 220,
    borderRadius: 40,
    marginVertical: 20,
    borderColor: '#D2D2D2'
  },
  image_student: {
    width: 150,
    height: 160,
    alignSelf: 'center',
    marginTop: 15,
  },
  image_admin: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 15,
  },
  student_text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  header_text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 50
  }
});
