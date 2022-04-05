import * as React from 'react';
import {useCallback, useState} from 'react';
import {View} from 'react-native';
import {DrawerContentScrollView,} from '@react-navigation/drawer';
import styled from "styled-components/native";
import {IC_ADDPLUS, IC_DOWNARROW, IMG_PROFILE_AVATAR} from "../assets";
import {ItemDropDown} from "./ItemDropDown";
import {statusBarHeight} from "../utils/styles";

const CustomDrawer = props => {
    const [isActive, setIsActive] = useState(false);
    const ButtonHandler =useCallback(()=>{
        setIsActive(!isActive)
    },[isActive])
    const DropdownItem = () => {
        return (
            <View>
                <ItemDropDown title={'All'}/>
                <ItemDropDown title={'General'}/>
                <ItemDropDown title={'Investors'}/>
                <ItemDropDown title={'Lead'}/>
                <ItemDropDown title={'VIP'}/>
            </View>
        )
    }
    return (
            <Container>
                <HeaderDrawer>
                    <SectionProfile>
                        <AvatarProfile>
                            <ImageProfile source={IMG_PROFILE_AVATAR}/>
                        </AvatarProfile>
                        <ContentProfile>
                            <TextName>Nguyễn Tiến Nam</TextName>
                            <TextPosition>Admin Admin</TextPosition>
                        </ContentProfile>
                    </SectionProfile>
                </HeaderDrawer>
                <FlexComponent>
                    <ItemCollection>
                        <BackgroundButtonAdd>
                            <ImageButtonAdd source={IC_ADDPLUS}/>
                        </BackgroundButtonAdd>
                        <TextItemCollection>
                            New collection
                        </TextItemCollection>
                    </ItemCollection>
                    <CollectionsButton>
                        <ArrowDownButton onPress={ButtonHandler}>
                            {isActive ? <ArrowUpIcon source={IC_DOWNARROW}/> : <ArrowDownIcon source={IC_DOWNARROW}/>}
                        </ArrowDownButton>
                        <TextCollection>
                            COLLECTIONS
                        </TextCollection>
                        <TextEdit>
                            Edit
                        </TextEdit>
                    </CollectionsButton>
                    {isActive ? <DropdownItem/> : null}
                </FlexComponent>
                <DrawerContentScrollView
                    {...props}>
                </DrawerContentScrollView>
            </Container>
    );
};
export default CustomDrawer;
const Container = styled.View`
flex:1;
`
const FlexComponent = styled.View`
  background-color: #fff;
  flex: 1;
`
const HeaderDrawer = styled.View`
  background-color: #F2A54A;
  padding: ${statusBarHeight-15}px 0 10px 0;
`
const SectionProfile = styled.View`
  flex-direction: row;
  margin-top: 40px;
  margin-left: 15px;
`
const AvatarProfile = styled.View`

`
const ImageProfile = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
`
const ContentProfile = styled.View`
  margin-left: 10px;
`
const TextName = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #FFFFFF;
`
const TextPosition = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #FFFFFF;
`
const CollectionsButton = styled.View`
  background: rgba(242, 165, 74, 0.1);
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`
const ArrowDownButton = styled.TouchableOpacity`

`
const ArrowDownIcon = styled.Image`
  margin-left: 16px;
`
const ArrowUpIcon = styled.Image`
  margin-left: 16px;
  transform: rotate(180deg);
`
const TextCollection = styled.Text`
  margin-left: 30px;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.12px;
  text-transform: uppercase;
  color: #333333;
`
const TextEdit = styled.Text`
  margin-left: 90px;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.12px;
  color: #F2A54A;
`
const ItemCollection = styled.View`
  flex-direction: row;
  padding-left: 20px;
  align-items: center;
`
const BackgroundButtonAdd = styled.TouchableOpacity`
  padding: 20px 0;
  padding-right: 20px;
`
const ImageButtonAdd = styled.Image`
  width: 15px;
  height: 15px;
`
const TextItemCollection = styled.Text`
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0.12px;
  color: #333333;
`
