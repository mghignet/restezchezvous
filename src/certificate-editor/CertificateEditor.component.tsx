import React, {useState} from 'react';
import {User} from '../model/user';
import {RouteProp} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {Button, ScrollView} from 'react-native';
import {Certificate} from '../model/certificate';
import {saveCertificate} from './certificate-service';
import {CertificateReason} from '../model/certificate-reason';
import {ReleaseReason, ReleaseReasons} from '../model/release-reason';
import {formatDateAndTime} from '../services/date-service';
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

const emptyReason: CertificateReason = {
  reasons: [],
  releaseDate: new Date(),
};

export function CertificateEditor({route, navigation}: NavigationProps) {
  const {user, onSave} = route.params;
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
    return certificateReason.reasons.includes(reason)
  }

  function removeReason(reason: ReleaseReason) {
    const newReasons = certificateReason.reasons.filter((r) => r != reason);
    setCertificateReason({...emptyReason, reasons: newReasons});
  }

  function addReason(reason: ReleaseReason) {
    // try to remove it first to prevent duplicates
    const reasonsWithoutTheOnToAdd = certificateReason.reasons.filter(
      (r) => r != reason,
    );
    setCertificateReason({
      ...emptyReason,
      reasons: [...reasonsWithoutTheOnToAdd, reason],
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
    <ScrollView>
      <ReleaseReasonToggle
        label={'Je vais travailler'}
        onChange={toggleReason(ReleaseReasons.TRAVAIL)}
        selected={hasReason(ReleaseReasons.TRAVAIL)}
      />
      <ReleaseReasonToggle
        label={'Je vais acheter des produits de première nécessité'}
        onChange={toggleReason(ReleaseReasons.COURSES)}
        selected={hasReason(ReleaseReasons.COURSES)}
      />
      <ReleaseReasonToggle
        label={'Je me rends à une consultation médicale'}
        onChange={toggleReason(ReleaseReasons.SANTE)}
        selected={hasReason(ReleaseReasons.SANTE)}
      />
      <ReleaseReasonToggle
        label={
          "Je me déplace pour motif familial (aider un proche, garde d'enfants...)"
        }
        onChange={toggleReason(ReleaseReasons.FAMILLE)}
        selected={hasReason(ReleaseReasons.FAMILLE)}
      />
      <ReleaseReasonToggle
        label={
          "Je m'aère l'esprit ou je promène mon chien autour de chez moi, pendant maximum une heure"
        }
        onChange={toggleReason(ReleaseReasons.SPORT)}
        selected={hasReason(ReleaseReasons.SPORT)}
      />
      <ReleaseReasonToggle
        label={"J'ai une convocation judiciaire"}
        onChange={toggleReason(ReleaseReasons.JUDICIAIRE)}
        selected={hasReason(ReleaseReasons.JUDICIAIRE)}
      />
      <ReleaseReasonToggle
        label={"je participe à des mission d'intérêt général"}
        onChange={toggleReason(ReleaseReasons.MISSIONS)}
        selected={hasReason(ReleaseReasons.MISSIONS)}
      />
      <Button
        title={
          certificateReason.releaseDate
            ? formatDateAndTime(certificateReason.releaseDate)
            : `Date de sortie`
        }
        onPress={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        is24Hour={true} // turns on 24 hours on Android
        locale="fr_FR" // turns on 24 hours on iOS
        mode="datetime"
        onConfirm={updateReleaseDate}
        onCancel={hideDatePicker}
        headerTextIOS={'Date de sortie'}
        confirmTextIOS={'Confirmer'}
        cancelTextIOS={'Annuler'}
        minuteInterval={5}
      />
      <Button
        title={'Créer mon attestation'}
        onPress={() => {
          buildCertificateAndReturn(certificateReason);
        }}
      />
    </ScrollView>
  );
}
