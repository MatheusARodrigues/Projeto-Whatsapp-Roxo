import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import CustomButton from '../../Components/Botao/CustomButton';

const Configuracoes = () => {
    const navigation = useNavigation();

    const handleThemeChange = () => {
        Alert.alert(
            "Alterar Tema",
            "Deseja mudar para o tema escuro?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Tema claro mantido"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => console.log("Tema escuro ativado") }
            ]
        );
    };

    const handleWallpaperChange = () => {
        Alert.alert(
            "Alterar Wallpaper",
            "Deseja mudar o wallpaper?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Wallpaper mantido"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => console.log("Wallpaper alterado") }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Configurações</Text>
            <View style={styles.messageContainer}>
                <View style={styles.profileImageContainer}>
                    <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={styles.profileImage}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input1}
                        placeholder="Nome"
                        value="Usuário"
                        editable={false}
                        placeholderTextColor={'#fff'}
                    />
                    <TextInput
                        style={styles.input2}
                        placeholder="Recado"
                        value="O justo é justo🏴‍☠️"
                        editable={false}
                        placeholderTextColor={'#fff'}
                    />
                </View>
            </View>
            <CustomButton buttonStyle={styles.button} textStyle={{ color: 'black', fontSize: 18 }} title="Alterar Tema" onPress={handleThemeChange} />
            <CustomButton buttonStyle={styles.button} textStyle={{ color: 'black', fontSize: 18 }} title="Alterar Wallpaper" onPress={handleWallpaperChange} />
            <CustomButton buttonStyle={styles.button} textStyle={{ color: 'black', fontSize: 18 }} title="Voltar" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default Configuracoes;