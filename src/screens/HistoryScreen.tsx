import * as React from 'react';
import {memo, useCallback, useEffect, useState} from 'react';

import {FlatList, SafeAreaView, View} from 'react-native';
import styled from "styled-components/native";
import {IC_EMAIL, IC_INFO_ICON, IC_LINE, IC_SMALL_CALL} from "../assets";
import 'react-native-gesture-handler';
import {useContacts} from "../store/redux";
import {RawContact} from "../utils/type";
import { useIsFocused } from '@react-navigation/native';

const Item = ({firstname,lastname, phone, status,action}) => (
    <SectionList>
        <ItemList>
            <InfoPart>
                <CallIcon>
                    <CallIconImage
                        source={ action =='CallAction' ? IC_SMALL_CALL : IC_EMAIL}
                    />
                </CallIcon>
                <TextItem>
                    <NameItem>
                        {firstname} {lastname}
                    </NameItem>
                    <PhoneItem>
                        {phone}
                    </PhoneItem>
                </TextItem>
            </InfoPart>
            <StatusPart>
                <StatusItem>
                    <TextStatusItem>
                        {status}
                    </TextStatusItem>
                </StatusItem>
                <InfoIcon>
                    <InfoIconImage source={IC_INFO_ICON}/>
                </InfoIcon>
            </StatusPart>
        </ItemList>
        <View>
            <LineIconImage source={IC_LINE}/>
        </View>
    </SectionList>
)
export const HistoryScreen = memo(function History() {
    const isFocused = useIsFocused();
    const [historyList,setHistoryList]=useState([])
    const newContacts = useContacts();
    useEffect(()=>{
        const newData: RawContact[] = Object.values(newContacts.byKey)
        const data=newData.filter(item => {
            return item.historyLog!='';
        })
        setHistoryList(data)
    },[isFocused])
    const renderItem = ({item}) => (
        <Item
            firstname={item.firstname}
            lastname={item.lastname}
            phone={item.phone[item.phone.length-1]}
            status={'Hôm nay'}
            action={item.historyLog}
        />
    )
    return (
        <Container>
            <FlatList
                    data={historyList}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                />
        </Container>
    )
})
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 25px;
`
const SectionList = styled.TouchableOpacity`
  margin-bottom: 10px;
  margin-left: 20px;
`
const InfoPart = styled.View`
  flex-direction: row;
`
const StatusPart = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
`
const ItemList = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const TextItem = styled.View`
`
const NameItem = styled.Text`
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.12px;
  color: #333333;
  padding-bottom: 10px;
`
const PhoneItem = styled.Text`
  font-size: 14px;
  letter-spacing: 0.12px;
  color: #828282;
  padding-bottom: 10px;
`
const StatusItem = styled.View`

`
const TextStatusItem = styled.Text`
  font-size: 13px;
  text-align: right;
  letter-spacing: 0.12px;
  color: #828282;
  padding-right: 20px;
`
const CallIcon = styled.TouchableOpacity`
  padding-right: 15px;
`
const CallIconImage = styled.Image`
  width: 20px;
  height: 20px;
`
const LineIconImage = styled.Image`
  height: 2px;
  width: 100%;
  margin-left: 30px;
`
const InfoIcon = styled.TouchableOpacity`
`
const InfoIconImage = styled.Image`
  width: 24px;
  height: 24px;
`
