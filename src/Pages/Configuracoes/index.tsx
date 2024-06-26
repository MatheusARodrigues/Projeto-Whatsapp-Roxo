import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/Botao/CustomButton';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useAuth } from '../../Hooks/useAuth';

const Configuracoes = () => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();
    const themeStyles = getThemeStyles(theme);
    const [profileImage, setProfileImage] = useState<string>('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [name, setName] = useState<string>('Usuário');
    const [recado, setRecado] = useState<string>('O justo é justo🏴‍☠️');
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isEditingRecado, setIsEditingRecado] = useState<boolean>(false);
    const [wallpaper, setWallpaper] = useState<string | null>(null);
    const {modalOpen, setModalOpen} = useAuth();

    useEffect(() => {
        loadSettings();
        //removeSettings();
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

    // const removeSettings = async () => {
    // const storedName = await AsyncStorage.removeItem('name');
    // const storedRecado = await AsyncStorage.removeItem('recado');
    // };
    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('recado', recado);
            await AsyncStorage.setItem('profileImage', profileImage);
            if (wallpaper) {
                await AsyncStorage.setItem('wallpaper', wallpaper);
            } else {
                await AsyncStorage.removeItem('wallpaper');
            }
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

    const handleWallpaperChange = () => {
        Alert.alert(
            "Alterar Wallpaper",
            "Deseja mudar o wallpaper?",
            [
                {
                    text: "Remover",
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('wallpaper');
                            setWallpaper(null);
                        } catch (error) {
                            console.log('Failed to remove wallpaper', error);
                        }
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
                            const uri = pickerResult.assets[0].uri;
                            setWallpaper(uri);
                            try {
                                await AsyncStorage.setItem('wallpaper', uri);
                            } catch (error) {
                                console.log('Falha ao salvar', error);
                            }
                            console.log(pickerResult);
                        }
                    }
                }
            ]
        );
    };

    const handleProfileImageChange = () => {
        Alert.alert(
            "Alterar Foto de Perfil",
            "Deseja mudar a foto de perfil?",
            [
                {
                    text: "Remover",
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('profileImage');
                            setProfileImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
                        } catch (error) {
                            console.log('Failed to remove profile image', error);
                        }
                    },
                    style: "destructive"
                },
                {
                    text: "Não",
                    onPress: () => console.log("Ação cancelada"),
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: async () => {
                        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
                        if (permissionResult.granted === false) {
                            alert("Permissão para acessar a galeria é necessária!");
                            return;
                        }
    
                        let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
                        if (!pickerResult.canceled) {
                            try {
                                const imageUri = pickerResult.assets[0].uri;
                                await AsyncStorage.setItem('profileImage', imageUri);
                                setProfileImage(imageUri);
                                console.log(pickerResult);
                            } catch (error) {
                                console.log('Failed to save profile image', error);
                            }
                        }
                    }
                }
            ]
        );
    };


    useEffect(() => {
        const loadProfileImage = async () => {
            try {
                const storedImageUri = await AsyncStorage.getItem('profileImage');
                if (storedImageUri) {
                    setProfileImage(storedImageUri);
                } else {
                    setProfileImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
                }
            } catch (error) {
                console.log('Failed to load profile image', error);
            }
        };
    
        loadProfileImage();
    }, []);



    const handleNameChange = (newName: string) => {
        setName(newName);
        saveSettings();
    };

    const handleRecadoChange = (newRecado: string) => {
        setRecado(newRecado);
        saveSettings();
    };

    return (
        <View style={[styles.container, themeStyles.container]}>
            {wallpaper && <Image source={{ uri: wallpaper }} style={styles.wallpaper} />}
            <Text style={[styles.header, themeStyles.headerConfigText]}>Configurações</Text>
            <View style={styles.messageContainer}>
                <View style={styles.profileImageWrapper}>
                    <Image source={{ uri: profileImage }} style={[styles.profileImage, themeStyles.profileImage]} />
                    <TouchableOpacity style={styles.cameraIconContainer} onPress={handleProfileImageChange}>
                        <Image source={require('../../Assets/camera-icon.png')} style={styles.cameraIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.editableContainer}>
                        <TextInput
                            style={[styles.input, isEditingName && styles.inputEditable, themeStyles.textInput]}
                            placeholder="Nome"
                            value={name}
                            onChangeText={handleNameChange}
                            editable={isEditingName}
                            placeholderTextColor={theme === 'dark' ? '#ccc' : '#000'}
                        />
                        <TouchableOpacity onPress={() => setIsEditingName(!isEditingName)}>
                        <MaterialCommunityIcons name="draw" size={24} color={theme === 'dark' ? '#4b0082' : '#935FB4'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.editableContainer}>
                        <TextInput
                            style={[styles.input, isEditingRecado && styles.inputEditable, themeStyles.textInput]}
                            placeholder="Recado"
                            value={recado}
                            onChangeText={handleRecadoChange}
                            editable={isEditingRecado}
                            placeholderTextColor={theme === 'dark' ? '#ccc' : '#000'}
                        />
                        <TouchableOpacity onPress={() => setIsEditingRecado(!isEditingRecado)}>
                        <MaterialCommunityIcons name="draw" size={24} color={theme === 'dark' ? '#4b0082' : '#935FB4'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <CustomButton buttonStyle={themeStyles.buttonConfig} textStyle={themeStyles.buttonText} title="Alterar Tema" onPress={handleThemeChange} />
            <CustomButton buttonStyle={ themeStyles.buttonConfig} textStyle={themeStyles.buttonText} title="Alterar Wallpaper" onPress={handleWallpaperChange} />
            <CustomButton buttonStyle={ themeStyles.buttonConfig} textStyle={themeStyles.buttonText} title="Voltar" onPress={() => setModalOpen(!modalOpen)} />
        </View>
    );
};

export default Configuracoes;