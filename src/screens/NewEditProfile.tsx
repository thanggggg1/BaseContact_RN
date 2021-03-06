import * as React from 'react';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components/native";
import {IC_BACKGROUND_CIRCLE, IC_PROFILE, IC_UPDATE_AVATAR,} from "../assets";
import {KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity} from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import {updateContactAction, useContacts} from "../store/redux";
import {useNavigation, useRoute} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import {InputInfo} from "../components/TextInput";
import {nonAccentVietnamese} from "../utils/nonAccentVietnamese";
import {InputInfoArr} from "../components/TextInputArray";
import {InputInfoDate} from "../components/TextInputDate";
import validator from 'validator'

export const NewEditProfile = memo(function NewEditProfile() {
    const route: any = useRoute();
    const navigation: any = useNavigation();
    const newEditContacts = useContacts();
    const itemEditContact = newEditContacts.byKey[route.params.paramKey]
    const [profileUri, setProfileUri] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [params, setParams] = useState({
        key: `${new Date().getTime()}`,
        value: '',
        firstname: '',
        lastname: '',
        avatar: '',
        organization: '',
        searchField: '',
        phone: [],
        email: [],
        address: [],
        date: '',
        historyLog: '',
        actionLog: '',
        totalAction: 0
    })
    useEffect(() => {
        setIsValidEmail(true)
        params.email.map((item) => {
            if (!validator.isEmail(item)) {
                setIsValidEmail(false)
            }
        })
        if (params.email.includes('')) setIsValidEmail(false)
        if (params.lastname == '' && params.firstname == '' && params.avatar == '' && params.phone.length == 0 && params.email.length == 0 && params.address.length == 0
        ) {
            setIsActive(false)
        } else setIsActive(true)
    }, [params])

    useEffect(() => {
        if (!itemEditContact) {
            return
        }
        setParams({...itemEditContact})
    }, [itemEditContact]);
    const SearchText = `${params.firstname}${params.lastname}${nonAccentVietnamese(params.firstname)}${nonAccentVietnamese(params.lastname)}`
    const ValueText = `${nonAccentVietnamese(params.lastname)}${nonAccentVietnamese(params.firstname)}`

    const selectionOnchange = useMemo(() => {
        return {
            color: isActive ? '#828282' : '#F2A54A'
        }
    }, [isActive])

    const selectionOnDone = useMemo(() => {
        return {
            color: isActive ? '#F2A54A' : '#828282'
        }
    }, [isActive])

    const onGoBack = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    const onDone = useCallback(async () => {
        params.searchField = SearchText;
        params.value = ValueText;
        if (params.value == "" || params.phone.includes('') || params.phone.length == 0) {
            alert('Please insert name or phone of the contact');
            return;
        }
        if (isValidEmail || params?.email.length == 0) {
            await updateContactAction(params)
            navigation.goBack()
        } else {
            alert('Please input correct email')
        }

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
    }, [params])

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
    }, [profileUri || route.params?.paramKey])

    const updateAvatarStyle = useMemo(() => {
        return profileUri ? {top: -30} : null
    }, [profileUri])

    return (
        <Container>
            <Header>
                <BtnHeader>
                    <ButtonCancel onPress={onGoBack}>
                        <TextHeader style={selectionOnchange}>
                            H???y
                        </TextHeader>
                    </ButtonCancel>
                    <ButtonDone onPress={onDone}>
                        <TextHeaderCompleted style={selectionOnDone}>
                            Xong
                        </TextHeaderCompleted>
                    </ButtonDone>
                </BtnHeader>
            </Header>
            <SKeyboardAvoidingView
                behavior={Platform.OS == "ios" ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 0}
            >
                <ScrollView>
                    <SectionProfile>
                        <BackgroundProfile source={IC_BACKGROUND_CIRCLE}/>
                        <ProfilePicture
                            source={itemEditContact?.avatar ? {uri: itemEditContact.avatar} : (profileUri ? {uri: profileUri} : IC_PROFILE)}
                            style={ProfilePictureStyle}/>
                        <TouchableOpacity onPress={onButtonPress}>
                            <UpdateAvatar source={IC_UPDATE_AVATAR}
                                          style={updateAvatarStyle}/>
                        </TouchableOpacity>
                    </SectionProfile>
                    <SectionList>
                        <ContentInput>
                            <InputInfo keyName={'firstname'} onValueChange={onValueChange} value={params?.firstname}
                                       placeholder={'H???'}/>
                            <InputInfo keyName={'lastname'} onValueChange={onValueChange} value={params?.lastname}
                                       placeholder={'T??n'}/>
                            <InputInfo keyName={'organization'} onValueChange={onValueChange}
                                       value={params?.organization}
                                       placeholder={'C??ng ty'}/>
                        </ContentInput>
                        <SectionAddList>
                            <InputInfoArr title={'Th??m s??? ??i???n tho???i'} keyName={'phone'} data={params?.phone}
                                          setParams={setParams} typeKeyboard={'number-pad'}/>
                            <InputInfoArr title={'Th??m email'} keyName={'email'} data={params?.email}
                                          setParams={setParams} typeKeyboard={'default'}/>
                            <InputInfoArr title={'Th??m ?????a ch???'} keyName={'address'} data={params?.address}
                                          setParams={setParams} typeKeyboard={'default'}/>
                            <InputInfoDate title={'Th??m ng??y sinh'} keyName={'date'} data={params?.date}
                                           setParams={setParams}/>
                        </SectionAddList>
                    </SectionList>
                </ScrollView>
            </SKeyboardAvoidingView>
        </Container>
    )
})

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`
const Header = styled.View`
  background-color: #ffffff;
  margin-bottom: 10px;
`
const BtnHeader = styled.View`
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
const ButtonCancel = styled.TouchableOpacity`

`
const ButtonDone = styled.TouchableOpacity`
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
  background-color: #ffffff;
`
const ContentInput = styled.View`
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 20px;
`
const SectionAddList = styled.View`

`
const SKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1`
