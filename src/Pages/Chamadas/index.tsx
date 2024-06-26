import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { useTheme, getThemeStyles } from "../../Components/Tema/themeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export function Chamadas() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "StackChamadas">>();
  const { contactName } = route.params || {};
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
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
      } else {
        setCallList([]);
      }
    } catch (error) {
      console.log("Failed to load calls", error);
    }
  };

  const resetCalls = async () => {
    try {
      await AsyncStorage.removeItem("calls");
      Alert.alert("Chamadas resetadas com sucesso");
      loadCalls(); // Recarrega a lista de chamadas após resetar
    } catch (error) {
      console.log("Failed to reset calls", error);
      Alert.alert("Erro ao resetar chamadas");
    }
  };

  const fetchCallsByContact = (contactName: string) => {
    return callList.filter((call) => call.nome === contactName);
  };

  const displayedCalls = contactName
    ? fetchCallsByContact(contactName)
    : callList;

  const renderItem = ({ item }: { item: ChamadasProps }) => (
    <View style={styles.callItem}>
      <Image source={{ uri: item.foto }} style={styles.foto} />
      <View style={styles.callDetails}>
        <Text style={themeStyles.nome}>{item.nome}</Text>
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
    <View style={themeStyles.container}>
      <Text style={themeStyles.subtitle}>Recentes</Text>
      <TouchableOpacity onPress={resetCalls}>
        <MaterialCommunityIcons
          style={themeStyles.lixeiraChamadas}
          name="trash-can-outline"
          size={24}
          color={theme === "dark" ? "#bb86fc" : "#fff"}
        />
      </TouchableOpacity>
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
