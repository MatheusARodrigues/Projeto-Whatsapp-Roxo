import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TiposDeInformacoes = {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loginAutentication: (phoneNumber: string, password: string) => void;
  modalAberto: boolean;
  setModalAberto: (value: boolean) => void;
};

const RemetenteDeInformacoes = createContext<TiposDeInformacoes>({
  phoneNumber: '',
  setPhoneNumber: () => {},
  password: '',
  setPassword: () => {},
  loginAutentication: () => {},
  modalAberto: false,
  setModalAberto: () => {},
});

export const AuthProvider = ({ children }: any) => {
  
    const navegando = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [modalAberto, setModalAberto] = useState<boolean>(false);

  const loginAutentication = (phoneNumber: string, password: string) => {
    
    if (phoneNumber === "" || password === "") {
      setModalAberto(!modalAberto);
    } else {
      navegando.navigate("StackDrawerPages", { name: "Home" });
      storeData(phoneNumber);
    }
  };



  const storeData = async (phoneNumber: string) => {
    
    try {
      await AsyncStorage.setItem('@infouser', phoneNumber);
      console.log('Salvou o número de telefone: ', phoneNumber);
    } catch (error) {
      console.log('Não foi possível salvar os dados!');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@infouser');
      if (value !== null) {
        console.log('Dados resgatados', value);
        navegando.navigate("StackDrawerPages", { name: "Home" });
      }
    } catch (error) {
      console.log('Não foi possível resgatar os dados!');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <RemetenteDeInformacoes.Provider
      value={{
        phoneNumber, setPhoneNumber,
        password, setPassword,
        loginAutentication,
        modalAberto, setModalAberto
      }}>
      {children}
    </RemetenteDeInformacoes.Provider>
  );
};

export const useAuth = () => useContext(RemetenteDeInformacoes);