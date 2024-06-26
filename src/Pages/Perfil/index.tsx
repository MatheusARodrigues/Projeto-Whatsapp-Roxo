import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import { useMessages } from "../../Components/Messages/MessageContext";
import { ModalReport } from "../../Components/ModalComponent/ModalReport";

type RootStackParamList = {
  StackPerfil: {
    name: string;
    phone: string;
    description: string;
    imageUri: string;
  };
};

type PerfilRouteProp = RouteProp<RootStackParamList, "StackPerfil">;

export function Perfil() {
  const route = useRoute<PerfilRouteProp>();
  const { name, phone, description, imageUri } = route.params;
  const navigation = useNavigation();
  const { theme} = useTheme();
  const themeStyles = getThemeStyles(theme);
  const { updateMessagePreview, getAvatarImage } = useMessages();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleReportSelect = (reason: string) => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={themeStyles.containerPerfil} overScrollMode="never">
      <View style={themeStyles.perfilContainer}>
        <View style={themeStyles.perfilLeave}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={35} color={theme === 'dark' ? '#bb86fc' : '#4b0082'} />
          </TouchableOpacity>
          <Image
            source={{
              uri: getAvatarImage(phone) || "https://via.placeholder.com/50",
            }}
            style={themeStyles.perfilImage}
          />
        </View>
        <Text style={themeStyles.profileName}>{name}</Text>
        <Text style={themeStyles.profilePhone}>{phone}</Text>
      </View>
      <View style={themeStyles.sectionContainer}>
        <Text style={themeStyles.profileDescription}>{description}</Text>
      </View>
      <View style={themeStyles.sectionContainer}>
        <Text style={themeStyles.sectionTitle}>Mídia, Links e Docs</Text>
        <TouchableOpacity style={themeStyles.sectionButton}>
          <Text style={themeStyles.sectionButtonText}>Ver tudo</Text>
        </TouchableOpacity>
      </View>

      <View style={themeStyles.sectionContainer}>
        <TouchableOpacity style={themeStyles.actionButton}>
          <Text style={themeStyles.actionButtonText}>Criar grupo com {name}</Text>
        </TouchableOpacity>
      </View>

      <View style={themeStyles.sectionContainerBlock}>
        <TouchableOpacity style={[themeStyles.actionButton, themeStyles.blockButton]}>
          <MaterialCommunityIcons name="block-helper" size={22} color={"red"} />
          <Text style={[themeStyles.actionButtonText, themeStyles.blockButtonText]}>
            Bloquear {name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[themeStyles.actionButton, themeStyles.reportButton]} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="alert" size={22} color={"red"} />
          <Text style={[themeStyles.actionButtonText, themeStyles.reportButtonText]}>
            Denunciar {name}
          </Text>
        </TouchableOpacity>
      </View>
      <ModalReport
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelectReason={handleReportSelect}
        name={name}
      />
    </ScrollView>
  );
}
