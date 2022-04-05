import * as React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {IC_CONTACT, IC_HISTORY} from "../assets";
import styled from "styled-components/native";
import {Platform, StyleSheet} from "react-native";
import {HeaderBase} from "../components/Header";
import {ContactScreen} from "../screens/ContactScreen";
import {HistoryScreen} from "../screens/HistoryScreen";
import {useMemo} from "react";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
    const screenOptions = useMemo( () => {
     return {
         tabBarActiveTintColor: '#fff',
         tabBarStyle:{backgroundColor : '#f2a54a',marginBottom : Platform.OS == 'ios' ? -10 : 0},
         tabBarInactiveTintColor:"#DADADA",
         tabBarItemStyle:{paddingBottom:Platform.OS== 'ios' ? 0 : 5},
         header:props => <HeaderBase navigation = {navigation} {...props}/>}
    },[navigation])
    return (
        <Tab.Navigator
            initialRouteName="Danh bạ"
            screenOptions={screenOptions}>
            <Tab.Screen name="Danh bạ" component={ContactScreen}
                        options={{
                            tabBarIcon:({focused}) =>{
                                return(
                                    <SearchIcon
                                        resizeMode="contain"
                                        source={IC_CONTACT}
                                        style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                                    />
                                )
                            },
                        }} />
            <Tab.Screen name="Gần đây" component={HistoryScreen}
                        options={{
                            tabBarIcon:({focused}) =>{
                                return(
                                    <HistoryIcon
                                        resizeMode="contain"
                                        source={IC_HISTORY}
                                        style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                                    />
                                )
                            },
                        }} />
        </Tab.Navigator>
    );
};
const SearchIcon = styled.Image`
width: 18px;
  height: 20px;
  tint-color:white;
`
const HistoryIcon = styled.Image`
  width: 18px;
  height: 20px;
  tint-color:#fff;
`
const styles = StyleSheet.create({
    tabBarIcon :{
        width:23,
        tintColor:'#FFDAAE',
        height:23,
    },
    tabBarIconFocused:{
        width:23,
        tintColor:'#fff',
        height:23,
    }
});
export default BottomTabNavigator;