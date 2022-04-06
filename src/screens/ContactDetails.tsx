import * as React from 'react';
import {memo, useCallback} from 'react';
import styled from "styled-components/native";
import {
    IC_ARROW_BACK_BUTTON,
    IC_CALL_BUTTON,
    IC_EMAIL,
    IC_FACETIME,
    IC_LINE_DOWN,
    IC_MESSAGE_BUTTON,
    IC_PROFILE,
} from "../assets";
import {removeContactAction, useContacts} from "../store/redux";
import call from 'react-native-phone-call'
import {Alert, Linking, Platform, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {ActiveActionButton} from "../components/ActiveActionButton";
import {NonActiveActionButton} from "../components/NonActiveActionButton";

export const ContactDetails = memo(function AddedContact() {
    const navigation: any = useNavigation();
    const route: any = useRoute()
    const newContacts = useContacts();
    const newContact = newContacts.byKey[route.params.paramKey]
    const onDelete = useCallback(() => {
        return Alert.alert(
            "Are you sure?",
            "Are you sure you want to remove this contact?",
            [
                {
                    text: "Yes",
                    onPress: async () => {
                        await removeContactAction(newContact?.key)
                        navigation.navigate('ContactScreen')
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    }, [])
    const onSendSMSMessage = useCallback(async (phoneNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phoneNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])
    const triggerCall = useCallback(() => {
        if (newContact.phone[newContact.phone.length - 1].length != 10) {
            alert('Please insert correct contact number');
            return;
        }
        const args = {
            number: newContact.phone[newContact.phone.length - 1],
            prompt: true,
        };
        call(args).catch(console.error);
    }, [])
    const sendSMS = useCallback(() => {
        onSendSMSMessage(newContact?.phone, `xin chao ${newContact?.firstname} ${newContact?.value}`)
    }, [])
    const onNavigateContactScreen = useCallback(()=>{
        navigation.navigate("ContactScreen")
    },[])
    const onNavigateEditProfile = useCallback(()=>{
        navigation.navigate("NewEditProfile", {paramKey: newContact.key})
    },[])
    
    return (
        <Container>
            <SectionProfile>
                <Background/>
                <Header>
                    <Background/>
                    <BtnHeader>
                        <ButtonArrowBack onPress={onNavigateContactScreen}>
                            <ImageArrowBack source={IC_ARROW_BACK_BUTTON}/>
                        </ButtonArrowBack>
                        <ButtonEdit
                            onPress={onNavigateEditProfile}>
                            <TextHeaderCompleted>
                                Sửa
                            </TextHeaderCompleted>
                        </ButtonEdit>
                    </BtnHeader>
                </Header>
                <WrappedInformation>
                    <Information>
                        <PictureAvatar>
                            <ImageUser source={newContact?.avatar == "" ? IC_PROFILE : {uri: newContact?.avatar}}/>
                        </PictureAvatar>
                        <TextName>{newContact?.firstname} {newContact?.value}</TextName>
                        <TextJob>UI/UX Design</TextJob>
                    </Information>
                    <ListButtonAction>
                        <ActiveActionButton title={'Nhấn gọi điện'} image_url={IC_CALL_BUTTON} onPress={triggerCall}/>
                        <ActiveActionButton title={'Nhắn tin'} image_url={IC_MESSAGE_BUTTON} onPress={sendSMS}/>
                        <ActiveActionButton title={'Facetime'} image_url={IC_FACETIME} onPress={null}/>
                        {newContact?.email.length!=0 ?
                            <ActiveActionButton title={'Gửi mail'} image_url={IC_EMAIL} onPress={null}/> :
                            <NonActiveActionButton title={'Gửi mail'} image_url={IC_EMAIL} onPress={null}/>
                        }
                    </ListButtonAction>
                </WrappedInformation>
            </SectionProfile>
            <SectionInformation>
                <TextOptions>
                    Điện thoại
                </TextOptions>
                {newContact?.phone.map((item, index) => {
                    return (
                        <View key={index}>
                            <PhoneInformation>{item}</PhoneInformation>
                        </View>
                    )
                })}
                <ImageLine source={IC_LINE_DOWN}/>
                <TextNote>
                    Ghi chú
                </TextNote>
                <ImageLine source={IC_LINE_DOWN}/>
                <TextMessage>
                    Gửi tin nhắn
                </TextMessage>
                <ImageLine source={IC_LINE_DOWN}/>
                <TouchableOpacity onPress={onDelete}>
                    <TextDelete>
                        Xóa người gọi
                    </TextDelete>
                </TouchableOpacity>
                <ImageLine source={IC_LINE_DOWN}/>
            </SectionInformation>
        </Container>
    )
})
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`
const SectionProfile = styled.View`
  padding-top: 40px;
  background: #fff;
  margin-bottom: 10px;
`
const Background = styled.View`
  background: #F2A54A;
  opacity: 0.05;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
const SectionInformation = styled.View`
  background-color: #fff;
  padding-left: 20px;
`
const Header = styled.View`
  background-color: #fff;
`
const BtnHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: ${getStatusBarHeight() - (Platform.OS == "ios" ? 10 : 20)}px;
`
const ButtonArrowBack = styled.TouchableOpacity`

`
const ImageArrowBack = styled.Image`

`
const ButtonEdit = styled.TouchableOpacity`

`
const TextHeaderCompleted = styled.Text`
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -0.41px;
  color: #F2A54A;
`
const Information = styled.View`
  align-items: center;
`
const PictureAvatar = styled.View`
  flex-direction: row;
`
const ImageUser = styled(FastImage)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 20px;
`

const TextName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -0.41px;
  color: #333333;
  padding-bottom: 5px;
`
const TextJob = styled.Text`
  font-size: 13px;
  letter-spacing: -0.41px;
  color: #828282;
  margin-bottom: 20px;
`
const ListButtonAction = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
`
const WrappedInformation = styled.View`
`


const TextOptions = styled.Text`
  font-size: 15px;
  letter-spacing: -0.41px;
  color: #333333;
  padding-bottom: 5px;
`
const TextMessage = styled(TextOptions)`
  padding-top: 15px;
`
const TextNote = styled(TextOptions)`
  padding-top: 15px;
  padding-bottom: 30px
`
const TextDelete = styled(TextOptions)`
  padding-top: 15px;
  color: #FF4A4A;
  padding-bottom: 5px;
`
const PhoneInformation = styled.Text`
  font-weight: 400;
  font-size: 17px;
  letter-spacing: -0.41px;
  color: #2F80ED;
`
const ImageLine = styled.Image`
  margin-top: 5px;
  width: 100%;
  height: 2px;
`


