import * as React from 'react';
import {memo, useCallback, useEffect, useState} from 'react';
import {TextInputProps, View} from "react-native";
import styled from "styled-components/native";
import {IC_ADD_GREEN_BUTTON, IC_REMOVE} from "../assets";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

interface CustomInputProps extends TextInputProps {
    title: string,
    keyName: string,
    data: any,
    setParams: (prev: any) => void,
}

export const InputInfoDate = memo((props: CustomInputProps) => {
    let {title, keyName, data, setParams} = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!data) {
            return
        }
        setIsActive(true)
    }, [data])

    const showDatePicker = useCallback(() => {
        setDatePickerVisibility(true);
    }, [isDatePickerVisible])

    const hideDatePicker = useCallback(() => {
        setDatePickerVisibility(false);
    }, [isDatePickerVisible])

    const handleConfirm = useCallback((keyName: string, val: Date) => {
        setParams(prevValue => ({
            ...prevValue,
            [keyName]: val
        }))
        hideDatePicker();
        setIsActive(!isActive)
    }, [keyName, isActive])

    const onDelete = useCallback(() => {
        setIsActive(!isActive)
    }, [isActive])

    const onConfirmDate = useCallback((date: Date) => {
        handleConfirm(keyName, date)
    }, [keyName])

    return (
        <Container>
            {isActive && data ? <View>
                <ItemAdd>
                    <ItemButtonAdd>
                        <RemoveButton onPress={onDelete}>
                            <ImageRemoveButton source={IC_REMOVE}/>
                        </RemoveButton>
                    </ItemButtonAdd>
                    <AddItem>
                        <TextInfo>{moment(data).format('DD-MM-YYYY')}</TextInfo>
                    </AddItem>
                </ItemAdd>
            </View> : null}
            {isActive ? null :
                <ItemAdd onPress={showDatePicker}>
                    <ItemButtonAdd>
                        <ImageAddButton source={IC_ADD_GREEN_BUTTON}/>
                    </ItemButtonAdd>
                    <AddItem>
                        <TextInfo>
                            {title}
                        </TextInfo>
                    </AddItem>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={onConfirmDate}
                        onCancel={hideDatePicker}
                    />
                </ItemAdd>}
        </Container>
    )
})

const Container = styled.View`
  flex: auto;
  background-color: #ffffff;
  padding-top: 10px;
`
const ItemAdd = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
  margin-left: 15px;
  padding-bottom: 10px;
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
const TextInfo = styled.Text`
  margin-left: 15px;
  font-size: 13px;
  color: #333333;
  background-color: white;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  letter-spacing: -0.41px;
`
const ImageRemoveButton = styled.Image`
  width: 23px;
  height: 4px;
  position: absolute;
  left: 1px;
`
