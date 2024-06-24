import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/Botao/CustomButton';
import styles from './style';
import { useTheme } from '../../Components/Tema/themeContext';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Configuracoes = () => {
    const navigation = useNavigation();
    const { toggleTheme } = useTheme();
    const [wallpaper, setWallpaper] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string>('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [name, setName] = useState<string>('Usuário');
    const [recado, setRecado] = useState<string>('O justo é justo🏴‍☠️');
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isEditingRecado, setIsEditingRecado] = useState<boolean>(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const storedName = await AsyncStorage.getItem('name');
            const storedRecado = await AsyncStorage.getItem('recado');
            const storedProfileImage = await AsyncStorage.getItem('profileImage');
            const storedWallpaper = await AsyncStorage.getItem('wallpaper');

            if (storedName) setName(storedName);
            if (storedRecado) setRecado(storedRecado);
            if (storedProfileImage) setProfileImage(storedProfileImage);
            if (storedWallpaper) setWallpaper(storedWallpaper);
        } catch (error) {
            console.log('Failed to load settings', error);
        }
    };

    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('recado', recado);
            await AsyncStorage.setItem('profileImage', profileImage);
            // await AsyncStorage.setItem('wallpaper', wallpaper);
        } catch (error) {
            console.log('Failed to save settings', error);
        }
    };

    const handleThemeChange = () => {
        Alert.alert(
            "Alterar Tema",
            "Deseja mudar o tema?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Tema claro mantido"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => {
                    toggleTheme();
                    console.log("Tema escuro ativado");
                } }
            ]
        );
    };

    const handleWallpaperChange = async () => {
        Alert.alert(
            "Alterar Wallpaper",
            "Deseja mudar o wallpaper?",
            [
                {
                    text: "Remover",
                    onPress: () => {
                        setWallpaper(null);
                        saveSettings();
                    },
                    style: "destructive"
                },
                {
                    text: "Selecionar",
                    onPress: async () => {
                        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

                        if (permissionResult.granted === false) {
                            alert("Permissão para acessar a galeria é necessária!");
                            return;
                        }

                        let pickerResult = await ImagePicker.launchImageLibraryAsync();

                        if (!pickerResult.canceled) {
                            setWallpaper(pickerResult.assets[0].uri);
                            saveSettings();
                            console.log(pickerResult);
                        }
                    }
                }
            ]
        );
    };

    const handleProfileImageChange = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (!pickerResult.canceled) {
            setProfileImage(pickerResult.assets[0].uri);
            saveSettings();
            console.log(pickerResult);
        }
    };

    const handleNameChange = (newName: string) => {
        setName(newName);
        saveSettings();
    };

    const handleRecadoChange = (newRecado: string) => {
        setRecado(newRecado);
        saveSettings();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Configurações</Text>
            <View style={styles.messageContainer}>
                <View style={styles.profileImageWrapper}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    <TouchableOpacity style={styles.cameraIconContainer} onPress={handleProfileImageChange}>
                        <Image source={require('../../Assets/camera-icon.png')} style={styles.cameraIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.editableContainer}>
                        <TextInput
                            style={[styles.input, isEditingName && styles.inputEditable]}
                            placeholder="Nome"
                            value={name}
                            onChangeText={handleNameChange}
                            editable={isEditingName}
                            placeholderTextColor={'#fff'}
                        />
                        <TouchableOpacity onPress={() => setIsEditingName(!isEditingName)}>
                            <Image source={require('../../Assets/edit-icon.png')} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.editableContainer}>
                        <TextInput
                            style={[styles.input, isEditingRecado && styles.inputEditable]}
                            placeholder="Recado"
                            value={recado}
                            onChangeText={handleRecadoChange}
                            editable={isEditingRecado}
                            placeholderTextColor={'#fff'}
                        />
                        <TouchableOpacity onPress={() => setIsEditingRecado(!isEditingRecado)}>
                            <Image source={require('../../Assets/edit-icon.png')} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {wallpaper && <Image source={{ uri: wallpaper }} style={{ width: 300, height: 400, marginBottom: 20 }} />}
            <CustomButton buttonStyle={styles.button} textStyle={{ color: 'black', fontSize: 18 }} title="Alterar Tema" onPress={handleThemeChange} />
            <CustomButton buttonStyle={styles.button} textStyle={{ color: 'black', fontSize: 18 }} title="Alterar Wallpaper" onPress={handleWallpaperChange} />
            <CustomButton buttonStyle={styles.button} textStyle={{ color: 'black', fontSize: 18 }} title="Voltar" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default Configuracoes;