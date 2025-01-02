import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const ThemedTextInput = ({ style, ...props }) => {
  const { colors } = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        { 
          backgroundColor: colors.card,
          color: colors.text,
          borderColor: colors.border,
        },
        style
      ]}
      placeholderTextColor={colors.text}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});