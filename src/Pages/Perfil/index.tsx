import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';

type RootStackParamList = {
  StackPerfil: { name: string; phone: string; description: string };
};

type PerfilRouteProp = RouteProp<RootStackParamList, 'StackPerfil'>;

export function Perfil(){
  const route = useRoute<PerfilRouteProp>();
  const { name, phone, description } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container} overScrollMode="never">
      <View style={styles.profileContainer}>
        <View style={styles.profileLeave}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={35}/>
        </TouchableOpacity>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        </View>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profilePhone}>{phone}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.profileDescription}>{description}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Mídia, Links e Docs</Text>
        <TouchableOpacity style={styles.sectionButton}>
          <Text style={styles.sectionButtonText}>Ver tudo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Criar grupo com {name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainerBlock}>
        <TouchableOpacity style={[styles.actionButton, styles.blockButton]}>
          <Text style={[styles.actionButtonText, styles.blockButtonText]}>Bloquear {name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.reportButton]}>
          <Text style={[styles.actionButtonText, styles.reportButtonText]}>Denunciar {name}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};