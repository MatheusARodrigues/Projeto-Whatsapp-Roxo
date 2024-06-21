import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Arquivadas from '../Pages/Arquivadas';
import Configuracoes from '../Pages/Configuracoes';

const Stack = createStackNavigator();

const StackRoutes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Arquivadas">
                <Stack.Screen name="Arquivadas" component={Arquivadas} options={{ headerShown: false }} />
                <Stack.Screen name="Configuracoes" component={Configuracoes} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackRoutes;