import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import { useMessages } from '../../Components/Messages/MessageContext';
import baseStyles from './style';

const Arquivadas = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const { archivedMessages, unarchiveMessage, getAvatarImage } = useMessages();

  const handleMenuPress = () => {
    navigation.navigate('StackConfiguracoes');
  };

  const renderMessage: ListRenderItem<Message> = ({ item }) => {
    const avatarUrl = getAvatarImage(item.phone);

    return (
      <View style={[baseStyles.chatItem, themeStyles.chatItem]}>
        <TouchableOpacity
          style={[baseStyles.messageContainer, themeStyles.messageContainer]}
          onPress={() => navigation.navigate('StackTelaConversas', { chatId: item.id, chatName: item.contact, phone: item.phone, description: item.description, imageUri: avatarUrl })}
        >
          <Image style={baseStyles.image} source={{ uri: avatarUrl || 'https://via.placeholder.com/50' }} />
          <View style={baseStyles.textContainer}>
            <Text style={[baseStyles.contact, themeStyles.contact]}>{item.contact}</Text>
            <Text style={[baseStyles.preview, themeStyles.preview]}>{item.preview}</Text>
            <Text style={[baseStyles.date, themeStyles.date]}>{item.date}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => unarchiveMessage(item.id)}>
          <Image style={themeStyles.unarchiveButton} source={require('../../Assets/desarquivar.png')} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[baseStyles.container, themeStyles.container]}>
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