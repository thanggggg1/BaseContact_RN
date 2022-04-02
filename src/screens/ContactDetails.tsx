import * as React from 'react';
import {memo, useCallback} from 'react';
import styled from "styled-components/native";
import {
    IC_ARROW_BACK_BUTTON,
    IC_CALLBUTTON,
    IC_EMAIL,
    IC_FACETIME,
    IC_LINEDOWN,
    IC_MESSAGE_BUTTON,
    IC_PROFILE,
    IC_UPDATE_AVATAR,
} from "../assets";
import {removeContactAction, useContacts} from "../store/redux";
import call from 'react-native-phone-call'
import {Alert, Linking, Platform, TouchableOpacity} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

export const ContactDetails = memo(function AddedContact() {
    const navigation: any = useNavigation();
    const route: any = useRoute()
    const newContacts = useContacts();
    const newContact = newContacts.byKey[route.params.paramKey]
    const onDelete = useCallback(()=>{
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
    },[])
    const onSendSMSMessage = useCallback(async (phoneNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phoneNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])
    const triggerCall = () => {
        if (newContact.phone[newContact.phone.length-1].length != 10) {
            alert('Please insert correct contact number');
            return;
        }
        const args = {
            number: newContact.phone[newContact.phone.length-1],
            prompt: true,
        };
        call(args).catch(console.error);
    };
    return (
        <Container>
            <SectionProfile>
                <Background/>
                <Header>
                    <Background/>
                    <BtnHeader paddingTop={getStatusBarHeight()  -(Platform.OS == "ios" ?10 :20)}>
                        <ButtonArrowBack onPress={() => navigation.navigate("ContactScreen")}>
                            <ImageArrowBack source={IC_ARROW_BACK_BUTTON}/>
                        </ButtonArrowBack>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("New Edit Profile", {paramKey: newContact.key})}>
                            <TextHeaderCompleted>
                                Sửa
                            </TextHeaderCompleted>
                        </TouchableOpacity>
                    </BtnHeader>
                </Header>
                <WrappedInformation>
                    <Information>
                        <PictureAvatar>
                            <ImageUser source={newContact?.avatar == "" ? IC_PROFILE : {uri: newContact?.avatar}}/>
                            <UpdateAvatar source={IC_UPDATE_AVATAR}/>
                        </PictureAvatar>
                        <TextName>{newContact?.firstname} {newContact?.value}</TextName>
                        <TextJob>UI/UX Design</TextJob>
                    </Information>
                    <ListButtonAction>
                        <ButtonAction>
                            <BackgroundButtonAction onPress={triggerCall}>
                                <ImageButtonAction source={IC_CALLBUTTON}/>
                            </BackgroundButtonAction>
                            <TextButtonAction>
                                Nhấn gọi điện
                            </TextButtonAction>
                        </ButtonAction>
                        <ButtonAction>
                            <BackgroundButtonAction onPress={() => {
                                onSendSMSMessage(newContact?.phone, `xin chao ${newContact?.firstname} ${newContact?.value}`)
                            }
                            }>
                                <ImageButtonAction source={IC_MESSAGE_BUTTON}/>
                            </BackgroundButtonAction>
                            <TextButtonAction>
                                Nhắn tin
                            </TextButtonAction>
                        </ButtonAction>
                        <ButtonAction>
                            <BackgroundButtonAction>
                                <ImageButtonAction source={IC_FACETIME}/>
                            </BackgroundButtonAction>
                            <TextButtonAction>
                                Facetime
                            </TextButtonAction>
                        </ButtonAction>
                        <ButtonAction>
                            <BackgroundNonTouchAction>
                                <ImageButtonAction source={IC_EMAIL}/>
                            </BackgroundNonTouchAction>
                            <TextButtonAction>
                                Gửi mail
                            </TextButtonAction>
                        </ButtonAction>
                    </ListButtonAction>
                </WrappedInformation>
            </SectionProfile>
            <SectionInformation>
                <TextOptions>
                    Điện thoại
                </TextOptions>
                <PhoneInformation>
                    {newContact?.phone}
                </PhoneInformation>
                <ImageLine source={IC_LINEDOWN}/>
                <TextNote>
                    Ghi chú
                </TextNote>
                <ImageLine source={IC_LINEDOWN}/>
                <TextOptions style={{paddingTop: 15}}>
                    Gửi tin nhắn
                </TextOptions>
                <ImageLine source={IC_LINEDOWN}/>
                <TouchableOpacity onPress={onDelete}>
                    <TextDelete>
                        Xóa người gọi
                    </TextDelete>
                </TouchableOpacity>
                <ImageLine source={IC_LINEDOWN}/>
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
const BtnHeader = styled.TouchableOpacity<{paddingTop?:number}>`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: ${props => props.paddingTop}px;
`
const ButtonArrowBack = styled.TouchableOpacity`

`
const ImageArrowBack = styled.Image`

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
const UpdateAvatar = styled.Image`
  position: absolute;
  width: 30px;
  height: 30px;
  background: #F2A54A;
  border-radius: 25px;
  margin-top: 70px;
  margin-left: 70px;
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
const ButtonAction = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`
const BackgroundButtonAction = styled.TouchableOpacity`
  background-color: #F2A54A;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`
const BackgroundNonTouchAction =styled(BackgroundButtonAction)`
  background-color: #ffffff;
  border-style: solid;
  border-color: #bdbdbd;
  border-width: 0.5px
`
const ImageButtonAction = styled.Image`

`
const TextButtonAction = styled.Text`
  font-weight: 400;
  font-size: 11px;
  letter-spacing: -0.41px;
  color: #F2A54A;
  padding-top: 10px;
`
const TextOptions = styled.Text`
  font-weight: 400;
  font-size: 13px;
  letter-spacing: -0.41px;
  color: #333333;
  padding-bottom: 5px;
`
const TextNote = styled(TextOptions)`
  padding-top: 15px;
  padding-bottom:30px
`
const TextDelete = styled(TextOptions)`
  padding-top: 15px;
  color: #FF4A4A;
`
const PhoneInformation = styled.Text`
  font-weight: 400;
  font-size: 17px;
  letter-spacing: -0.41px;
  color: #2F80ED;
`
const ImageLine = styled.Image`
  width: 100%;
  height: 2px;
`


