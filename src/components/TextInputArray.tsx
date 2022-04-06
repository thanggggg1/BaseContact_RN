import * as React from 'react';
import {memo, useCallback} from 'react';
import {TextInputProps, View} from "react-native";
import styled from "styled-components/native";
import {IC_ADD_GREEN_BUTTON, IC_REMOVE} from "../assets";

interface Props{
    keyName:string,
    index:number,
    onDelete:(keyName:string,index:number) => void,
    _onInfoChange:(keyName:string, index:number, value:string) => void,
    data:string[],
    title:string,
    typeKeyboard:any
}
const Item =memo((props:Props)=>{
    const {keyName, index,onDelete,_onInfoChange,data,title,typeKeyboard} = props
    const onInfoChange = useCallback((value)=>{
        _onInfoChange(keyName, index, value)
    },[])
    return(
        <ItemAdd>
            <ItemButtonAdd>
                <RemoveButton onPress={() => {
                    onDelete(keyName, index)
                }}>
                    <ImageRemoveButton source={IC_REMOVE}/>
                </RemoveButton>
            </ItemButtonAdd>
            <AddItem>
                <TextAddInfo
                    onChangeText={onInfoChange}
                    placeholderTextColor={'#BDBDBD'}
                    autoFocus={true}
                    value={data[index]}
                    placeholder={title}
                    keyboardType={typeKeyboard}
                >
                </TextAddInfo>
            </AddItem>
        </ItemAdd>
    )
})

interface CustomInputProps extends TextInputProps {
    title: string,
    keyName: string,
    data: string[],
    typeKeyboard: any,
    setParams: (prev: any) => void,
}

export const InputInfoArr = memo((props: CustomInputProps) => {
    const {title, keyName, data, setParams, typeKeyboard} = props;
    const onInfoChange = useCallback((keyName: string, index: number, value: string) => {
        setParams(prev => {
            let dataInput = [...prev[keyName]]
            dataInput[index] = value;
            return {...prev, [keyName]: dataInput}
        })
    }, [])
    const onAddInput = useCallback((keyName: string) => {
        setParams(prev => {
            let newDataInput = [...prev[keyName]];
            newDataInput.push('')
            return {...prev, [keyName]: newDataInput}
        })
    }, [data])
    const onDelete = useCallback((keyName: string, index: number) => {
        setParams(prev => {
            let removeData = [...prev[keyName]]
            removeData.splice(index, 1)
            return {...prev, [keyName]: removeData}
        })
    }, [])
    return (
        <Container>
            {data.map((item, index) => {
                return (
                    <View key={index}>
                        <Item keyName={keyName} index={index} onDelete={onDelete} _onInfoChange={onInfoChange} data={data} title={title} typeKeyboard={typeKeyboard}/>
                    </View>
                )
            })}
            <ItemAdd onPress={() => {
                onAddInput(keyName)
            }}>
                <ItemButtonAdd>
                    <ImageAddButton source={IC_ADD_GREEN_BUTTON}/>
                </ItemButtonAdd>
                <AddItem>
                    <TextInfo>
                        {title}
                    </TextInfo>
                </AddItem>
            </ItemAdd>
        </Container>
    )
})
const Container = styled.View`
  flex: auto;
  background-color: #ffffff;
  margin-bottom: 25px;
`
const ItemAdd = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
  margin-left: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
`
const ItemButtonAdd = styled.View`
  width: 24px;
  height: 24px;
`
const ImageAddButton = styled.Image`
  width: 24px;
  height: 24px;
`
const RemoveButton = styled.TouchableOpacity`
  background: red;
  width: 24px;
  height: 24px;
  border-radius: 20px;
  z-index: -1;
  justify-content: center;
`
const AddItem = styled.View`

`
const TextAddInfo = styled.TextInput`
  margin-left: 15px;
  font-size: 13px;
  color: #2F80ED;
  background-color: white;
  letter-spacing: -0.41px;
`
const TextInfo = styled.Text`
  margin-left: 15px;
  font-size: 13px;
  color: #333333;
  background-color: white;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  letter-spacing: -0.41px;
`
const TextValidEmail = styled.Text`
  margin-left: 15px;
  font-size: 13px;
  color: red;
  background-color: white;
  letter-spacing: -0.41px;
`
const ImageRemoveButton = styled.Image`
  width: 23px;
  height: 4px;
  position: absolute;
  left: 1px;
`