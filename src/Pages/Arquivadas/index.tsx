import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme, getThemeStyles } from '../../Components/Tema/themeContext';
import baseStyles from './style'; // Importe seus estilos base

type Message = {
    id: string;
    contact: string;
    preview: string;
    date: string;
};

const messages = [
    { id: '1', contact: '+55 24 99324-0212', preview: 'abraço', date: '14/06/2024' },
    { id: '2', contact: 'Aula 2024', preview: 'Foto', date: '13/06/2024' },
    { id: '3', contact: ':)', preview: 'Você bloqueou esse contato', date: '' },
    { id: '4', contact: '+55 18 8839-1213', preview: 'Áudio', date: '17/05/2020' },
];

type RootStackParamList = {
    Arquivadas: undefined;
    StackConfiguracoes: undefined;
};

const Arquivadas = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { theme } = useTheme();
    const themeStyles = getThemeStyles(theme);

    const handleMenuPress = () => {
        navigation.navigate('StackConfiguracoes');
    };

    const renderMessage: ListRenderItem<Message> = ({ item }) => (
        <View style={baseStyles.messageContainer}>
            <Image style={baseStyles.image} source={{ uri: 'https://via.placeholder.com/50' }} />
            <View style={baseStyles.textContainer}>
                <Text style={[baseStyles.contact, themeStyles.contact]}>{item.contact}</Text>
                <Text style={[baseStyles.preview, themeStyles.preview]}>{item.preview}</Text>
                <Text style={[baseStyles.date, themeStyles.date]}>{item.date}</Text>
            </View>
        </View>
    );

    return (
        <View style={[baseStyles.container, themeStyles.container]}>
            <View style={[baseStyles.header, themeStyles.header]}>
                <Image source={require('../../Assets/zap1.png')} style={baseStyles.logo} />
                <Text style={[baseStyles.headerText, themeStyles.headerText]}>Arquivadas</Text>
                <TouchableOpacity onPress={handleMenuPress} style={baseStyles.menuButton}>
                    <Text style={[baseStyles.menuButtonText, themeStyles.menuButtonText]}>⋮</Text>
                </TouchableOpacity>
            </View>
            <Text style={[baseStyles.info, themeStyles.info]}>Estas conversas permanecem arquivadas quando você recebe novas mensagens. Toque para mudar.</Text>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
            />
            <View style={baseStyles.footer}>
                <Image style={baseStyles.lockIcon} source={require('../../Assets/cadeado.png')} />
                <Text style={[baseStyles.footerText, themeStyles.footerText]}>
                    Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta
                </Text>
            </View>
        </View>
    );
};

export default Arquivadas;