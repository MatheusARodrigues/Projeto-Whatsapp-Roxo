import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './style';

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
    Configuracoes: undefined;
};

const Arquivadas = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const handleMenuPress = () => {
        navigation.navigate('Configuracoes');
    };

    const renderMessage: ListRenderItem<Message> = ({ item }) => (
        <View style={styles.messageContainer}>
            <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/50' }} />
            <View style={styles.textContainer}>
                <Text style={styles.contact}>{item.contact}</Text>
                <Text style={styles.preview}>{item.preview}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Image source={require('../../Assets/logo.png')} style={styles.logo} />
                <Text style={styles.headerText}>Arquivadas</Text>   
                <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>⋮</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.info}>Estas conversas permanecem arquivadas quando você recebe novas mensagens. Toque para mudar.</Text>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
            />
            <View style={styles.footer}>
                <Image style={styles.lockIcon} source={require('../../Assets/cadeado.png')} />
                <Text style={styles.footerText}>
                    Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta
                </Text>
            </View>
        </View>
    );
};

export default Arquivadas;