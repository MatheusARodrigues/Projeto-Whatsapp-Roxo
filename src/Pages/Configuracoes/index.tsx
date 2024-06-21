import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import styles from './style';

const Configuracoes = () => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Configurações</Text>
            <Button title="Alterar Tema" onPress={handleThemeChange} />
        </View>
    );
};

export default Configuracoes;