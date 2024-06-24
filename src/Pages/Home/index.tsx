import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation, NavigationProp, useIsFocused, RouteProp } from '@react-navigation/native';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import baseStyles from './style';
import CustomButton from '../../Components/Botao/CustomButton';

type Message = {
  id: string;
  contact: string;
  preview: string;
  date: string;
  description: string;
  phone: string;
};

const initialMessages: Message[] = [
  { id: '1', contact: '+55 24 99324-0212', phone: '+55 24 99324-0212', preview: 'Bom dia!', date: '15/06/2024', description: 'Apaixonada por viagens e fotografia 📸🌍. Sempre buscando novas aventuras e memórias! Siga meu Instagram para ver minhas últimas fotos e histórias: @mariasilva. Disponível para colaborações e parcerias - entre em contato!'},
  { id: '2', contact: 'Aula 2024', phone: '+55 24 99324-2012', preview: 'Foto', date: '14/06/2024', description: 'Engenheiro de software 💻 e gamer nas horas vagas 🎮. Amante de tecnologia e inovação, curioso sobre IA e desenvolvimento de apps. Me siga no Twitter para atualizações sobre projetos: @joaosouza_dev.'},
  { id: '3', contact: ':)', phone: '+55 24 99324-0212', preview: 'Você bloqueou esse contato', date: '', description: 'esigner gráfico e artista digital 🎨. Transformando ideias em realidade visual. Adoro trabalhar com cores, formas e tipografia.' },
  { id: '4', contact: '+55 18 8839-1213', phone: '+55 18 8839-1213', preview: 'Áudio', date: '17/05/2020', description: 'Chef de cozinha 🍳 e amante de comida 🍕🍣. Explorando sabores e criando receitas únicas. Compartilho dicas culinárias e receitas no meu blog.' },
];

type RootStackParamList = {
  Home: { archivedMessages: Message[], unarchivedMessage?: Message };
  Arquivadas: { archivedMessages: Message[] };
  StackConfiguracoes: undefined;
  StackTelaConversas: { chatId: string, chatName: string, phone: string, description: string };
};

export function Home({ route }: { route: RouteProp<RootStackParamList, 'Home'> }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>(route.params?.archivedMessages || []);
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isFocused) {
      const updatedArchivedMessages = route.params?.archivedMessages || [];
      setArchivedMessages(updatedArchivedMessages);

      const unarchivedMessage = route.params?.unarchivedMessage;
      if (unarchivedMessage) {
        setMessages((prevMessages) => [...prevMessages, unarchivedMessage]);
        setArchivedMessages((prevArchivedMessages) =>
          prevArchivedMessages.filter((msg) => msg.id !== unarchivedMessage.id)
        );
      }
    }
  }, [isFocused, route.params]);

  const handleMenuPress = () => {
    navigation.navigate('StackConfiguracoes');
  };

  const handleArquivadas = () => {
    navigation.navigate('Arquivadas', { archivedMessages });
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

  const handleArchive = (messageId: string) => {
    const messageToArchive = messages.find((msg) => msg.id === messageId);
    if (messageToArchive) {
      setArchivedMessages((prevArchivedMessages) => [...prevArchivedMessages, messageToArchive]);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
    }
  };

  const renderMessage: ListRenderItem<Message> = ({ item }) => (
    <View style={[baseStyles.chatItem, themeStyles.chatItem]}>
      <TouchableOpacity
        style={[baseStyles.messageContainer, themeStyles.messageContainer]}
        onPress={() => navigation.navigate('StackTelaConversas', { chatId: item.id, chatName: item.contact, phone: item.phone, description: item.description })}
      >
        <Image style={baseStyles.image} source={{ uri: 'https://via.placeholder.com/50' }} />
        <View style={baseStyles.textContainer}>
          <Text style={[baseStyles.contact, themeStyles.contact]}>{item.contact}</Text>
          <Text style={[baseStyles.preview, themeStyles.preview]}>{item.preview}</Text>
          <Text style={[baseStyles.date, themeStyles.date]}>{item.date}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleArchive(item.id)}>
        <Image style={themeStyles.archiveButton} source={require('../../Assets/arquivar.png')} />
      </TouchableOpacity>
    </View>
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