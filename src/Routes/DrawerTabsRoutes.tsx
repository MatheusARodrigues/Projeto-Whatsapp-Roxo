
import "react-native-gesture-handler";
import { DrawerToggleButton, createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../Pages/Home";
import React from "react";
import Status from "../Pages/Status";
import { Chamadas } from "../Pages/Chamadas";
import Arquivadas from "../Pages/Arquivadas";
import { useAuth } from '../Hooks/useAuth';
import Icons from "@expo/vector-icons/Ionicons";
import { Text, Image, View} from "react-native";
import IconImage from "../Assets/branca-whatsapp-150.png";
import Configuracoes from "../Pages/Configuracoes";

const Drawer = createDrawerNavigator();
const CustomDrawer = () => {
    
    return (
        <View
        style={{
            width:'100%',
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:'center',
        }}>
            <DrawerToggleButton tintColor="blue"/>
                <Text>Olá</Text>
                
        </View>
            
    )
}

export function DrawerTabsRoutes() {
 const {phoneNumber} = useAuth();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "#bb86fc",
        drawerLabel: "",
        drawerLabelStyle: {},

        headerStyle: {
          backgroundColor: "#4b0082",
          justifyContent: "space-between",
        },
        drawerStyle: {
          backgroundColor: "#36005d",
        },
        headerTitle:() => <CustomDrawer/>,
        headerLeft:() => false,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: ({ focused }) => (
            <>
              <Icons name="home" color={focused ? "#fff" : "#aaa"} size={30} />
              <Text style={{ fontSize: 25, color: focused ? "#fff" : "#aaa" }}>
                {" "}
                Home
              </Text>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="Status"
        component={Status}
        options={{
          drawerLabel: ({ focused }) => (
            <>
              <Icons
                name="albums-outline"
                color={focused ? "#fff" : "#aaa"}
                size={30}
              />
              <Text style={{ fontSize: 25, color: focused ? "#fff" : "#aaa" }}>
                {" "}
                Status
              </Text>
            </>
          ),
        }}
      />

      <Drawer.Screen
        name="Chamadas"
        component={Chamadas}
        options={{
          drawerLabel: ({ focused }) => (
            <>
              <Icons name="call" color={focused ? "#fff" : "#aaa"} size={30} />
              <Text style={{ fontSize: 25, color: focused ? "#fff" : "#aaa" }}>
                {" "}
                Chamadas
              </Text>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="Arquivadas"
        component={Arquivadas}
        options={{
          drawerLabel: ({ focused }) => (
            <>
              <Icons
                name="archive"
                color={focused ? "#fff" : "#aaa"}
                size={30}
              />
              <Text style={{ fontSize: 25, color: focused ? "#fff" : "#aaa" }}>
                {" "}
                Arquivadas
              </Text>
            </>
          ),
        }}
      />

      <Drawer.Screen
        name="Configurações"
        component={Configuracoes}
        options={{
          drawerIcon: ({ focused }) => (
            <>
              <Icons
                name="construct-outline"
                color={focused ? "#fff" : "#aaa"}
                size={30}
              />
              <Text style={{ fontSize: 25, color: focused ? "#fff" : "#aaa" }}>
                {" "}
                Ajustes
              </Text>
            </>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
