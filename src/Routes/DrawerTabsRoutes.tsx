import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../Pages/Home";
import React from "react";
import Status from "../Pages/Status";
import { Chamadas } from "../Pages/Chamadas";
import Arquivadas from "../Pages/Arquivadas";
import Configuracoes from "../Pages/Configuracoes";


const Drawer = createDrawerNavigator();

export function DrawerTabsRoutes(){
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Status" component={Status}/>
            <Drawer.Screen name="Chamadas" component={Chamadas}/>
            <Drawer.Screen name="Arquivadas" component={Arquivadas}/>
            <Drawer.Screen name="Configurações" component={Configuracoes}/>
        </Drawer.Navigator>
    )
}