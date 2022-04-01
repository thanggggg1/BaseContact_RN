import * as React from 'react';
import {memo, useState} from 'react';
import {TouchableOpacity, View, Text, Dimensions, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import styled from "styled-components/native";
import {IC_LINE, IC_PROFILE, IC_SEARCH} from "../assets";
import {useContacts} from "../store/redux";
import {useNavigation, useRoute} from "@react-navigation/native";
import {AlphabetList} from "react-native-section-alphabet-list";
import FastImage from 'react-native-fast-image'
import {useDrawerStatus} from "@react-navigation/drawer";
import {nonAccentVietnamese} from "../utils/nonAccentVietnamese";
import {RawContact} from "../utils/type";

export const ContactScreen = memo(function Contact() {
    const navigation: any = useNavigation()
    const newContact = useContacts();
    const isDrawer = useDrawerStatus();
    const [search, setSearch] = useState('')
    const [filteredList, setFilteredList] = useState([])
    const searchFilter = (str) => {
        const text=nonAccentVietnamese(str)
        if(text) {
            const newData:RawContact[] = Object.values(newContact.byKey)
            const Data = newData.filter(item => {
                return item.searchField.includes(text)
            })
            setFilteredList(Data)
            setSearch(str)
        }
        else {
            setFilteredList(Object.values(newContact.byKey));
            setSearch(str)
        }
    }
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? 'padding': null} keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
            <Container>
                <SearchWrap>
                    <SearchIcon source={IC_SEARCH}/>
                    <SearchBar
                        placeholder="Tìm kiếm danh bạ"
                        placeholderTextColor="#444"
                        onChangeText={text => {searchFilter(text)}
                        }
                        value={search}
                    />
                </SearchWrap>
                <ContentContainer>
                    <View>
                        <AlphabetList
                            data={search ? filteredList : Object.values(newContact.byKey)}
                            indexContainerStyle={{
                                marginRight: 10,
                            }}
                            indexLetterStyle={isDrawer == "closed" ? {
                                color: '#f2a54a',
                                fontSize: 12,
                                fontWeight: "400",
                                letterSpacing: 5,
                            } : {
                                color: '#C4C4C4',
                                fontSize: 12,
                                fontWeight: "400",
                                letterSpacing: 5,
                            }}
                            renderCustomItem={(item: any) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ContactDetails", {paramKey: item.key})}
                                >
                                    <ItemList>
                                        <AvatarItem source={item.avatar == "" ? IC_PROFILE : {uri: item.avatar}}
                                                    style={{resizeMode: 'cover'}}/>
                                        <TextItem>
                                            <NameItem>{item.firstname} {item.value} </NameItem>
                                            <PhoneItem>{item.phone[item.phone.length-1]}</PhoneItem>
                                        </TextItem>
                                    </ItemList>
                                </TouchableOpacity>
                            )}
                            renderCustomSectionHeader={(section) => (
                                <BarTitle>
                                    <Background/>
                                    <TextTitle>{section.title}</TextTitle>
                                </BarTitle>
                            )}
                        />
                    </View>
                </ContentContainer>
            </Container>
        </KeyboardAvoidingView>
    )
})
const width = Dimensions.get("window").width

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`
const SearchWrap = styled.View`
  background: #F2F2F2;
  opacity: 0.5;
  border-radius: 6px;
  height: 36px;
  left: 10px;
  top: 20px;
  align-items: center;
  flex-direction: row;
  padding-right: 10px;
  margin-bottom: -50px;
`
const SearchIcon = styled.Image`
  height: 16px;
  width: 16px;
  margin: 0 10px;
`
const SearchBar = styled.TextInput`
  font-weight: 200;
  font-size: 13px;
  letter-spacing: 0.12px;
  color: #333;
  flex: auto;
`
const ContentContainer = styled.View`
  margin-top: 80px;
  padding-right: 0;
`
const ItemList = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 20px;
  flex-direction: row;
  margin-bottom: -5px;
  margin-top: 5px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0,0.1);
`
const TextItem = styled.View`
  padding-left: 20px;
`
const NameItem = styled.Text`
  font-size: 16px;
  letter-spacing: 0.12px;
  color: #333333;
  padding-bottom: 5px;
  font-weight: 500;
`
const PhoneItem = styled.Text`
  font-size: 14px;
  color: #828282;
`
const AvatarItem = styled(FastImage)`
  width: 40px;
  height: 40px;
  border-radius: 25px;
`
const BarTitle = styled.View`
  justify-content: center;
  height: 40px;
  background-color: white;
`
const TextTitle = styled.Text`
  padding-left: 20px;
  color: black;
  font-size: 14px;
  font-weight: bold;
`
const Background = styled.View`
  background: #E0E0E0;
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`


