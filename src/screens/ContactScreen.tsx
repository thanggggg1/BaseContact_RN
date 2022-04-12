import * as React from 'react';
import {memo, useCallback, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import styled from "styled-components/native";
import {IC_PROFILE, IC_SEARCH} from "../assets";
import {useContacts} from "../store/redux";
import {useNavigation} from "@react-navigation/native";
import {AlphabetList} from "react-native-section-alphabet-list";
import FastImage from 'react-native-fast-image'
import {useDrawerStatus} from "@react-navigation/drawer";
import {nonAccentVietnamese} from "../utils/nonAccentVietnamese";
import {RawContact} from "../utils/type";
import KeyboardSpacer from 'react-native-keyboard-spacer';

const BarSection = memo((props:any)=>{
    return(
        <BarTitle>
            <Background/>
            <TextTitle>{props.section.title}</TextTitle>
        </BarTitle>
    )
})
const Item = memo((props:any)=>{
    const navigation:any=useNavigation();

    const onPress = useCallback(()=>{
        navigation.navigate("ContactDetails", {paramKey: props.item.key})
    },[])

  return(
      <TouchableOpacity onPress={onPress}>
              <ItemList>
              <AvatarItem source={props.item.avatar == "" ? IC_PROFILE : {uri: props.item.avatar}}
              />
              <TextItem>
                  <NameItem>{props.item.firstname} {props.item.lastname} </NameItem>
                  <PhoneItem>{props.item.phone[props.item.phone.length - 1]}</PhoneItem>
              </TextItem>
              </ItemList>
      </TouchableOpacity>
  )
})

export const ContactScreen = memo(function Contact() {
    const newContact = useContacts();
    const isDrawer = useDrawerStatus();
    const [search, setSearch] = useState('')
    const [filteredList, setFilteredList] = useState([])

    const searchFilter = useCallback((str:string)=>{
        const text = nonAccentVietnamese(str)
        if (text) {
            const newData: RawContact[] = Object.values(newContact.byKey)
            const Data = newData.filter(item => {
                return item.searchField.includes(text)
            })
            setFilteredList(Data)
            setSearch(str)
        } else {
            setFilteredList(Object.values(newContact.byKey));
            setSearch(str)
        }
    },[newContact?.byKey])
    return (
            <Container>
                <SearchWrap>
                    <SearchIcon source={IC_SEARCH}/>
                    <SearchBar
                        placeholder="Tìm kiếm danh bạ"
                        placeholderTextColor={'rgba(189, 189, 189, 0.5)'}
                        onChangeText={searchFilter}
                        value={search}
                    />
                </SearchWrap>
                <ContentContainer>
                        <AlphabetList
                            bounces={false}
                            data={search ? filteredList : Object.values(newContact.byKey)}
                            indexContainerStyle={styles.indexContainerStyle}
                            indexLetterStyle={isDrawer === "closed" ? styles.indexLetterStyleDrawer : styles.indexLetterStyle}
                            renderCustomItem={(item) => (
                                <Item item={item}/>
                            )}
                            renderCustomSectionHeader={(section) => (
                                <BarSection section={section}/>
                            )}
                        />
                    <KeyboardSpacer/>
                </ContentContainer>
            </Container>
    )
})

const styles = StyleSheet.create({
    indexLetterStyleDrawer: {
        color: '#f2a54a',
        fontSize: 12,
    },
    indexLetterStyle: {
        color: '#C4C4C4',
        fontSize: 12,
    },
    indexContainerStyle :{
        marginRight: 10
    }
});

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`
const SearchWrap = styled.View`
  background: #F2F2F2;
  border-radius: 6px;
  height: 36px;
  left: 10px;
  top: 20px;
  align-items: center;
  flex-direction: row;
  padding-right: 10px;
  margin-bottom: -45px;
  margin-right: 20px;
`
const SearchIcon = styled.Image`
  height: 16px;
  width: 16px;
  margin: 0 10px;
`
const SearchBar = styled.TextInput`
  font-size: 13px;
  letter-spacing: 0.12px;
  color: #21130d;
  flex: auto;
`
const ContentContainer = styled.ScrollView`
  margin-top: 80px;
  padding-right: 0;
`
const ItemList = styled.View`
  padding-top: 10px;
  margin-left: 20px;
  flex-direction: row;
  margin-top: 5px;
`
const TextItem = styled.View`
  flex: auto;
  margin-left: 20px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
`
const NameItem = styled.Text`
  font-size: 16px;
  color: #333333;
  padding-bottom: 5px;
  font-weight: bold;
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
  margin-top: -5px;
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


