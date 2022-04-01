import * as React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawer from "../components/Customdrawer";
import BottomTabNavigator from "./TabNavigation";

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({navigation}) => {
    return (
        <Drawer.Navigator
            initialRouteName="New Collection"
            screenOptions={{
                headerShown:false,
                drawerType:"front",
               }}
            drawerContent={props => <CustomDrawer {...props}
            />}
        >
            <Drawer.Screen name="New Collection" component={BottomTabNavigator}
                        />

        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
