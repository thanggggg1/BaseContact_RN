import {memo, useCallback} from "react";
import {IC_SMALL_CALL} from "../assets";
import Modal from "react-native-modal";
import * as React from "react";
import styled from "styled-components/native";

interface Props {
    item:string,
    index:number,
    _onMakeAction : (item:string) =>void,
    image_url:any
}
const ItemAction = memo((props:Props)=>{
    const {item,index,_onMakeAction,image_url}=props
    const onMakeCall= useCallback(()=>{
        _onMakeAction(item)
    },[])
    return (
        <ItemList key={index} onPress={onMakeCall}>
            <TextAction>
                {item}
            </TextAction>
            <IconAction source={image_url}/>
        </ItemList>
    )
})

interface WrapProps {
  isModalVisible:boolean,
  setModalVisible:(value:boolean)=>void,
  data:string[],
    _onMakeAction : (item:string)=>void,
    title:string,
    _image_url:any
}

export const ModalPopUp =memo(function ModalPopUp(props:WrapProps){
    const {isModalVisible,setModalVisible,data,_onMakeAction,title,_image_url}=props
    const _setModalVisible = useCallback(()=>{
        setModalVisible(false)
    },[])
    return (
        <Modal isVisible={isModalVisible}
               onBackdropPress={_setModalVisible}>
            <SelectionList>
                <TextSelection>{title}</TextSelection>
                {data?.map((item, index) => {
                    return (
                        <ItemAction key={index} item={item} index={index} _onMakeAction={_onMakeAction} image_url={_image_url}/>
                    )
                })}
            </SelectionList>
        </Modal>
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

