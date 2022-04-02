import * as React from 'react';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components/native";
import {IC_BACKGROUNDCIRCLE, IC_PROFILE, IC_UPDATE_AVATAR,} from "../assets";
import {Dimensions, ScrollView, TouchableOpacity} from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import {updateContactAction, useContacts} from "../store/redux";
import {useNavigation, useRoute} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import {InputInfo} from "../components/TextInput";
import {nonAccentVietnamese} from "../utils/nonAccentVietnamese";
import {InputInfoArr} from "../components/TextInputArray";

export const NewEditProfile = memo(function NewEditProfile() {
    const route: any = useRoute();
    const navigation: any = useNavigation();
    const newEditContacts = useContacts();
    const itemEditContact = newEditContacts.byKey[route.params.paramKey]
    const [profileUri, setProfileUri] = useState("");
    const [params, setParams] = useState({
        key: `${new Date().getTime()}`,
        value: '',
        firstname: '',
        avatar: '',
        organization: '',
        searchField: '',
        phone: [],
        email: [],
        address: [],
        date: []
    })
    useEffect(() => {
        if (!itemEditContact) {
            return
        }
        setParams({...itemEditContact})
    }, [itemEditContact])
    const SearchText = `${params.firstname}${params.value}${nonAccentVietnamese(params.firstname)}${nonAccentVietnamese(params.value)}`
    const onDone = useCallback(async () => {
        params.searchField = SearchText;
        await updateContactAction(params)
        navigation.navigate("ContactScreen")
    }, [params]);
    const onButtonPress = useCallback(() => {
        ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        }, (res) => {
            setProfileUri(res.assets?.length ? res.assets[0]?.uri : "")
            setParams(prev => ({
                ...prev,
                avatar: res.assets?.length ? res.assets[0]?.uri : ""
            }))
        });
    }, [])
    const onValueChange = useCallback((keyName: string, val: string) => {
        setParams(prevValue => ({
            ...prevValue,
            [keyName]: val
        }))
    }, [])
    const ProfilePictureStyle = useMemo(() => {
        return profileUri || route.params?.paramKey != 0 ? {
            width: 100,
            height: 100,
            marginTop: -8
        } : null
    },[profileUri || route.params?.paramKey])
    const UpdateAvatarStyle = useMemo(()=>{
        return profileUri ? {top: -30} : null
    },[profileUri])
    return (
        <Container>
            <Header>
                <BtnHeader>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("ContactScreen")
                    }}>
                        <TextHeader>
                            Hủy
                        </TextHeader>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDone}>
                        <TextHeaderCompleted>
                            Xong
                        </TextHeaderCompleted>
                    </TouchableOpacity>
                </BtnHeader>
            </Header>
            <ScrollView>
                <SectionProfile>
                    <BackgroundProfile source={IC_BACKGROUNDCIRCLE}/>
                    <ProfilePicture
                        source={itemEditContact?.avatar ? {uri: itemEditContact.avatar} : (profileUri ? {uri: profileUri} : IC_PROFILE)}
                        style={ProfilePictureStyle}/>
                    <TouchableOpacity onPress={onButtonPress}>
                        <UpdateAvatar source={IC_UPDATE_AVATAR}
                                      style={UpdateAvatarStyle}/>
                    </TouchableOpacity>
                </SectionProfile>
                <SectionList>
                    <ContentInput>
                        <InputInfo keyName={'firstname'} onValueChange={onValueChange} value={params?.firstname}
                                   placeholder={'Họ'}/>
                        <InputInfo keyName={'value'} onValueChange={onValueChange} value={params?.value}
                                   placeholder={'Tên'}/>
                        <InputInfo keyName={'organization'} onValueChange={onValueChange} value={params?.organization}
                                   placeholder={'Công ty'}/>
                    </ContentInput>
                    <SectionAddList>
                        <InputInfoArr title={'thêm số điện thoại'} keyName={'phone'} data={params?.phone}
                                      setParams={setParams}/>
                        <InputInfoArr title={'thêm email'} keyName={'email'} data={params?.email}
                                      setParams={setParams}/>
                        <InputInfoArr title={'thêm địa chỉ'} keyName={'address'} data={params?.address}
                                      setParams={setParams}/>
                        <InputInfoArr title={'thêm ngày sinh'} keyName={'date'} data={params?.date}
                                      setParams={setParams}/>
                    </SectionAddList>
                </SectionList>
            </ScrollView>
        </Container>
    )
})

const height = Dimensions.get("window").height
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`
const Header = styled.View`
  background-color: #ffffff;
`
const BtnHeader = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 50px;
`
const TextHeader = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #F2A54A;
`
const TextHeaderCompleted = styled(TextHeader)`
  color: #828282;
`
const SectionProfile = styled.View`
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`
const BackgroundProfile = styled.Image`
  position: absolute;
  top: -10px;
`
const ProfilePicture = styled(FastImage)`
  background-color: #F2F2F2;
  border-radius: 50px;
  width: 80px;
  height: 80px;
`
const UpdateAvatar = styled.Image`
  width: 30px;
  height: 30px;
  left: 35px;
  top: -20px;
  background: #F2A54A;
  border-radius: 25px;
`
const SectionList = styled.View`
  height: ${height}px;
  background-color: #ffffff;
`
const ContentInput = styled.View`
  margin-top: -20px;
  margin-left: 18px;
  margin-right: 18px;
`
const SectionAddList = styled.View`

`
const ItemAdd = styled.View`
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`
const ItemButtonAdd = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-left: 15px;
`
const ImageAddButton = styled.Image`
  width: 24px;
  height: 24px;
`
const RemoveButton = styled.TouchableOpacity`
  background: red;
  width: 24px;
  height: 24px;
  border-radius: 20px;
  z-index: -1;
  justify-content: center;
`
const AddItem = styled.View`
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 0.5px;
  flex: auto;
`
const TextAddInfo = styled.TextInput`
  margin-left: 15px;
  font-size: 13px;
  color: #2F80ED;
  background-color: white;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  letter-spacing: -0.41px;
  text-transform: lowercase;
  padding-bottom: 10px;
  padding-top: 10px;
`
const ImageRemoveButton = styled.Image`
  width: 23px;
  height: 4px;
  position: absolute;
  left: 1px;
`
