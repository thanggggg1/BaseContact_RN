import * as React from 'react';
import {memo, useCallback, useState} from 'react';
import styled from "styled-components/native";
import {
    IC_ARROW_BACK_BUTTON,
    IC_CALL_BUTTON,
    IC_EMAIL,
    IC_FACETIME,
    IC_LINE_DOWN,
    IC_MESSAGE_BUTTON,
    IC_PROFILE,
    IC_SMALL_CALL,
} from "../assets";
import {removeContactAction, updateContactAction, useContacts} from "../store/redux";
import call from 'react-native-phone-call'
import {Alert, Linking, Platform, TouchableOpacity} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {ActiveActionButton} from "../components/ActiveActionButton";
import {NonActiveActionButton} from "../components/NonActiveActionButton";
import {Facetime} from 'react-native-openanything';
import {ModalPopUp} from "../components/ModalPopUp";

interface PropsCall {
    item: string,
    index: number,
    _onCallAction: (item: string) => void
}

const CallAction = memo((props: PropsCall) => {
    const {item, index, _onCallAction} = props;
    const onCall = useCallback(() => {
        _onCallAction(item)
    }, [])
    return (
        <TouchableOpacity key={index} onPress={onCall}>
            <PhoneInformation>{item}</PhoneInformation>
        </TouchableOpacity>
    )
})
export const ContactDetails = memo(function AddedContact() {
    const navigation: any = useNavigation();
    const route: any = useRoute()
    const newContacts = useContacts();
    const newContact = newContacts.byKey[route.params.paramKey]
    const [isPhoneModalVisible, setPhoneModalVisible] = useState(false);
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [isSMSModalVisible, setSMSModalVisible] = useState(false);
    const [isFaceTimeModalVisible, setFaceTimeModalVisible] = useState(false);
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
    const onNavigateContactScreen = useCallback(() => {
        navigation.navigate("ContactScreen")
    }, [])

    const onNavigateEditProfile = useCallback(() => {
        navigation.navigate("NewEditProfile", {paramKey: newContact.key})
    }, [])

    const onSendSMSMessage = useCallback(async (phoneNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phoneNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])
    const triggerCall = useCallback( (phoneNumber: string) => {
        const args = {
            number: phoneNumber,
            prompt: true,
        };
        newContact.historyLog='CallAction'
         call(args).catch(console.error);
    }, [])

    const sendSMS = useCallback((item: string) => {
        newContact.historyLog='MessAction'
        console.log(newContact.historyLog)
        onSendSMSMessage(item, `xin chao ${newContact?.firstname} ${newContact?.lastname}`)
    }, [])

    const sendEmail = useCallback((item: string) => {
        newContact.historyLog='MessAction'
        Linking.openURL(`mailto:${item}?subject=mailSubject&body=mailBody`);
    }, [])

    const faceTime = useCallback((item: string) => {
        newContact.historyLog='CallAction'
        Facetime(item)
    }, [])

    const onButtonCall = useCallback(() => {
        if (newContact?.phone.length <= 1) {
            triggerCall(newContact?.phone[0])
        } else {
            togglePhoneModal()
        }
    }, [newContact, isPhoneModalVisible])

    const onButtonEmail = useCallback(() => {
        if (newContact?.email.length <= 1) {
            sendEmail(newContact?.email[0])
        } else {
            toggleEmailModal()
        }
    }, [newContact, isEmailModalVisible])

    const onButtonSMS = useCallback(() => {
        if (newContact?.phone.length <= 1) {
            sendSMS(newContact?.phone[0])
        } else {
            toogleSMSModal()
        }
    }, [newContact, isEmailModalVisible])

    const onButtonFacetime = useCallback(() => {
        if (newContact?.phone.length <= 1) {
            faceTime(newContact?.phone[0])
        } else {
            toogleFacetimeModal()
        }
    }, [newContact, isEmailModalVisible])

    const togglePhoneModal = () => {
        setPhoneModalVisible(!isPhoneModalVisible);
    };

    const toggleEmailModal = () => {
        setEmailModalVisible(!isEmailModalVisible);
    };

    const toogleSMSModal = () => {
        setSMSModalVisible(!isSMSModalVisible)
    }
    const toogleFacetimeModal = () => {
        setFaceTimeModalVisible(!isFaceTimeModalVisible)
    }

    return (
        <Container>
            <ModalPopUp isModalVisible={isPhoneModalVisible} setModalVisible={setPhoneModalVisible} data={newContact?.phone} _onMakeAction={triggerCall} title={'Choose Number '} _image_url={IC_SMALL_CALL}/>
            <ModalPopUp isModalVisible={isSMSModalVisible} setModalVisible={setSMSModalVisible} data={newContact?.phone} _onMakeAction={sendSMS} title={'Choose Number to send '} _image_url={IC_EMAIL}/>
            <ModalPopUp isModalVisible={isFaceTimeModalVisible} setModalVisible={setFaceTimeModalVisible} data={newContact?.phone} _onMakeAction={faceTime} title={'Choose Number'} _image_url={IC_SMALL_CALL}/>
            <ModalPopUp isModalVisible={isEmailModalVisible} setModalVisible={setEmailModalVisible} data={newContact?.email} _onMakeAction={sendEmail} title={'Choose Email'} _image_url={IC_EMAIL}/>
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
                        <TextName>{newContact?.firstname} {newContact?.lastname}</TextName>
                        <TextJob>UI/UX Design</TextJob>
                    </Information>
                    <ListButtonAction>
                        <ActiveActionButton title={'Nhấn gọi điện'} image_url={IC_CALL_BUTTON} onPress={onButtonCall}/>
                        <ActiveActionButton title={'Nhắn tin'} image_url={IC_MESSAGE_BUTTON} onPress={onButtonSMS}/>
                        <ActiveActionButton title={'Facetime'} image_url={IC_FACETIME} onPress={onButtonFacetime}/>
                        {newContact?.email.length != 0 ?
                            <ActiveActionButton title={'Gửi mail'} image_url={IC_EMAIL} onPress={onButtonEmail}/> :
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
                        <CallAction key={index} item={item} index={index} _onCallAction={triggerCall}/>
                    )
                })}
                <ImageLine source={IC_LINE_DOWN}/>
                <TextNote>
                    Ghi chú
                </TextNote>
                <ImageLine source={IC_LINE_DOWN}/>
                <TouchableOpacity onPress={onButtonSMS}>
                    <TextMessage>
                        Gửi tin nhắn
                    </TextMessage>
                </TouchableOpacity>
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

