import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import baseStyles from './style';

type Message = {
  id: string;
  contact: string;
  preview: string;
  date: string;
};

type RootStackParamList = {
  Home: { archivedMessages: Message[], unarchivedMessage?: Message };
  Arquivadas: { archivedMessages: Message[] };
  StackConfiguracoes: undefined;
  StackTelaConversas: { chatId: string; chatName: string };
};

const Arquivadas = ({ route }: { route: RouteProp<RootStackParamList, 'Arquivadas'> }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>(route.params?.archivedMessages || []);

  useEffect(() => {
    if (route.params?.archivedMessages) {
      setArchivedMessages(route.params.archivedMessages);
    }
  }, [route.params?.archivedMessages]);

  const handleMenuPress = () => {
    navigation.navigate('StackConfiguracoes');
  };

  const handleUnarchive = (messageId: string) => {
    const messageToUnarchive = archivedMessages.find((msg) => msg.id === messageId);
    if (messageToUnarchive) {
      setArchivedMessages((prevArchivedMessages) => prevArchivedMessages.filter((msg) => msg.id !== messageId));
      navigation.navigate('Home', { archivedMessages: archivedMessages.filter((msg) => msg.id !== messageId), unarchivedMessage: messageToUnarchive });
    }
  };

  const renderMessage: ListRenderItem<Message> = ({ item }) => (
    <View style={[baseStyles.chatItem, themeStyles.chatItem]}>
      <TouchableOpacity
        style={[baseStyles.messageContainer, themeStyles.messageContainer]}
        onPress={() => navigation.navigate('StackTelaConversas', { chatId: item.id, chatName: item.contact })}
      >
        <Image style={baseStyles.image} source={{ uri: 'https://via.placeholder.com/50' }} />
        <View style={baseStyles.textContainer}>
          <Text style={[baseStyles.contact, themeStyles.contact]}>{item.contact}</Text>
          <Text style={[baseStyles.preview, themeStyles.preview]}>{item.preview}</Text>
          <Text style={[baseStyles.date, themeStyles.date]}>{item.date}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleUnarchive(item.id)}>
        <Image style={themeStyles.unarchiveButton} source={require('../../Assets/desarquivar.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[baseStyles.container, themeStyles.container]}>
      <View style={[baseStyles.header, themeStyles.header]}>
        <Image source={require('../../Assets/zap1.png')} style={baseStyles.logo} />
        <Text style={[baseStyles.headerText, themeStyles.headerText]}>Arquivadas</Text>
        <TouchableOpacity onPress={handleMenuPress} style={baseStyles.menuButton}>
          <Text style={[baseStyles.menuButtonText, themeStyles.menuButtonText]}>⋮</Text>
        </TouchableOpacity>
      </View>
      <Text style={themeStyles.archivedMessageInfo}>
        Estas conversas permanecem arquivadas quando você recebe novas mensagens. Toque para mudar.
      </Text>
      <FlatList
        data={archivedMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
      />
      <View style={[baseStyles.footer, themeStyles.footer]}>
        <Image style={baseStyles.lockIcon} source={require('../../Assets/cadeado.png')} />
        <Text style={[baseStyles.footerText, themeStyles.footerText]}>
          Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta
        </Text>
      </View>
    </View>
  );
};

export default Arquivadas;