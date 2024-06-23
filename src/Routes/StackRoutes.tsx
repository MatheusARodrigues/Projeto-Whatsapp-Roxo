import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Login } from '../Pages/Login';
import { DrawerTabsRoutes } from './DrawerTabsRoutes';
import Configuracoes from "../Pages/Configuracoes";
import TelaConversa from '../Pages/TelaConversa';

export type ParametrosDaRota = {
    StackLogin: {name : string};
    StackDrawerPages : {name : string};
    StackConfiguracoes: {name : string};
    StackTelaConversas: {name : string};
}


const Stack= createNativeStackNavigator<ParametrosDaRota>();

export function StackRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='StackLogin'>
                <Stack.Screen name='StackLogin' component={Login}/>
                <Stack.Screen name="StackConfiguracoes" component={Configuracoes} options={{ headerShown: false }} />
                <Stack.Screen name="StackTelaConversas" component={TelaConversa} options={{ headerShown: false }} />
                <Stack.Screen name='StackDrawerPages' component={DrawerTabsRoutes}/>
            </Stack.Navigator>

        </NavigationContainer>
    );
};
