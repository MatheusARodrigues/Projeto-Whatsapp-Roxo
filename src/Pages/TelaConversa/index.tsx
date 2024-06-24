import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ListRenderItem, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import baseStyles from './style';
import CustomButton from '../../Components/Botao/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  StackTelaConversas: { chatId: string; chatName: string };
};

type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'other';
};

const TelaConversa = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'StackTelaConversas'>>();
  const { chatId, chatName } = route.params;
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: 'Olá, como você está?', sender: 'other' },
    { id: '2', text: 'Estou bem, obrigado!', sender: 'user' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    loadWallpaper();
  }, []);

  const loadWallpaper = async () => {
    try {
      const storedWallpaper = await AsyncStorage.getItem('wallpaper');
      setWallpaper(storedWallpaper); // Atualiza o estado para null se não houver wallpaper
    } catch (error) {
      console.log('Failed to load wallpaper', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage: ChatMessage = {
        id: Math.random().toString(),
        text: newMessage,
        sender: 'user',
      };
      setMessages([...messages, newChatMessage]);
      setNewMessage('');
    }
  };

  const renderMessage: ListRenderItem<ChatMessage> = ({ item }) => (
    <View style={item.sender === 'user' ? [baseStyles.userMessage, themeStyles.userMessage] : [baseStyles.otherMessage, themeStyles.otherMessage]}>
      <Text>{item.text}</Text>
    </View>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    navigation.navigate('StackConfiguracoes');
  };

  return (
    <View style={[baseStyles.container, themeStyles.container]}>
      {wallpaper && <Image source={{ uri: wallpaper }} style={baseStyles.wallpaper} />}
      <View style={[baseStyles.header, themeStyles.header]}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialCommunityIcons style={themeStyles.seta} name="chevron-left" size={24} color={theme === 'dark' ? '#bb86fc' : '#fff'} />
        </TouchableOpacity>
        <Image
          source={require('../../Assets/zap1.png')}
          style={themeStyles.avatar}
        />
        <Text style={[themeStyles.contactName, themeStyles.headerText]}>{chatName}</Text>
        <TouchableOpacity onPress={handleMenuPress}>
          <MaterialCommunityIcons style={themeStyles.pontos} name="dots-vertical" size={24} color={theme === 'dark' ? '#bb86fc' : '#fff'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
      />
      <View style={[baseStyles.inputContainer, themeStyles.inputContainer]}>
        <TextInput
          style={[baseStyles.textInput, themeStyles.textInput]}
          placeholder="Digite uma mensagem"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <CustomButton
          buttonStyle={[baseStyles.sendButton, themeStyles.sendButton]}
          textStyle={themeStyles.sendButtonText}
          title="Enviar"
          onPress={handleSendMessage}
        />
      </View>
    </View>
  );
};

export default TelaConversa;