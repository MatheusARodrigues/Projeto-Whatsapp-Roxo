import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text, FlatList, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import styles from './style';

type Message = {
  id: number;
  text: string;
};

type RootStackParamList = {
  StackTelaConversas: { chatId: string; chatName: string };
  StackConfiguracoes: undefined;
};

const TelaConversa: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'StackTelaConversas'>>();
  const { chatName } = route.params;

  const handleSend = () => {
    if (inputValue.trim() === '') {
      Alert.alert('Erro', 'Digite uma mensagem antes de enviar.');
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const handleMenuPress = () => {
    navigation.navigate('StackConfiguracoes');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons style={styles.seta} name="chevron-left" />
        </TouchableOpacity>
        <Image
          source={require('../../Assets/zap1.png')} 
          style={styles.avatar}
        />
        <TouchableOpacity onPress={handleMenuPress}>
          <MaterialCommunityIcons style={styles.pontos} name="dots-vertical" />
        </TouchableOpacity>
        <Text style={styles.contactName}>{chatName}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TelaConversa;