import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const CustomText = ({ style, children, ...props }: TextProps) => {
  return (
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Poppins-Regular',
  },
});

export default CustomText;