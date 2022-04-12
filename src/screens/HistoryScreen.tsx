import * as React from 'react';
import {memo, useEffect, useState} from 'react';

import {FlatList} from 'react-native';
import styled from "styled-components/native";
import {IC_EMAIL, IC_INFO_ICON, IC_SMALL_CALL} from "../assets";
import 'react-native-gesture-handler';
import {useContacts} from "../store/redux";
import {RawContact} from "../utils/type";
import {useIsFocused} from '@react-navigation/native';

const Item = ({firstname, lastname, phone, action, time, totalAction}) => (
    <SectionList>
        <CallIcon>
            <CallIconImage
                source={action == 'CallAction' ? IC_SMALL_CALL : IC_EMAIL}
            />
        </CallIcon>
        <ItemList>
            <InfoPart>
                <TextItem>
                    {totalAction == 1 ?
                        <NameItem>
                            {firstname} {lastname}
                        </NameItem> :
                        <NameItem>
                            {firstname} {lastname} ({totalAction})
                        </NameItem>}
                    <PhoneItem>
                        {phone}
                    </PhoneItem>
                </TextItem>
            </InfoPart>
            <StatusPart>
                <StatusItem>
                    <TextStatusItem>
                        {time}
                    </TextStatusItem>
                </StatusItem>
                <InfoIcon>
                    <InfoIconImage source={IC_INFO_ICON}/>
                </InfoIcon>
            </StatusPart>
        </ItemList>
    </SectionList>
)

export const HistoryScreen = memo(function History() {
    const isFocused = useIsFocused();
    const [historyList, setHistoryList] = useState([])
    const newContacts = useContacts();

    useEffect(() => {
        const newData: RawContact[] = Object.values(newContacts.byKey)
        const data = newData.filter(item => {
            return item.historyLog != '';
        })
        const sorted = data.sort((a: RawContact, b: RawContact) => {
            const dateA = `${a.historyLog}`.valueOf();
            const dateB = `${b.historyLog}`.valueOf();
            if (dateA > dateB) {
                return -1;
            }
            return 1
        });
        setHistoryList(sorted)
    }, [isFocused])

    const renderItem = ({item}) => (
        <Item
            firstname={item.firstname}
            lastname={item.lastname}
            phone={item.phone[item.phone.length - 1]}
            action={item.actionLog}
            time={item.historyLog}
            totalAction={item.totalAction}
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
  flex-direction: row;
  margin-bottom: 10px;
  margin-left: 20px;
`
const InfoPart = styled.View`
`
const StatusPart = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
`
const ItemList = styled.View`
  flex: auto;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`
const TextItem = styled.View`
`
const NameItem = styled.Text`
  font-weight: bold;
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
  padding-left: 3px;
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
const InfoIcon = styled.TouchableOpacity`
`
const InfoIconImage = styled.Image`
  width: 24px;
  height: 24px;
`
