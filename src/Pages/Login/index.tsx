import React, { useState } from 'react'
import { Text, View, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInputComponent } from '../../Components/TextInput'
import CustomButton from '../../Components/Botao/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../Assets/branca-whatsapp-150.png'
import { styles } from './style';


export function Login() { 

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const navigator = useNavigation();
 
  const handlePhoneNumber = (value: string) => {
    setPhoneNumber(value)
  }

  const handlePassword = (value: string) => {
    setPassword(value)
  }
  
  const handleLogin = () => {
    if(phoneNumber) {
      navigator.navigate("StackDrawerPages", { name: "Login" })
    } else {
      Alert.alert("Credenciais invalidas!")
    }
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

    </View>
  </TouchableWithoutFeedback>
)

}