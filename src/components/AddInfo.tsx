import * as React from 'react';
import {memo, useState} from 'react';
import styled from "styled-components/native";
import {IC_ADDGREENBUTTON, IC_LINE} from "../assets";
import {View} from "react-native";

export const AddInfo = memo(function AddInfo(props: any) {
    const [textInputInfos, setTextInputInfo] = useState([])
    const AddItemInput = () => {
        const newAddInput = {
            id: Math.random()
        }
        setTextInputInfo([...textInputInfos, newAddInput]);
    }
    const PrintItemInput = () => {
        return textInputInfos.map((item, key) => (
            <ItemInput textInputInfo={item} key={key}/>
        ))
    }
    const DeleteInput = inputid => {
        const newAddInputs = textInputInfos.filter(item => item.id != inputid);
        setTextInputInfo(newAddInputs);
    }
    const ItemInput = ({textInputInfo}) => {
        return (
            <ItemAdd>
                <ItemButtonAdd>
                    <RemoveButton onPress={() => DeleteInput(textInputInfo.id)}>
                        <ImageRemoveButton source={IC_LINE}/>
                    </RemoveButton>
                </ItemButtonAdd>
                <AddItem>
                    <TextAddInfo
                        placeholder="" placeholderTextColor={'#333333'} autoFocus={true}>
                    </TextAddInfo>
                </AddItem>
            </ItemAdd>
        )
    }

    return (
        <View>
            {PrintItemInput()}
            <ItemAdd>
                <ItemButtonAdd onPress={AddItemInput}>
                    <ImageAddButton source={IC_ADDGREENBUTTON}/>
                </ItemButtonAdd>
                <AddItem>
                    <TextAddInfo
                        placeholder={props.name} placeholderTextColor={'#333333'}>
                    </TextAddInfo>
                </AddItem>
            </ItemAdd>
        </View>

    )
})
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
  color: #2F80ED;
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