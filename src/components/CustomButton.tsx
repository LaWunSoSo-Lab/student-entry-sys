import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string; // default pink
  textColor?: string; // default white
  fontSize?: number; // default 16
  paddingVertical?: number; // default 14
  paddingHorizontal?: number; // default 20
  borderRadius?: number; // default 12
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = 'pink',
  textColor = '#fff',
  fontSize = 16,
  paddingVertical = 14,
  paddingHorizontal = 20,
  borderRadius = 12,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#ccc' : backgroundColor,
          paddingVertical,
          paddingHorizontal,
          borderRadius,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: textColor, fontSize },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    alignSelf: 'center'
  },
  text: {
    fontWeight: '500',
    fontFamily: 'Poppins-Regular'
  },
});