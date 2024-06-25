import React, { useState } from 'react'
import { Text, View, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInputComponent } from '../../Components/TextInput'
import CustomButton from '../../Components/Botao/CustomButton';
import Logo from '../../Assets/branca-whatsapp-150.png'
import { styles } from './style';
import { useAuth } from '../../Hooks/useAuth';
import { ModalComponent } from '../../Components/ModalComponent';


export function Login() { 

  const {
    phoneNumber, setPhoneNumber,
    setPassword, password,
    loginAutentication,
    modalAberto
  } = useAuth();

  const handlePhoneNumber = (value: string) => {
    setPhoneNumber(value)
  }

  const handlePassword = (value: string) => {
    setPassword(value)
  }
  
  const handleLogin = () => {
    loginAutentication(phoneNumber, password)
  }
  
  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
        <Image style={styles.logo} source={Logo} alt="Logo tela login"/>

        <Text style={styles.title}>Bem vindo(a) ao WhatsApp</Text>

      <TextInputComponent
        onChangeValue={handlePhoneNumber}
        value={phoneNumber}
        placeHolder="Digite seu número..."
        
      />

      <TextInputComponent
       onChangeValue={handlePassword}
        value={password}
        placeHolder="Digite sua senha..."
        type={true}
      />

      <CustomButton 
      buttonStyle={styles.button} 
      textStyle={{ color: '#4a148c', fontSize: 20, fontWeight: 'bold' }} 
      title="Entrar" 
      onPress={handleLogin}
      />

      {modalAberto && (
          <ModalComponent />
        )}

    </View>
  </TouchableWithoutFeedback>
)

}