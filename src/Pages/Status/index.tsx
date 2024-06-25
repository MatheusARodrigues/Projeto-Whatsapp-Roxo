import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import  AvatarPerfil  from '../../Assets/avatar-default.png'; 
import { styles } from './style';

export function Status() {

  // const [data, setData] = useState([]);    
  // const navigation = useNavigation();
  // const isFocused = useIsFocused();

  const atualizacoes = [
    {
      id: "1",
      name: "Patricia",
      time: "15 minutes ago",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Juju",
      time: "30 minutes ago",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Eduardo",
      time: "1 hour ago",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      name: ":)",
      time: "2 hours ago",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "5",
      name: "Aula 2024",
      time: "3 hours ago",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizações</Text>
      <Text style={styles.subtitle}>Status</Text>
      <View style={styles.divider} />
      <View style={styles.StatusContainer}>
        <Image source={ AvatarPerfil } style={styles.StatusAvatar} />
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
        data={atualizacoes}
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
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={styles.atualizacoesInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.divider3} />
          </View>
        )}
      />
    </View>
  );
}