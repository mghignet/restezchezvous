import React from 'react';
import {ScrollView, Button, Text, StyleSheet, View} from 'react-native';
import {getUser} from '../profile/user-service';
import {User} from '../model/user';
import {CertificateSummary} from './CertificateSummary.component';
import {Certificate} from '../model/certificate';
import {getCertificates} from '../certificate-editor/certificate-service';
import {ProfileSummary} from './ProfileSummay.component';

interface Props {
  navigation: any;
}

export function Home({navigation}: Props) {
  const [currentUser, setCurrentUser] = React.useState<User>();
  const [currentCertificates, setCurrentCertificates] = React.useState<
    Certificate[]
  >([]);

  React.useEffect(() => {
    async function retrieveCurrentUser() {
      try {
        const user = await getUser();
        setCurrentUser(user);
        const certificates = await getCertificates();
        setCurrentCertificates(certificates);
      } catch (e) {}
    }

    retrieveCurrentUser();
  }, []);

  function onProfileSave(user: User) {
    setCurrentUser(user);
  }

  function onCertificateSave(certificate: Certificate) {
    const newCertificateList = [...currentCertificates];
    newCertificateList.unshift(certificate);
    setCurrentCertificates(newCertificateList);
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
        <CertificateSummary
          certificates={currentCertificates}
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
});
