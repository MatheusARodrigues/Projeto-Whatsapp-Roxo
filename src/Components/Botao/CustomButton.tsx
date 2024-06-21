import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle: ViewStyle; 
  textStyle?: TextStyle; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, buttonStyle, textStyle }) => (
  <TouchableOpacity style={buttonStyle} onPress={onPress}>
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

export default CustomButton;