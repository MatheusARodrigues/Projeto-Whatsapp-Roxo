import "react-native-gesture-handler";
import { DrawerToggleButton, createDrawerNavigator} from "@react-navigation/drawer";
import { Home } from "../Pages/Home";
import React from "react";
import { Status } from "../Pages/Status";
import { Chamadas } from "../Pages/Chamadas";
import Arquivadas from "../Pages/Arquivadas";
import { useAuth } from "../Hooks/useAuth";
import Icons from "@expo/vector-icons/Ionicons";
import { Text, Image, View, Dimensions, TouchableOpacity } from "react-native";
import IconImage from "../Assets/branca-whatsapp-150.png";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Configuracoes from "../Pages/Configuracoes";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const { width: screenWidth } = Dimensions.get("window");




const CustomDrawer = () => {

  const {setModalOpen, modalOpen} = useAuth();
  const navigate = useNavigation();

 const handleConfig = () => {
 setModalOpen(!modalOpen)

 }

  return (
    <View
      style={{
        height: "100%",
        width: screenWidth * 0.9,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4b0082",
        justifyContent: "space-between",
      }}
    >
      <DrawerToggleButton tintColor="#fff" />
      <Image source={IconImage} style={{ height: 40, width: 40 }} />
      <TouchableOpacity onPress={handleConfig}>
        <MaterialCommunityIcons  name="dots-vertical" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export function DrawerTabsRoutes() {
  const { phoneNumber } = useAuth();

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
        headerTitle: () => <CustomDrawer />,
        headerLeft: () => false,
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
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <Icons name="home" color={focused ? "#fff" : "#aaa"} size={30} />
              <Text style={{ fontSize: 20, color: focused ? "#fff" : "#aaa", marginLeft: 20, alignSelf:'center' }}>
                Home
              </Text>
            </View>
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
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <Icons
                name="albums-outline"
                color={focused ? "#fff" : "#aaa"}
                size={30}
              />
              <Text style={{ fontSize: 20, color: focused ? "#fff" : "#aaa", marginLeft: 20, alignSelf:'center'}}>
                Status
              </Text>
            </View>
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
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <Icons name="call" color={focused ? "#fff" : "#aaa"} size={30} />
              <Text style={{ fontSize: 20, color: focused ? "#fff" : "#aaa", marginLeft: 20, alignSelf:'center' }}>
                Chamadas
              </Text>
            </View>
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
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <Icons
                name="archive"
                color={focused ? "#fff" : "#aaa"}
                size={30}
              />
              <Text style={{ fontSize: 20, color: focused ? "#fff" : "#aaa", marginLeft: 20, alignSelf:'center' }}>
                Arquivadas
              </Text>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
