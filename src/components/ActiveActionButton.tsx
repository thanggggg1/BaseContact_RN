import * as React from "react";
import {memo, useCallback, useState} from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import {Linking, Platform} from "react-native";
import {Facetime} from 'react-native-openanything';
import call from 'react-native-phone-call'
import {RawContact} from "../utils/type";
import {updateContactHistoryLog, updateContactTotalAction} from "../store/redux";

interface Props {
    item: string,
    index: number,
    image_url: any,
    keyName: string,
    triggerCall: (item: string) => void,
    sendSMS: (item: string) => void,
    faceTime: (item: string) => void,
    sendEmail: (item: string) => void
}

const ItemAction = memo((props: Props) => {
    const {item, index, image_url, keyName, triggerCall, sendSMS, faceTime, sendEmail} = props
    const onAction = useCallback((keyName: string, value: string) => {
        switch (keyName) {
            case 'CallAction': {
                triggerCall(value)
                break;
            }
            case 'MessAction': {
                sendSMS(value)
                break;
            }
            case 'FacetimeAction': {
                faceTime(value)
                break;
            }
            case 'EmailAction': {
                sendEmail(value)
                break;
            }
        }
    }, [])

    const onPress = useCallback(() => {
        onAction(keyName, item)
    }, [])
    return (
        <ItemList key={index} onPress={onPress}>
            <TextAction>
                {item}
            </TextAction>
            <IconAction source={image_url}/>
        </ItemList>
    )
})

interface WrapProps {
    title: string,
    image_url: any,
    keyName: string,
    data: string[],
    wrapData: RawContact,
}

export const ActiveActionButton = memo(function ActiveActionButton(props: WrapProps) {
    const {title, image_url, keyName, data,wrapData} = props;
    const [isModalVisible, setModalVisible] = useState(false);

    const _setModalVisible = useCallback(() => {
        setModalVisible(!isModalVisible)
    }, [isModalVisible])

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
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const finalTime=hours + ':' +min
          updateContactHistoryLog(wrapData.key,'CallAction',`${finalTime}`);
          updateContactTotalAction(wrapData.key);
        call(args).catch(console.error);
    }, [])

    const sendSMS = useCallback((item: string) => {
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const finalTime=hours + ':' +min
        updateContactHistoryLog(wrapData.key,'MessAction',`${finalTime}`);
        updateContactTotalAction(wrapData.key);
        onSendSMSMessage(item, `xin chao`).then()
    }, [])

    const sendEmail = useCallback((item: string) => {
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const finalTime=hours + ':' +min
        updateContactHistoryLog(wrapData.key,'MessAction',`${finalTime}`);
        updateContactTotalAction(wrapData.key);
        Linking.openURL(`mailto:${item}?subject=mailSubject&body=mailBody`);
    }, [])

    const faceTime = useCallback((item: string) => {
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const finalTime=hours + ':' +min
        updateContactHistoryLog(wrapData.key,'CallAction',`${finalTime}`);
        updateContactTotalAction(wrapData.key);
        Facetime(item)
    }, [])

    const onButtonAction = useCallback((keyName: string) => {
        if (data.length <= 1) {
            switch (keyName) {
                case 'CallAction': {
                    triggerCall(data[0])
                    break;
                }
                case 'MessAction' : {
                    sendSMS(data[0])
                    break;
                }
                case 'FacetimeAction' : {
                    faceTime(data[0])
                    break;
                }
                case 'EmailAction' : {
                    sendEmail(data[0])
                    break;
                }
            }
        } else {
            setModalVisible(!isModalVisible)
        }
    }, [isModalVisible, data])

    const onPress = useCallback(() => {
        onButtonAction(keyName)
    }, [])

    return (
        <Container>
            <Modal isVisible={isModalVisible}
                   onBackdropPress={_setModalVisible}>
                <SelectionList>
                    <TextSelection>{title}</TextSelection>
                    {data?.map((item, index) => {
                        return (
                            <ItemAction
                                key={index}
                                item={item}
                                index={index}
                                image_url={image_url}
                                keyName={keyName}
                                triggerCall={triggerCall}
                                sendSMS={sendSMS}
                                sendEmail={sendEmail}
                                faceTime={faceTime}
                            />
                        )
                    })}
                </SelectionList>
            </Modal>
            <ButtonAction onPress={onPress}>
                <BackgroundButtonAction>
                    <ImageButtonAction source={image_url}/>
                </BackgroundButtonAction>
                <TextButtonAction>
                    {title}
                </TextButtonAction>
            </ButtonAction>
        </Container>
    )
})
const Container = styled.View`
  flex: 1;
`
const ButtonAction = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`
const BackgroundButtonAction = styled.View`
  background-color: #F2A54A;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`

const ImageButtonAction = styled.Image`
  tint-color: white;
`
const TextButtonAction = styled.Text`
  font-weight: 400;
  font-size: 11px;
  letter-spacing: -0.41px;
  color: #F2A54A;
  padding-top: 10px;
`

const SelectionList = styled.View`
  padding: 0 20px;
  width: 100%;
  height: 300px;
  background-color: white;
  border-radius: 25px;
`
const TextSelection = styled.Text`
  text-align: center;
  font-size: 20px;
  color: #f2a54a;
  padding-top: 10px;
  font-weight: bold;
`
const ItemList = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
  padding-top: 10px;
`
const TextAction = styled.Text`
  padding-bottom: 10px;
`
const IconAction = styled.Image`

`

