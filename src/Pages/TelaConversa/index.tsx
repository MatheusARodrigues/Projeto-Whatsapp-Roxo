import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ListRenderItem, Image, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import baseStyles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useMessages } from '../../Components/Messages/MessageContext';
import { useAuth } from '../../Hooks/useAuth';

type RootStackParamList = {
  StackTelaConversas: { chatId: string; chatName: string; phone: string };
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
  const { chatId, chatName, phone } = route.params;
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  const { updateMessagePreview, getAvatarImage, fetchUserByPhone, currentUser } = useMessages();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [recordings, setRecordings] = useState<ChatMessage[]>([]);

  const { setModalOpen, modalOpen } = useAuth();

  const resetMessages = async () => {
    try {
      await AsyncStorage.removeItem(`messages_${chatId}`);
      setMessages([]);
      Alert.alert("Mensagens resetadas com sucesso");
    } catch (error) {
      console.log('Failed to reset messages', error);
      Alert.alert("Erro ao resetar mensagens");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
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

      loadWallpaper();
      loadMessages();

      const intervalId = setInterval(() => {
        loadWallpaper();
      }, 1000);

      return () => clearInterval(intervalId);
    }, [])
  );

  useEffect(() => {
    fetchUserByPhone(phone);
  }, [phone]);

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

  const handleProfilePress = async () => {
    await fetchUserByPhone(phone);
    if (currentUser) {
      navigation.navigate('StackPerfil', {
        name: currentUser.contact,
        phone: currentUser.phone,
        description: currentUser.description,
      });
    } else {
      Alert.alert('Erro', 'Dados do usuário não encontrados.');
    }
  };

  const handleCall = async () => {
    Alert.alert("Ligando", `Ligando para ${chatName}`);
    const newCall = {
      id: Math.random().toString(),
      nome: chatName,
      foto: getAvatarImage(phone) || 'https://via.placeholder.com/50',
      hora: new Date().toLocaleTimeString(),
      tipo: "feita"
    };
    const storedCalls = await AsyncStorage.getItem('calls');
    const callList = storedCalls ? JSON.parse(storedCalls) : [];
    callList.push(newCall);
    await AsyncStorage.setItem('calls', JSON.stringify(callList));
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
        <TouchableOpacity onPress={handleProfilePress} style={baseStyles.contactProfile}>
          <Image style={themeStyles.avatar} source={{ uri: getAvatarImage(phone) || 'https://via.placeholder.com/50' }} />
          <Text style={[themeStyles.contactName, themeStyles.headerText]}>{chatName}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCall}>
          <MaterialCommunityIcons style={themeStyles.chamada} name="phone" size={24} color={theme === 'dark' ? '#bb86fc' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
          <MaterialCommunityIcons style={themeStyles.pontos} name="dots-vertical" size={24} color={theme === 'dark' ? '#bb86fc' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={resetMessages}>
          <MaterialCommunityIcons style={themeStyles.lixeira} name="trash-can-outline" size={24} color={theme === 'dark' ? '#bb86fc' : '#fff'} />
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
          placeholder="Digite sua mensagem..."
          placeholderTextColor={theme === 'dark' ? '#f0f0f0' : '#888'}
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={themeStyles.recordButton}>
          <MaterialCommunityIcons name={recording ? "stop" : "microphone"} size={24} color={theme === 'dark' ? '#bb86fc' : '#4b0082'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage} style={themeStyles.sendButton}>
          <MaterialCommunityIcons name="send" size={24} color={theme === 'dark' ? '#bb86fc' : '#4b0082'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TelaConversa;