import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

const InputField = ({placeholder, value, onChangeText, editable = true}) => (
  <TextInput
    style={[styles.input, !editable && styles.disabled]}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    editable={editable}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: '#f2f2f2',
  },
});

export default InputField;
