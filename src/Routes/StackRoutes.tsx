import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Login } from '../Pages/Login';
import { DrawerTabsRoutes } from './DrawerTabsRoutes';

export type ParametrosDaRota = {
    StackLogin: {name : string};
    StackDrawerPages : {name : string};
}


const Stack= createNativeStackNavigator<ParametrosDaRota>();

export function StackRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='StackLogin'>
                <Stack.Screen name='StackLogin' component={Login}/>
                <Stack.Screen name='StackDrawerPages' component={DrawerTabsRoutes}/>
            </Stack.Navigator>

        </NavigationContainer>
    );
};
