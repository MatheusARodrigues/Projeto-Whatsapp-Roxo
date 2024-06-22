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
    { id: '1', contact: '+55 24 99324-0212', preview: 'Bom dia!', date: '15/06/2024' },
    { id: '2', contact: 'Mensagem automática', preview: 'Reunião marcada para hoje.', date: '15/06/2024' },
    { id: '3', contact: '+55 11 98765-4321', preview: 'Oi, tudo bem?', date: '15/06/2024' },
    { id: '4', contact: '+55 21 99876-5432', preview: 'Boa tarde!', date: '15/06/2024' },
    { id: '5', contact: 'Grupo de família', preview: 'Foto do churrasco de domingo.', date: '14/06/2024' },
    { id: '6', contact: '+55 31 8765-4321', preview: 'E aí, como foi o dia?', date: '14/06/2024' },
    { id: '7', contact: '+55 85 99345-6789', preview: 'Boa noite!', date: '14/06/2024' },
    { id: '8', contact: 'Mãe', preview: 'Liguei para te avisar...', date: '13/06/2024' },
    { id: '9', contact: 'Grupo de trabalho', preview: 'Lembrete: reunião amanhã cedo.', date: '13/06/2024' },
    { id: '10', contact: '+55 47 98765-1234', preview: 'Oi, sumido!', date: '13/06/2024' },
    { id: '11', contact: '+55 54 99876-5432', preview: 'Novo número, me adiciona!', date: '12/06/2024' },
    { id: '12', contact: '+55 61 8765-4321', preview: 'Preciso conversar com você.', date: '12/06/2024' },
    { id: '13', contact: '+55 41 99345-6789', preview: 'Boa viagem!', date: '12/06/2024' },
    { id: '14', contact: '+55 84 98765-4321', preview: 'Feliz aniversário!', date: '11/06/2024' },
    { id: '15', contact: '+55 32 99876-5432', preview: 'Vamos marcar algo?', date: '11/06/2024' },
];

type RootStackParamList = {
    Arquivadas: undefined;
    Configuracoes: undefined;
};

export function Home(){
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
                <Text style={styles.headerText}>Home</Text>   
                <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>⋮</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                overScrollMode="never"
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