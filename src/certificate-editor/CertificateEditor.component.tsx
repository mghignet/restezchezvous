import React, {useState} from 'react';
import {User} from '../models/user';
import {RouteProp} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {Button, ScrollView, Text, StyleSheet, View} from 'react-native';
import {Certificate} from '../models/certificate';
import {saveCertificate} from '../repositories/certificate.repository';
import {CertificateReason} from '../models/certificate-reason';
import {ReleaseReason, ReleaseReasons} from '../models/release-reason';
import {formatDateAndTime} from '../services/date.service';
import {ReleaseReasonToggle} from './ReleaseReasonToggle.component';

interface Props {
  user: User;
  onSave: Function;
}

type RootStackParamList = {Props: Props};

type NavigationProps = {
  route: RouteProp<RootStackParamList, 'Props'>;
  navigation: StackNavigationProp<RootStackParamList, 'Props'>;
};

export function CertificateEditor({route, navigation}: NavigationProps) {
  const {user, onSave} = route.params;

  const emptyReason: CertificateReason = {
    releaseReasons: [],
    releaseDate: new Date(),
  };
  const [certificateReason, setCertificateReason] = useState(emptyReason);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  function showDatePicker() {
    setDatePickerVisible(true);
  }

  function hideDatePicker() {
    setDatePickerVisible(false);
  }

  function updateReleaseDate(date: Date) {
    setCertificateReason({
      ...certificateReason,
      releaseDate: date,
    });
    hideDatePicker();
  }

  const toggleReason = (reason: ReleaseReason) => (selected: boolean) => {
    selected ? addReason(reason) : removeReason(reason);
  };

  function hasReason(reason: ReleaseReason) {
    return certificateReason.releaseReasons.includes(reason);
  }

  function removeReason(reason: ReleaseReason) {
    const newReasons = certificateReason.releaseReasons.filter(
      (r) => r != reason,
    );
    setCertificateReason({...emptyReason, releaseReasons: newReasons});
  }

  function addReason(reason: ReleaseReason) {
    // try to remove it first to prevent duplicates
    const reasonsWithoutTheOnToAdd = certificateReason.releaseReasons.filter(
      (r) => r != reason,
    );
    setCertificateReason({
      ...emptyReason,
      releaseReasons: [...reasonsWithoutTheOnToAdd, reason],
    });
  }

  async function buildCertificateAndReturn(reason: CertificateReason) {
    const certificate: Certificate = {
      ...user,
      ...reason,
      creationDate: new Date(),
    };
    await saveCertificate(certificate);
    onSave(certificate);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>Créer une attestation</Text>
      <Text>Choisissez une ou plusieurs raisons</Text>
      <ReleaseReasonToggle
        label={'Travail'}
        onChange={toggleReason(ReleaseReasons.TRAVAIL)}
        selected={hasReason(ReleaseReasons.TRAVAIL)}
      />
      <ReleaseReasonToggle
        label={'Achats'}
        onChange={toggleReason(ReleaseReasons.COURSES)}
        selected={hasReason(ReleaseReasons.COURSES)}
      />
      <ReleaseReasonToggle
        label={'Consultation médicale'}
        onChange={toggleReason(ReleaseReasons.SANTE)}
        selected={hasReason(ReleaseReasons.SANTE)}
      />
      <ReleaseReasonToggle
        label={'Motif familial'}
        onChange={toggleReason(ReleaseReasons.FAMILLE)}
        selected={hasReason(ReleaseReasons.FAMILLE)}
      />
      <ReleaseReasonToggle
        label={'Balade / Sport'}
        onChange={toggleReason(ReleaseReasons.SPORT)}
        selected={hasReason(ReleaseReasons.SPORT)}
      />
      <ReleaseReasonToggle
        label={'Convocation judiciaire'}
        onChange={toggleReason(ReleaseReasons.JUDICIAIRE)}
        selected={hasReason(ReleaseReasons.JUDICIAIRE)}
      />
      <ReleaseReasonToggle
        label={"Mission d'intérêt général"}
        onChange={toggleReason(ReleaseReasons.MISSIONS)}
        selected={hasReason(ReleaseReasons.MISSIONS)}
      />
      <View style={styles.releaseDate}>
        <View>
          <Text style={styles.releaseDateText}>Date de sortie</Text>
          <Text>Le {formatDateAndTime(certificateReason.releaseDate)}</Text>
        </View>
        <View style={styles.releaseDateButton}>
          <Button title={'Modifier'} onPress={showDatePicker} />
        </View>
      </View>
      <DateTimePickerModal
        date={certificateReason.releaseDate}
        isVisible={isDatePickerVisible}
        is24Hour={true} // turns on 24 hours on Android
        locale="fr_FR" // turns on 24 hours on iOS
        mode="datetime"
        onConfirm={updateReleaseDate}
        onCancel={hideDatePicker}
        headerTextIOS={'Date de sortie'}
        confirmTextIOS={'Confirmer'}
        cancelTextIOS={'Annuler'}
      />
      <View style={styles.button}>
        <Button
          title={'Créer mon attestation'}
          onPress={() => {
            buildCertificateAndReturn(certificateReason);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#EEE',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  releaseDate: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  releaseDateText: {
    fontSize: 16,
  },
  releaseDateButton: {
    marginLeft: 12,
  },
  button: {
    marginTop: 24,
  },
});
