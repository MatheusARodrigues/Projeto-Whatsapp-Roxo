import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import baseStyles from './style';
import CustomButton from '../../Components/Botao/CustomButton';

type Message = {
  id: string;
  contact: string;
  preview: string;
  date: string;
};

const messages = [
  { id: '1', contact: '+55 24 99324-0212', preview: 'Bom dia!', date: '15/06/2024' },
  { id: '2', contact: 'Aula 2024', preview: 'Foto', date: '14/06/2024' },
  { id: '3', contact: ':)', preview: 'Você bloqueou esse contato', date: '' },
  { id: '4', contact: '+55 18 8839-1213', preview: 'Áudio', date: '17/05/2020' },
  { id: '5', contact: 'Nome do contato', preview: 'Mensagem', date: '16/05/2020' },
  { id: '6', contact: 'Nome do contato', preview: 'Mensagem', date: '15/05/2020' },
  { id: '7', contact: 'Nome do contato', preview: 'Mensagem', date: '14/05/2020' },
  { id: '8', contact: 'Nome do contato', preview: 'Mensagem', date: '13/05/2020' },
  { id: '9', contact: 'Nome do contato', preview: 'Mensagem', date: '12/05/2020' },
  { id: '10', contact: 'Nome do contato', preview: 'Mensagem', date: '11/05/2020' },
  { id: '11', contact: 'Nome do contato', preview: 'Mensagem', date: '10/05/2020' },
  { id: '12', contact: 'Nome do contato', preview: 'Mensagem', date: '09/05/2020' },
  { id: '13', contact: 'Nome do contato', preview: 'Mensagem', date: '08/05/2020' },
  { id: '14', contact: 'Nome do contato', preview: 'Mensagem', date: '07/05/2020' },
];

type RootStackParamList = {
  Arquivadas: undefined;
  StackConfiguracoes: undefined;
  StackTelaConversas: { chatId: string; chatName: string };
};

export function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleMenuPress = () => {
    navigation.navigate('StackConfiguracoes');
  };

  const handleArquivadas = () => {
    navigation.navigate('Arquivadas');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY > lastScrollY) {
      setShowButton(false);
    } else if (currentScrollY === 0) {
      setShowButton(true);
    }
    setLastScrollY(currentScrollY);
  };

  const renderMessage: ListRenderItem<Message> = ({ item }) => (
    <TouchableOpacity
      style={[baseStyles.chatItem, themeStyles.chatItem]}
      onPress={() => navigation.navigate('StackTelaConversas', { chatId: item.id, chatName: item.contact })}
    >
      <View style={[baseStyles.messageContainer, themeStyles.messageContainer]}>
        <Image style={baseStyles.image} source={{ uri: 'https://via.placeholder.com/50' }} />
        <View style={baseStyles.textContainer}>
          <Text style={[baseStyles.contact, themeStyles.contact]}>{item.contact}</Text>
          <Text style={[baseStyles.preview, themeStyles.preview]}>{item.preview}</Text>
          <Text style={[baseStyles.date, themeStyles.date]}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[baseStyles.container, themeStyles.container]}>
      <View style={[baseStyles.header, themeStyles.header]}>
        <Image source={require('../../Assets/zap1.png')} style={baseStyles.logo} />
        <Text style={[baseStyles.headerText, themeStyles.headerText]}>Home</Text>
        <TouchableOpacity onPress={handleMenuPress} style={baseStyles.menuButton}>
          <Text style={[baseStyles.menuButtonText, themeStyles.menuButtonText]}>⋮</Text>
        </TouchableOpacity>
      </View>
      {showButton && (
        <CustomButton
          buttonStyle={[baseStyles.button, themeStyles.button]}
          textStyle={themeStyles.buttonText}
          title="Arquivadas"
          onPress={handleArquivadas}
        />
      )}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        overScrollMode="never"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={[baseStyles.footer, themeStyles.footer]}>
        <Image style={baseStyles.lockIcon} source={require('../../Assets/cadeado.png')} />
        <Text style={[baseStyles.footerText, themeStyles.footerText]}>
          Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta
        </Text>
      </View>
    </View>
  );
}