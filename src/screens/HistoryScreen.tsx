import * as React from 'react';
import {memo} from 'react';

import {FlatList, View} from 'react-native';
import styled from "styled-components/native";
import {IC_INFOICON, IC_LINE, IC_SMALLCALL} from "../assets";
import 'react-native-gesture-handler';

const Item = ({name, phone, status}) => (
    <SectionList>
        <ItemList>
            <View style={{flexDirection: "row"}}>
                <CallIcon>
                    <CallIconImage
                        source={IC_SMALLCALL}
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
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <StatusItem>
                    <TextStatusItem>
                        {status}
                    </TextStatusItem>
                </StatusItem>
                <InfoIcon>
                    <InfoIconImage source={IC_INFOICON}/>
                </InfoIcon>
            </View>
        </ItemList>
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
`
const ContentContainer = styled.View`
`
const SectionList = styled.View`
  margin-top: 20px;
`
const ItemList = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  margin-left: 15px;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0,0.1);
`
const TextItem = styled.View`
  padding-left: 15px;
`
const NameItem = styled.Text`
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.12px;
  color: #333333;
`
const PhoneItem = styled.Text`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.12px;
  color: #828282;
  padding-top: 10px;
`
const StatusItem = styled.View`
  padding-top: 10px;
  padding-right: 20px;
`
const TextStatusItem = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: right;
  letter-spacing: 0.12px;
  color: #828282;
  padding-bottom: 10px;
`
const CallIcon = styled.TouchableOpacity`

`
const CallIconImage = styled.Image`
  width: 20px;
  height: 20px;
`
const InfoIcon = styled.TouchableOpacity`
  padding-right: 20px;
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