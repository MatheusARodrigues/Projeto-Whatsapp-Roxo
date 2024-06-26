import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AvatarPerfil from '../../Assets/avatar-default.png'; 
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMessages } from '../../Components/Messages/MessageContext';

export function Status() {
  const [searchText, setSearchText] = useState('');
  const { messages, currentUser, fetchUserByPhone } = useMessages();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const isFocused = useIsFocused();

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
    <View style={styles.container}>
      <Text style={styles.title}>Atualizações</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar status"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text style={styles.subtitle}>Status</Text>
      <View style={styles.divider} />
      <View style={styles.StatusContainer}>
        <Image source={profileImage ? { uri: profileImage } : AvatarPerfil} style={styles.StatusAvatar} />
        <View style={styles.StatusInfo}>
          <Text style={styles.StatusText}>Meu Status</Text>
          <Text style={styles.StatusTime}>Toque para atualizar seu status</Text>
        </View>
        <View style={styles.iconsContainer}>
          <FontAwesome
            name="camera"
            size={24}
            color="black"
            style={styles.icon}
          />
          <MaterialIcons
            name="edit"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.divider} />

      <Text style={styles.subtitle2}>ATUALIZAÇÕES RECENTES</Text>
      <View style={styles.divider2} />
      <FlatList
        style={{ height: 400 }}
        horizontal={false}
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.boxArray}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Image source={{ uri: item.imageUri }} style={styles.avatar} />
              <View style={styles.atualizacoesInfo}>
                <Text style={styles.name}>{item.contact}</Text>
                <Text style={styles.time}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.divider3} />
          </View>
        )}
      />
    </View>
  );
}