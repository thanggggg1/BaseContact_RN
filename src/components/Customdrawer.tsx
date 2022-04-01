import * as React from 'react';
import {useState} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {DrawerContentScrollView,} from '@react-navigation/drawer';
import styled from "styled-components/native";
import {IC_ADDPLUS, IC_CONTACT, IC_DOWNARROW, IMG_PROFILE_AVATAR} from "../assets";
import {useSafeAreaInsets} from 'react-native-safe-area-context';


const CustomDrawer = props => {
    const [isActive, setIsActive] = useState(false);
    const insets = useSafeAreaInsets();
    const ButtonHandler = () => {
        setIsActive(current => !current)
    };
    const DropdownItem = () => {
        return (<View>
                <ItemDropdown>
                    <ButtonContact>
                        <ImageContact source={IC_CONTACT}/>
                    </ButtonContact>
                    <TextContact>All</TextContact>
                </ItemDropdown>
                <ItemDropdown>
                    <ButtonContact>
                        <ImageContact source={IC_CONTACT}/>
                    </ButtonContact>
                    <TextContact>General</TextContact>
                </ItemDropdown>
                <ItemDropdown>
                    <ButtonContact>
                        <ImageContact source={IC_CONTACT}/>
                    </ButtonContact>
                    <TextContact>Investor</TextContact>
                </ItemDropdown>
                <ItemDropdown>
                    <ButtonContact>
                        <ImageContact source={IC_CONTACT}/>
                    </ButtonContact>

                    <TextContact>Lead</TextContact>
                </ItemDropdown>
                <ItemDropdown>
                    <ButtonContact>
                        <ImageContact source={IC_CONTACT}/>
                    </ButtonContact>

                    <TextContact>Vip</TextContact>
                </ItemDropdown>
            </View>
        )
    }
    return (
        <>
            <View style={{
                backgroundColor: '#f2a54a',
                height: Platform.OS == "ios" ? insets.top : StatusBar.currentHeight
            }}/>
            <View style={{flex: 1}}>
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
                    {isActive ? <DropdownItem></DropdownItem> : null}
                </FlexComponent>
                <DrawerContentScrollView
                    {...props}>
                </DrawerContentScrollView>
            </View>
        </>

    );
};

export default CustomDrawer;
const FlexComponent = styled.View`
  background-color: '#fff';
  flex: 1;
`

const HeaderDrawer = styled.View`
  background-color: #F2A54A;
  height: 90px;
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
const ItemDropdown = styled(CollectionsButton)`
  background: white;
  flex-direction: row;
  height: 44px;
  align-items: center;
  padding-left: 18px;
`
const ButtonContact = styled.TouchableOpacity`

`
const ImageContact = styled.Image`

`
const TextContact = styled.Text`
  padding-left: 14px;
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
