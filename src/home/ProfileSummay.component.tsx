import React from 'react';
import {User} from 'src/model/user';
import {View, Text, StyleSheet, Button} from 'react-native';

interface Props {
  user?: User;
  onProfileEditAction: () => void;
}

export function ProfileSummary({user, onProfileEditAction}: Props) {
  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text
            style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text>{`Né(e) le ${user.birthDate} à ${user.birthLocation}`}</Text>
          <Text>
            {`Adresse: ${user.address}`}, {`${user.zipCode} ${user.town}`}
          </Text>
        </>
      )}
      {!user && (
        <>
          <Text style={styles.name}>Bienvenue</Text>
          <Text>
            Pour commencer à générer des attestations, il vous faudra renseigner
            vos informations.
          </Text>
          <Text>
            Pas de panique, toutes les données restent stockées sur votre
            téléphone, rien n'est envoyé à aucun service tiers.
          </Text>
          <Text>
            Un résumé de vos informations apparaîtra ici lorsque vous aurez créé
            votre profil.
          </Text>
        </>
      )}
      <View style={styles.button}>
        <Button
          title={user ? 'Modifier mon profil' : 'Je crée mon profil'}
          onPress={onProfileEditAction}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DEDEDE',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  button: {
    marginTop: 10,
  },
});
