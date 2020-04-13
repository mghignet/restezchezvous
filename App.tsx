import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileEditor} from './src/profile-editor/ProfileEditor.component';
import {CertificateReader} from './src/certificate-reader/CertificateReader.component';
import {Home} from './src/home/Home.component';
import {CertificateEditor} from './src/certificate-editor/CertificateEditor.component';
import { Credits } from "./src/credits/Credits.component";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: '#RestezChezVous'}}
        />
        <Stack.Screen
          name="ProfileEditor"
          component={ProfileEditor}
          options={{title: 'Profil', headerTruncatedBackTitle: 'Retour'}}
        />
        <Stack.Screen
          name="CertificateEditor"
          component={CertificateEditor}
          options={{title: 'Créer une attestation', headerTruncatedBackTitle: 'Retour'}}
        />
        <Stack.Screen
          name="CertificateReader"
          component={CertificateReader}
          options={{title: 'Attestation', headerTruncatedBackTitle: 'Retour'}}
        />
        <Stack.Screen
          name="Credits"
          component={Credits}
          options={{title: 'A propos', headerTruncatedBackTitle: 'Retour'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
