import * as React from 'react';
import {memo} from 'react';

import {FlatList, View} from 'react-native';
import styled from "styled-components/native";
import {IC_INFO_ICON, IC_LINE, IC_SMALL_CALL} from "../assets";
import 'react-native-gesture-handler';

const Item = ({name, phone, status}) => (
    <SectionList>
        <ItemList>
            <InfoPart >
                <CallIcon>
                    <CallIconImage
                        source={IC_SMALL_CALL}
                    />
                </CallIcon>
                <TextItem>
                    <NameItem>
                        {name}
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
    const renderItem = ({item}) => (
        <Item
            name={item.name}
            phone={item.phone}
            status={item.status}
        />
    )
    return (
        <Container>
            <ContentContainer>
                <FlatList
                    data={contacts}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                />
            </ContentContainer>
        </Container>
    )
})
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 25px;
`
const ContentContainer = styled.View`
`
const SectionList = styled.View`
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
const contacts = [
    {
        key: 'lCUTs2',
        name: "Nguyễn Tiến Nam",
        phone: "0977272123",
        status: "Hôm Nay"
    },
    {
        key: 'sddsf45',
        name: "Nguyễn Tiến Nam",
        phone: "0977272123",
        status: "Hôm Nay"
    },
    {
        key: 'dsf45',
        name: "Nguyễn Tiến Nam",
        phone: "0977272123",
        status: "Hôm Nay"
    },
    {
        key: 'qwe32',
        name: "Nguyễn Tiến Nam",
        phone: "0977272123",
        status: "Hôm Nay"
    },
    {
        key: 'fdsdf1',
        name: "Nguyễn Tiến Nam",
        phone: "0977272123",
        status: "Hôm Nay"
    },
    {
        key: '23fd',
        name: "Nguyễn Tiến Nam",
        phone: "0977272123",
        status: "Hôm Nay"
    },
    {
        key: '2few',
        name: "Nguyễn Tiến Nam",
        phone: "0977272123",
        status: "Hôm Nay"
    },
    {
        key: 'sdfew',
        name: "Nguyễn Tiến Nam",
        phone: "0977272123",
        status: "Hôm Nay"
    },

];