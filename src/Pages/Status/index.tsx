import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AvatarPerfil from '../../Assets/avatar-default.png'; 

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMessages } from '../../Components/Messages/MessageContext';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';


export function Status() {
  const [searchText, setSearchText] = useState('');
  const { messages, currentUser, fetchUserByPhone } = useMessages();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const isFocused = useIsFocused();
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserByPhone('user_phone_number');
      loadProfileImage();
    }, [])
  );

  const loadProfileImage = async () => {
    try {
      const storedImageUri = await AsyncStorage.getItem('profileImage');
      if (storedImageUri) {
        setProfileImage(storedImageUri);
      }
    } catch (error) {
      console.log('Failed to load profile image', error);
    }
  };

  const filteredMessages = messages.filter(item =>
    item.contact.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={themeStyles.container}>
      <Text style={themeStyles.title}>Atualizações</Text>
      <TextInput
        style={themeStyles.searchBar}
        placeholder="Pesquisar status"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text style={themeStyles.subtitleStatus}>Status</Text>
      <View style={themeStyles.divider} />
      <View style={themeStyles.StatusContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : AvatarPerfil}
          style={themeStyles.StatusAvatar}
        />
        <View style={themeStyles.StatusInfo}>
          <Text style={themeStyles.StatusText}>Meu Status</Text>
          <Text style={themeStyles.StatusTime}>
            Toque para atualizar seu status
          </Text>
        </View>
        <View style={themeStyles.iconsContainer}>
          <FontAwesome
            name="camera"
            size={24}
            color={theme === "dark" ? "#4b0082" : "#935FB4"}
            style={themeStyles.icon}
          />
          <MaterialIcons
            name="edit"
            size={24}
            color={theme === "dark" ? "#4b0082" : "#935FB4"}
            style={themeStyles.icon}
          />
        </View>
      </View>
      <View style={themeStyles.divider} />

      <Text style={themeStyles.subtitleStatus2}>ATUALIZAÇÕES RECENTES</Text>
      <View style={themeStyles.divider2} />
      <FlatList
        style={{ height: 400 }}
        horizontal={false}
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={themeStyles.boxArray}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Image
                source={{ uri: item.imageUri }}
                style={themeStyles.avatarStatus}
              />
              <View style={themeStyles.atualizacoesInfo}>
                <Text style={themeStyles.name}>{item.contact}</Text>
                <Text style={themeStyles.time}>{item.date}</Text>
              </View>
            </View>
            <View style={themeStyles.divider3} />
          </View>
        )}
      />
    </View>
  );
}