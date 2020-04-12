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
        onValueChange={onChange}
        value={selected}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginLeft: 8,
  }
});
