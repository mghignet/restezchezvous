import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

interface Props {
  title: string;
  hint: string;
  value?: string;
  keyboardType?: "default"|"numeric";
  onChange: Function;
}

export function ProfileTextInput({
  title,
  hint,
  value,
  keyboardType = 'default',
  onChange,
}: Props) {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text: string|number) => onChange(""+text)}
        value={value}
        placeholder={hint}
        placeholderTextColor={styles.hint.color}
        keyboardType={keyboardType}
        autoCorrect={false}
        clearButtonMode={"always"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    padding: 3,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  title: {
    marginBottom: 2,
    color: '#666',
  },
  hint: {
    color: '#CCC',
  },
});
