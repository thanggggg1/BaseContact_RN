import * as React from 'react';
import {memo, useCallback} from 'react';
import {TextInputProps, View} from "react-native";
import styled from "styled-components/native";
import {IC_ADD_GREEN_BUTTON, IC_LINE} from "../assets";
interface CustomInputProps extends TextInputProps {
    title:string,
    keyName: string,
    data : string[],
    setParams: (prev :any) => void
}
export const InputInfoArr = memo((props: CustomInputProps) => {
    const {title,keyName,data,setParams, ...remainingProps} = props;
    const onInfoChange = useCallback((keyName:string,index:number,value:string) => {
        setParams(prev => {
            let dataInput = [...prev[keyName]]
            dataInput[index] = value;
            return {...prev,[keyName]:dataInput}
        })
    },[data])
    const onAddInput = useCallback( (keyName:string) => {
        setParams(prev =>{
            let newDataInput = [...prev[keyName]];
            newDataInput.push('')
            return {...prev,[keyName]:newDataInput}
        })
    },[data])
    const onDelete = useCallback( (keyName:string,index:number) => {
        setParams(prev => {
            let removeData=[...prev[keyName]]
            removeData.splice(index,1)
            return {...prev,[keyName]:removeData}
        })
    },[])
    return (
        <Container>
            {data.map((item,index) => {
                console.log('item',item)
                return (
                    <View key={index}>
                        <ItemAdd>
                            <ItemButtonAdd>
                                <RemoveButton onPress={()=>{onDelete(keyName,index)}}>
                                    <ImageRemoveButton source={IC_LINE}/>
                                </RemoveButton>
                            </ItemButtonAdd>
                            <AddItem>
                                <TextAddInfo
                                    onChangeText={(text) => onInfoChange(keyName,index,text)}
                                    placeholderTextColor={'#333333'}
                                    autoFocus={true}
                                    value={data[index]}
                                >
                                </TextAddInfo>
                            </AddItem>
                        </ItemAdd>
                    </View>
                )
            })}
            <ItemAdd>
                <ItemButtonAdd onPress={()=>{onAddInput(keyName)}}>
                    <ImageAddButton source={IC_ADD_GREEN_BUTTON}/>
                </ItemButtonAdd>
                <AddItem>
                    <TextAddInfo>
                        {title}
                    </TextAddInfo>
                </AddItem>
            </ItemAdd>
        </Container>
    )
})
const Container = styled.View`
  flex: auto;
  background-color: #ffffff;
`
const ItemAdd = styled.View`
  padding-top: 10px;
  flex-direction: row;
align-items: center;
  margin-top: 20px;
`
const ItemButtonAdd = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-left: 15px;
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
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 0.5px;
  flex: auto;
`
const TextAddInfo = styled.TextInput`
  margin-left: 15px;
  font-size: 13px;
  color: #333333;
  background-color: white;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  letter-spacing: -0.41px;
  text-transform: lowercase;
  padding-bottom: 10px;
  padding-top: 10px;
`
const ImageRemoveButton = styled.Image`
  width: 23px;
  height: 4px;
  position: absolute;
  left: 1px;
`