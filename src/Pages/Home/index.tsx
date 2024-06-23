import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './style';
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
      style={styles.chatItem}
      onPress={() => navigation.navigate('StackTelaConversas', { chatId: item.id, chatName: item.contact })}
    >
      <View style={styles.messageContainer}>
        <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/50' }} />
        <View style={styles.textContainer}>
          <Text style={styles.contact}>{item.contact}</Text>
          <Text style={styles.preview}>{item.preview}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../Assets/zap1.png')} style={styles.logo} />
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>
      {showButton && (
        <CustomButton
          buttonStyle={styles.button}
          textStyle={{ color: 'black', fontSize: 18 }}
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
        scrollEventThrottle={100000} // Controla a frequência do evento de scroll
      />
      <View style={styles.footer}>
        <Image style={styles.lockIcon} source={require('../../Assets/cadeado.png')} />
        <Text style={styles.footerText}>
          Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta
        </Text>
      </View>
    </View>
  );
}