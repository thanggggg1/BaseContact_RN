import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import {LoginScreen} from "../screens/LoginScreen";
import {NewEditProfile} from "../screens/NewEditProfile";
import DrawerNavigator from "./DrawerNavigator";
import {ContactDetails} from "../screens/ContactDetails";

const Stack = createStackNavigator();
const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
                         screenOptions={{headerShown:false,
                         }}
       >
            <Stack.Screen name="Home" component={LoginScreen} />
            <Stack.Screen name="ContactScreen" component={DrawerNavigator} />
            <Stack.Screen name="New Edit Profile" component={NewEditProfile}/>
            <Stack.Screen name="ContactDetails" component={ContactDetails}/>
        </Stack.Navigator>
    );
}
export {MainStackNavigator};