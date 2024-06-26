import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { useNavigation, useRoute, RouteProp, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ChamadasProps {
  id: string;
  nome: string;
  foto: string;
  hora: string;
  tipo: "recebida" | "feita";
}

type RootStackParamList = {
  StackChamadas: { contactName?: string; contactPhone?: string };
};

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
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "StackChamadas">>();
  const { contactName } = route.params || {};
  const [callList, setCallList] = useState<ChamadasProps[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadCalls();
    }, [])
  );

  const loadCalls = async () => {
    try {
      const storedCalls = await AsyncStorage.getItem("calls");
      if (storedCalls) {
        setCallList(JSON.parse(storedCalls));
      }
    } catch (error) {
      console.log("Failed to load calls", error);
    }
  };

  const fetchCallsByContact = (contactName: string) => {
    return callList.filter(call => call.nome === contactName);
  };

  const displayedCalls = contactName ? fetchCallsByContact(contactName) : callList;

  const renderItem = ({ item }: { item: ChamadasProps }) => (
    <View style={styles.callItem}>
      <Image source={{ uri: item.foto }} style={styles.foto} />
      <View style={styles.callDetails}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.hora}>{item.hora}</Text>
      </View>
      <Ionicons
        name={item.tipo === "recebida" ? "call" : "call"}
        size={24}
        color={item.tipo === "recebida" ? "red" : "green"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Recentes</Text>
      <FlatList
        data={displayedCalls}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

export default Chamadas;