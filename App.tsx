import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Profile } from "./src/profile/Profile.component";
import { CertificateReader } from "./src/form/CertificateReader.component";
import { Home } from "./src/home/Home.component";
import { CertificateEditor } from "./src/certificate-editor/CertificateEditor.component";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="CertificateEditor"
          component={CertificateEditor}
        />
        <Stack.Screen
          name="CertificateReader"
          component={CertificateReader}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
