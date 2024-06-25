import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import { useMessages } from '../../Components/Messages/MessageContext';
import baseStyles from './style';
import CustomButton from '../../Components/Botao/CustomButton';

export function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const { messages, archivedMessages, archiveMessage } = useMessages();
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isFocused) {

    }
  }, [isFocused]);

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
    <View style={[baseStyles.chatItem, themeStyles.chatItem]}>
      <TouchableOpacity
        style={[baseStyles.messageContainer, themeStyles.messageContainer]}
        onPress={() => navigation.navigate('StackTelaConversas', { chatId: item.id, chatName: item.contact, phone: item.phone, description: item.description })}
      >
        <Image style={baseStyles.image} source={{ uri: item.imageUri }} />
        <View style={baseStyles.textContainer}>
          <Text style={[baseStyles.contact, themeStyles.contact]}>{item.contact}</Text>
          <Text style={[baseStyles.preview, themeStyles.preview]}>{item.preview}</Text>
          <Text style={[baseStyles.date, themeStyles.date]}>{item.date}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => archiveMessage(item.id)}>
        <Image style={themeStyles.archiveButton} source={require('../../Assets/arquivar.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[baseStyles.container, themeStyles.container]}>
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