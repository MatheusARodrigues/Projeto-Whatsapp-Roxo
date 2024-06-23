import React from 'react'
import { TextInput } from 'react-native'
import { styles } from './style'

type PropsComponent = {
  placeHolder?: string;
  value: string;
  onChangeValue: (value: string) => void;
  type?: boolean;
  backgroundColor?: string;
}

export function TextInputComponent({
  onChangeValue, 
  placeHolder, 
  value,
  type,
  backgroundColor
  }: PropsComponent) {

  return (
    <TextInput
      onChangeText={onChangeValue}
      value={value}
      style={[styles.styleInput, { 
        backgroundColor: backgroundColor ? backgroundColor : '#fff'
       }]}
      placeholder={placeHolder ? placeHolder : "Placeholder default"}
      secureTextEntry={type}
    />
  )
}
