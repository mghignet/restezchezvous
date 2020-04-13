import React from 'react';
import {Switch, Text, View, StyleSheet} from 'react-native';

interface Props {
  label: string;
  selected: boolean;
  onChange: (selected: boolean) => void;
}

export function ReleaseReasonToggle({label, selected, onChange}: Props) {
  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        onValueChange={onChange}
        value={selected}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch:{
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
  }
});
