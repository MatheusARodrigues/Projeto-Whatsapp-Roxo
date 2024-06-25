import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";

interface ChamadasProps {
  id: string;
  nome: string;
  foto: string;
  hora: string;
  tipo: "recebida" | "feita";
}

const chamadas: ChamadasProps[] = [
  {
    id: "1",
    nome: "Erick F",
    foto: "https://randomuser.me/api/portraits/men/1.jpg",
    hora: "Today, 10:00 AM",
    tipo: "recebida",
  },
  {
    id: "2",
    nome: "Erica F",
    foto: "https://randomuser.me/api/portraits/women/1.jpg",
    hora: "Yesterday, 5:00 PM",
    tipo: "feita",
  },
];

export function Chamadas() {
  const renderItem = ({ item }: { item: ChamadasProps }) => (
    <View style={styles.callItem}>
      <Image source={{ uri: item.foto }} style={styles.foto} />
      <View style={styles.callDetails}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.hora}>{item.hora}</Text>
      </View>
      <Ionicons
        name={
          item.tipo === "recebida" ? "call" : "call"
        }
        size={24}
        color={item.tipo === "recebida" ? "red" : "green"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chamadas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

export default Chamadas;
