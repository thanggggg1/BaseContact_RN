import * as React from 'react';
import {memo, useCallback} from 'react';
import {Dimensions} from 'react-native';
import styled from "styled-components/native";
import {IC_CAMERA, IC_MENU} from "../assets";
import {useNavigation, useRoute} from "@react-navigation/native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const width = Dimensions.get("window").width
export const HeaderBase = memo(function HeaderBase() {

    const route = useRoute();
    const navigation: any = useNavigation();
    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [navigation])
    const onNavigateEditProfile = useCallback(() => {
        navigation.navigate("NewEditProfile", {paramKey: 0})
    }, [navigation])

    return (
        <Container>
            <ContentContainer>
                <BtnMenu onPress={openDrawer}>
                    <MenuIcon source={IC_MENU}/>
                </BtnMenu>
                <TextContact>
                    {route.name == "Danh bạ" ? 'Liên hệ' : 'Lịch sử'}
                </TextContact>
                <BtnCamera onPress={onNavigateEditProfile}>
                    <CameraIcon source={IC_CAMERA}/>
                </BtnCamera>
            </ContentContainer>
        </Container>
    )
})

const BtnMenu = styled.TouchableOpacity`
  height: 18px;
  width: 22px;
  margin-top: 3px;
`
const MenuIcon = styled.Image`
  width: 24px;
  height: 24px;
`
const TextContact = styled.Text`
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #333333;
`
const BtnCamera = styled.TouchableOpacity`
  margin-top: 3px;
`
const CameraIcon = styled(MenuIcon)`
`
const Container = styled.View`
  background-color: white;
  padding-top: ${getStatusBarHeight() + 20}px;
`;
const ContentContainer = styled.View`
  background-color: #ffffff;
  flex-direction: row;
  width: ${width}px;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
`
