import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {User} from '../models/user';
import {getUser, saveUser} from '../repositories/user.repository';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {ProfileTextInput} from './ProfileTextInput.component';

interface Props {
  onSave: Function;
}

type RootStackParamList = {Props: Props};

type NavigationProps = {
  route: RouteProp<RootStackParamList, 'Props'>;
  navigation: StackNavigationProp<RootStackParamList, 'Props'>;
};

const emptyUser: User = {
  firstName: '',
  lastName: '',
  birthDate: '',
  birthLocation: '',
  address: '',
  zipCode: '',
  town: '',
};
const dummyUser: User = {
  firstName: 'Jean',
  lastName: 'Valjean',
  birthDate: '18/12/1990',
  birthLocation: 'Sainte-Catherine',
  address: '46 Rue des stations',
  zipCode: '59800',
  town: 'Lille',
};

export function ProfileEditor({route, navigation}: NavigationProps) {
  const {onSave} = route.params;
  const [currentUser, setCurrentUser] = React.useState<User>(emptyUser);

  React.useEffect(() => {
    async function retrieveCurrentUser() {
      try {
        const user = await getUser();
        setCurrentUser(user);
      } catch (e) {}
    }

    retrieveCurrentUser();
  }, []);

  async function saveAndReturn(user: User) {
    await saveUser(user);
    onSave(user);
    navigation.goBack();
  }

  function updateUser(property: any) {
    setCurrentUser({...currentUser, ...property});
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={styles.container}
      scrollEnabled={true}>
      <ProfileTextInput
        onChange={(text: string) => updateUser({firstName: text})}
        value={currentUser.firstName}
        title={'Prénom'}
        hint={'Jean'}
      />
      <ProfileTextInput
        onChange={(text: string) => updateUser({lastName: text})}
        value={currentUser.lastName}
        title={'Nom'}
        hint={'Dupont'}
      />
      <ProfileTextInput
        onChange={(text: string) => updateUser({birthDate: text})}
        value={currentUser.birthDate}
        title={'Date de naissance (format jj/mm/aaaa)'}
        hint={'01/01/1970'}
      />
      <ProfileTextInput
        onChange={(text: string) => updateUser({birthLocation: text})}
        value={currentUser.birthLocation}
        title={'Lieu de naissance'}
        hint={'Lyon'}
      />
      <ProfileTextInput
        onChange={(text: string) => updateUser({address: text})}
        value={currentUser.address}
        title={'Adresse'}
        hint={'999 avenue de france'}
      />
      <ProfileTextInput
        onChange={(text: string) => updateUser({town: text})}
        value={currentUser.town}
        title={'Ville'}
        hint={'Paris'}
      />
      <ProfileTextInput
        onChange={(text: string) => updateUser({zipCode: text})}
        value={currentUser.zipCode}
        title={'Code postal'}
        hint={'75001'}
        keyboardType={'numeric'}
      />
      <View style={styles.button}>
        <Button
          title={'Enregistrer mon profil'}
          onPress={() => saveAndReturn(currentUser)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  button: {
    marginTop: 20,
  },
});
