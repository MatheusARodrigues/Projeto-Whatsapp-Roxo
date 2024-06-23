import React, { useState } from 'react'
import { Text, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { TextInputComponent } from '../../Components/TextInput'
import CustomButton from '../../Components/Botao/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../Assets/branca-whatsapp-150.png'
import { styles } from './style';


export function Login() { 

  const [number, setNumber] = useState<string>();
  const [password, setPassword] = useState<string>('');
  
  const navigator = useNavigation();
 
  const handleNumber = (value: string) => {
    setNumber(value);
  }

  const handlePassword = (value: string) => {
    setPassword(value)
  }


  
  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
        <Image style={styles.logo} source={Logo} alt="Logo tela login"/>

        <Text style={styles.title}>Bem vindo(a) ao WhatsApp</Text>

      <TextInputComponent
        recebendoFuncao={handleNumber}
        recebendoValue={number}
        recebendoPlaceHolder="Digite seu número"
        
      />

      <TextInputComponent
        recebendoFuncao={handlePassword}
        recebendoValue={password}
        recebendoPlaceHolder="Digite sua senha"
        recebendoTipoDoInput={true}
      />

      <CustomButton 
      buttonStyle={styles.button} 
      textStyle={{ color: '#4a148c', fontSize: 20, fontWeight: 'bold' }} 
      title="Entrar" 
      handleOnChange={handleLogin}
      />

    </View>
  </TouchableWithoutFeedback>
)

}