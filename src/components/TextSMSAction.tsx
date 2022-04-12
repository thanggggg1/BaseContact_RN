import * as React from "react";
import {memo, useCallback, useState} from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import {Linking, Platform, TouchableOpacity, View} from "react-native";
import {Facetime} from 'react-native-openanything';
import call from 'react-native-phone-call'

interface Props {
    item:string,
    index:number,
    image_url:any,
    keyName:string,
    triggerCall :(item:string)=>void,
    sendSMS : (item:string)=>void,
    faceTime:(item:string)=>void,
    sendEmail:(item:string)=>void
}

const ItemAction = memo((props:Props)=>{
    const {item,index,image_url,keyName,triggerCall,sendSMS,faceTime,sendEmail}=props
    const onAction = useCallback((keyName:string,value:string)=>{
        switch (keyName){
            case 'CallAction':{
                triggerCall(value)
                break;
            }
            case 'MessAction':{
                sendSMS(value)
                break;
            }
            case 'FacetimeAction':{
                faceTime(value)
                break;
            }
            case 'EmailAction':{
                sendEmail(value)
                break;
            }
        }
    },[])

    const onPress = useCallback(()=>{
        onAction(keyName,item)
    },[keyName,item])
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
    keyName:string,
    data:string[],
}

export const TextSMSAction = memo(function TextSMSAction(props: WrapProps) {
    const {title, image_url,keyName,data} = props;
    const [isModalVisible,setModalVisible]=useState(false)

    const _setModalVisible=useCallback(()=>{
        setModalVisible(!isModalVisible)
    },[isModalVisible])

    const onSendSMSMessage = useCallback(async (phoneNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phoneNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

    const triggerCall = useCallback((phonenumber: string) => {
        const args = {
            number: phonenumber,
            prompt: true,
        };
        call(args).catch(console.error);
    }, [])

    const sendSMS = useCallback((item: string) => {
        onSendSMSMessage(item, `xin chao`)
    }, [])

    const sendEmail = useCallback((item: string) => {
        Linking.openURL(`mailto:${item}?subject=mailsubject&body=mailbody`);
    }, [])

    const faceTime = useCallback((item: string) => {
        Facetime(item)
    }, [])

    const onButtonAction = useCallback((keyName:string)=>{
        if(data.length <=1) {
            switch (keyName){
                case 'CallAction':{
                    triggerCall(data[0])
                    break;
                }
                case 'MessAction' :{
                    sendSMS(data[0])
                    break;
                }
                case 'FacetimeAction' :{
                    faceTime(data[0])
                    break;
                }
                case 'EmailAction' :{
                    sendEmail(data[0])
                    break;
                }
            }
        }
        else {
            setModalVisible(!isModalVisible)
        }
    },[isModalVisible,data])

    const onPress = useCallback(()=>{
        onButtonAction(keyName)
    },[])

    return (
        <View>
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
            <TouchableOpacity onPress={onPress}>
                <TextMessage>
                    Gửi tin nhắn
                </TextMessage>
            </TouchableOpacity>
        </View>
    )
})
const SelectionList = styled.View`
  padding: 0 20px;
  width:100%;
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
const TextAction=styled.Text`
    padding-bottom: 10px;
`
const IconAction = styled.Image`
`
const TextMessage = styled.Text`
  font-size: 15px;
  letter-spacing: -0.41px;
  color: #333333;
  padding-bottom: 5px;
  padding-top: 15px;
`
