import * as React from 'react';
import {memo, useMemo} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {IC_CONTACT, IC_HISTORY} from "../assets";
import styled from "styled-components/native";
import {StyleSheet} from "react-native";
import {HeaderBase} from "../components/Header";
import {ContactScreen} from "../screens/ContactScreen";
import {HistoryScreen} from "../screens/HistoryScreen";
import {bottomSpaceHeight, marginTabBar} from "../utils/styles";

const ItemSearchIcon = memo((props: any) => {
    return (
        <SearchIcon>
            <SearchIconImage
                resizeMode="contain"
                source={IC_CONTACT}
                style={[styles.tabBarIcon, props.focused && styles.tabBarIconFocused]}
            />
            <WrapTabBarText style={[styles.tabBarText, props.focused && styles.tabBarTextFocused]}>Danh
                bạ</WrapTabBarText>
        </SearchIcon>

    )
})
const ItemHistoryIcon = memo((props: any) => {
    return (
        <HistoryIcon>
            <HistoryIconImage
                resizeMode="contain"
                source={IC_HISTORY}
                style={[styles.tabBarIcon, props.focused && styles.tabBarIconFocused]}
            />
            <WrapTabBarText style={[styles.tabBarText, props.focused && styles.tabBarTextFocused]}
            >Gần đây</WrapTabBarText>
        </HistoryIcon>
    )
})
const Tab = createBottomTabNavigator();
const BottomTabNavigator = ({navigation}) => {

    const screenOptions = useMemo(() => {
        return {
            tabBarActiveTintColor: '#fff',
            tabBarStyle: {backgroundColor: '#f2a54a',height:bottomSpaceHeight},
            tabBarLabelStyle: {display: 'none' as const},
            tabBarHideOnKeyboard: true,
            shownLabel:false,
            header: props => <HeaderBase navigation={navigation} {...props}/>
        }
    }, [navigation])

    return (
        <Tab.Navigator
            initialRouteName="Danh bạ"
            screenOptions={screenOptions}
        >
            <Tab.Screen name="Danh bạ" component={ContactScreen}
                        options={{
                            tabBarIcon: ({focused}) => {
                                return (
                                    <ItemSearchIcon focused={focused}/>
                                )
                            },
                        }}></Tab.Screen>
            <Tab.Screen name="Gần đây" component={HistoryScreen}
                        options={{
                            tabBarIcon: ({focused}) => {
                                return (
                                    <ItemHistoryIcon focused={focused}/>
                                )
                            },
                        }}/>
        </Tab.Navigator>

    );
};

const SearchIconImage = styled.Image`
  width: 18px;
  height: 20px;
  tint-color: white;
`
const HistoryIconImage = styled.Image`
  width: 18px;
  height: 20px;
  tint-color: #fff;
`
const HistoryIcon = styled.View`
  margin-top: ${marginTabBar}px;
  align-items: center;
`
const SearchIcon = styled.View`
  margin-top: ${marginTabBar}px;
  align-items: center;
`
const WrapTabBarText = styled.Text`

`
const styles = StyleSheet.create({
    tabBarIcon: {
        width: 23,
        tintColor: '#FFDAAE',
        height: 23,
    },
    tabBarIconFocused: {
        width: 23,
        tintColor: '#fff',
        height: 23,
    },
    tabBarText: {
        marginTop:5,
        fontSize: 10,
        textAlign: 'center',
        letterSpacing: 0.12,
        color: '#FFDAAE',
    },
    tabBarTextFocused: {
        marginTop:5,
        fontSize: 10,
        textAlign: 'center',
        letterSpacing: 0.12,
        color: '#FFFFFF',
    }
});
export default BottomTabNavigator;