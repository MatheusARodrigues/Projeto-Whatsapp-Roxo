import React from 'react'
import { TextInput } from 'react-native'
import { styles } from './style'

type PropsComponent = {
  recebendoPlaceHolder?: string;
  recebendoValue: string;
  recebendoFuncao: (value: string) => void;
  recebendoTipoDoInput?: boolean;
  recebendoBackgroundColor?: string;
}

export function TextInputComponent({
  recebendoFuncao, 
  recebendoPlaceHolder, 
  recebendoValue,
  recebendoTipoDoInput,
  recebendoBackgroundColor
  }: PropsComponent) {

  return (
    <TextInput
      onChangeText={recebendoFuncao}
      value={recebendoValue}
      style={[styles.styleInput, { 
        backgroundColor: recebendoBackgroundColor ? recebendoBackgroundColor : '#fff'
       }]}
      placeholder={recebendoPlaceHolder ? recebendoPlaceHolder : "Placeholder default"}
      secureTextEntry={recebendoTipoDoInput}
    />
  )
}
