import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  return (
    <TextInput
      {...props}
      style={{ ...styles.input, ...props.style }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    fontSize: 55
  },
});

export default Input;