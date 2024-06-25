
import "react-native-gesture-handler";
import { DrawerToggleButton, createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../Pages/Home";
import React from "react";
import Status from "../Pages/Status";
import { Chamadas } from "../Pages/Chamadas";
import Arquivadas from "../Pages/Arquivadas";
import { useAuth } from '../Hooks/useAuth';
import Icons from "@expo/vector-icons/Ionicons";
import { Text, Image, View, Dimensions} from "react-native";
import IconImage from "../Assets/branca-whatsapp-150.png";
import Configuracoes from "../Pages/Configuracoes";

const Drawer = createDrawerNavigator();
const { width: screenWidth } = Dimensions.get('window');

const CustomDrawer = () => {

    
    return (
        <View
        style={{
            height: '100%',
            width: screenWidth * 0.9,
            flexDirection: 'row',
            alignItems:'center',
            backgroundColor: "#4b0082",
            justifyContent: 'space-between'
        }}>
            <DrawerToggleButton tintColor="#fff"/>
                <Text>Home</Text>
                <Image source={IconImage} style={{height:40, width:40}}/>
                
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
            headerStyle: {
                backgroundColor: "#4b0082",
            },
          drawerLabel: ({ focused }) => (
            <>
              <Icons name="home" color={focused ? "#fff" : "#aaa"} size={30} />
              <Text style={{ fontSize:20, color: focused ? "#fff" : "#aaa" }}>Home</Text>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="Status"
        component={Status}
        options={{
            headerStyle: {
                backgroundColor: "#4b0082",
            },
          drawerLabel: ({ focused }) => (
            <>
              <Icons name="albums-outline" color={focused ? "#fff" : "#aaa"} size={30}/>
              <Text style={{ fontSize:20, color: focused ? "#fff" : "#aaa" }}>Status</Text>
            </>
          ),
        }}
      />

      <Drawer.Screen
        name="Chamadas"
        component={Chamadas}
        options={{
            headerStyle: {
                backgroundColor: "#4b0082",
            },
          drawerLabel: ({ focused }) => (
            <>
              <Icons name="call" color={focused ? "#fff" : "#aaa"} size={30} />
              <Text style={{ fontSize:20, color: focused ? "#fff" : "#aaa" }}>Chamadas</Text>
            </>
          ),
        }}
      />
      <Drawer.Screen
        name="Arquivadas"
        component={Arquivadas}
        options={{
            headerStyle: {
                backgroundColor: "#4b0082",
            },
          drawerLabel: ({ focused }) => (
            <>
              <Icons name="archive" color={focused ? "#fff" : "#aaa"} size={30} />
              <Text style={{ fontSize:20, color: focused ? "#fff" : "#aaa" }}>Arquivadas</Text>
            </>
          ),
        }}
      />

      <Drawer.Screen
        name="Configurações"
        component={Configuracoes}
        options={{
            headerStyle: {
                backgroundColor: "#4b0082",
            },
          drawerIcon: ({ focused }) => (
            <>
              <Icons name="construct-outline" color={focused ? "#fff" : "#aaa"} size={30}/>
              <Text style={{ fontSize: 20, color: focused ? "#fff" : "#aaa" }}>Ajustes</Text>
            </>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
