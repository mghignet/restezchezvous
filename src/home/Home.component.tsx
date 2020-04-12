import React from 'react';
import {ScrollView, Button, Text, StyleSheet, View} from 'react-native';
import {getUser} from '../profile/user-service';
import {User} from '../model/user';
import {ProfileSummary} from './ProfileSummay.component';

interface Props {
  navigation: any;
}

export function Home({navigation}: Props) {
  const dummyReason = {
    reasons: ['travail', 'courses'],
    releaseDate: '01/04/2020',
    releaseHours: '15',
    releaseMinutes: '30',
  };

  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    async function retrieveCurrentUser() {
      try {
        const user = await getUser();
        setCurrentUser(user);
      } catch (e) {}
    }

    retrieveCurrentUser();
  }, []);

  function onProfileSave(user: User) {
    setCurrentUser(user);
  }

  return (
    <ScrollView style={styles.container}>
      <ProfileSummary
        user={currentUser}
        onProfileEditAction={() =>
          navigation.navigate('Profile', {onSave: onProfileSave})
        }
      />
      {currentUser && (
        <View style={styles.button}>
          <Button
            title="Générer une attestation"
            onPress={() =>
              navigation.navigate('CertificateReader', {
                user: currentUser,
                reason: dummyReason,
              })
            }
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  profileSummary: {
    padding: 20,
    backgroundColor: '#DDD',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});
