import React from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {getUser} from '../repositories/user.repository';
import {User} from '../models/user';
import {CertificateSummary} from './CertificateSummary.component';
import {Certificate} from '../models/certificate';
import {getCertificate} from '../repositories/certificate.repository';
import {ProfileSummary} from './ProfileSummary.component';

interface Props {
  navigation: any;
}

export function Home({navigation}: Props) {
  const [currentUser, setCurrentUser] = React.useState<User>();
  const [currentCertificate, setCurrentCertificate] = React.useState<
    Certificate
  >();

  React.useEffect(() => {
    async function retrieveCurrentUser() {
      const user = await getUser();
      setCurrentUser(user);
      const certificate = await getCertificate();
      setCurrentCertificate(certificate);
    }

    retrieveCurrentUser();
  }, []);

  function onProfileSave(user: User) {
    setCurrentUser(user);
  }

  function onCertificateSave(certificate: Certificate) {
    setCurrentCertificate(certificate);
  }

  function onCreditsSelected() {
    navigation.navigate('Credits');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProfileSummary
          user={currentUser}
          onProfileEditAction={() =>
            navigation.navigate('ProfileEditor', {
              user: currentUser,
              onSave: onProfileSave,
            })
          }
        />
        {currentUser && (
          <CertificateSummary
            certificate={currentCertificate}
            onCertificateCreateAction={() =>
              navigation.navigate('CertificateEditor', {
                user: currentUser,
                onSave: onCertificateSave,
              })
            }
            onCertificateSelected={(c) => () => {
              navigation.navigate('CertificateReader', {certificate: c});
            }}
          />
        )}
      </ScrollView>
      <View style={styles.credits}>
        <TouchableOpacity onPress={onCreditsSelected}>
          <Text style={styles.creditText}>A propos de cette application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    display: 'flex',
    flex: 1,
  },
  credits: {
    marginBottom: 36,
    marginRight: 24,
    alignSelf: 'flex-end',
  },
  creditText: {
    color: '#999',
  },
});
