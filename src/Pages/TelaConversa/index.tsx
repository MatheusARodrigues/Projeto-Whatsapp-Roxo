import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ListRenderItem, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import baseStyles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useMessages } from '../../Components/Messages/MessageContext';

type RootStackParamList = {
  StackTelaConversas: { chatId: string; chatName: string, phone: string, description: string };
};

type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'other';
  type?: 'text' | 'audio';
  audioUri?: string;
};

const TelaConversa = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'StackTelaConversas'>>();
  const { chatId, chatName, phone, description } = route.params;
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  const { updateMessagePreview } = useMessages();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [recordings, setRecordings] = useState<ChatMessage[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadWallpaper();
      loadMessages();
    }, [])
  );

  const loadWallpaper = async () => {
    try {
      const storedWallpaper = await AsyncStorage.getItem('wallpaper');
      setWallpaper(storedWallpaper);
    } catch (error) {
      console.log('Failed to load wallpaper', error);
    }
  };

  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.log('Failed to load messages', error);
    }
  };

  const saveMessages = async (updatedMessages: ChatMessage[]) => {
    try {
      await AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
    } catch (error) {
      console.log('Failed to save messages', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage: ChatMessage = {
        id: Math.random().toString(),
        text: newMessage,
        sender: 'user',
        type: 'text'
      };
      const updatedMessages = [...messages, newChatMessage];
      setMessages(updatedMessages);
      setNewMessage('');
      saveMessages(updatedMessages);
      updateMessagePreview(chatId, newMessage);
    }
  };

  const renderMessage: ListRenderItem<ChatMessage> = ({ item }) => (
    <View style={item.sender === 'user' ? [baseStyles.userMessage, themeStyles.userMessage] : [baseStyles.otherMessage, themeStyles.otherMessage]}>
      {item.type === 'text' ? (
        <Text>{item.text}</Text>
      ) : (
        <TouchableOpacity onPress={() => playAudio(item.audioUri)}>
          <MaterialCommunityIcons name="play" size={24} color={theme === 'dark' ? '#4b0082' : '#935FB4'} />
        </TouchableOpacity>
      )}
    </View>
  );

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;
    
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    if (uri) {
      const newAudioMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: 'user',
        type: 'audio',
        audioUri: uri
      };
      const updatedMessages = [...messages, newAudioMessage];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
      updateMessagePreview(chatId, 'Audio message');
    }
  }

  const playAudio = async (uri?: string) => {
    if (uri) {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    }
  };

  return (
    <View style={[baseStyles.container, themeStyles.container]}>
      {wallpaper && <Image source={{ uri: wallpaper }} style={baseStyles.wallpaper} />}
      <View style={[baseStyles.header, themeStyles.header]}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MaterialCommunityIcons style={themeStyles.seta} name="chevron-left" size={24} color={theme === 'dark' ? '#bb86fc' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('StackPerfil', { name: chatName, phone, description })} style={{ flexDirection: 'row', marginRight: 70, width: '66%' }}>
          <Image source={require('../../Assets/zap1.png')} style={themeStyles.avatar} />
          <Text style={[themeStyles.contactName, themeStyles.headerText]}>{chatName}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('StackConfiguracoes')}>
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
        <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={themeStyles.recordButton}>
          <MaterialCommunityIcons name={recording ? "stop" : "microphone"} size={24} color={theme === 'dark' ? '#bb86fc' : '#4b0082'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage} style={[baseStyles.sendButton, themeStyles.sendButton]}>
          <Text style={themeStyles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TelaConversa;