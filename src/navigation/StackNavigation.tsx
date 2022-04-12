import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {LoginScreen} from "../screens/LoginScreen";
import {NewEditProfile} from "../screens/NewEditProfile";
import {DrawerNavigator} from "./DrawerNavigator";
import {ContactDetails} from "../screens/ContactDetails";
import {memo} from "react";

const Stack = createStackNavigator();
export const MainStackNavigator =memo(function MainStackNavigator(){
    return (
        <Stack.Navigator initialRouteName="Home"
                         screenOptions={{
                             headerShown: false,
                         }}
        >
            <Stack.Screen name="Home" component={LoginScreen}/>
            <Stack.Screen name="ContactScreen" component={DrawerNavigator}/>
            <Stack.Screen name="NewEditProfile" component={NewEditProfile}/>
            <Stack.Screen name="ContactDetails" component={ContactDetails}/>
        </Stack.Navigator>
    );
})

