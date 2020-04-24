import React from 'react';
import {User} from 'src/models/user';
import {Platform, View, Text, StyleSheet, Button, ImageBackground} from 'react-native';

interface Props {
  user?: User;
  onProfileEditAction: () => void;
}

const buttonColor = Platform.select({
  ios: 'white',
  android: '#57043b',
  default: '',
})

export function ProfileSummary({user, onProfileEditAction}: Props) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/home-bg.png')} style={styles.image}>
        {user && (
          <>
            <Text
              style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={styles.text}>{`Né(e) le ${user.birthDate} à ${user.birthLocation}`}</Text>
            <Text style={styles.text}>
              {`Adresse: ${user.address}`}, {`${user.zipCode} ${user.town}`}
            </Text>
          </>
        )}
        {!user && (
          <>
            <Text style={styles.name}>Bienvenue</Text>
            <Text style={styles.text}>
              Pour commencer à générer des attestations, il vous faudra
              renseigner vos informations.
            </Text>
            <Text style={styles.text}>
              Pas de panique, toutes les données restent stockées sur votre
              téléphone, rien n'est envoyé à aucun service tiers.
            </Text>
            <Text style={styles.text}>
              Un résumé de vos informations apparaîtra ici lorsque vous aurez
              créé votre profil.
            </Text>
          </>
        )}
        <View style={styles.button}>
          <Button
            color={buttonColor}
            title={user ? 'Modifier mon profil' : 'Je crée mon profil'}
            onPress={onProfileEditAction}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  image: {
    padding: 40,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    color: 'white',
  },
  button: {
    marginTop: 20,
  },
});
