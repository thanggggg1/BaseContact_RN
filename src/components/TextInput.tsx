import * as React from 'react';
import {memo} from 'react';
import {TextInputProps} from "react-native";
import styled from "styled-components/native";

interface CustomInputProps extends TextInputProps {
    keyName: string,
    onValueChange: (keyName: string, value: string) => void,

}

export const InputInfo = memo((props: CustomInputProps) => {
    const {keyName, onValueChange, ...remainingProps} = props;
    const onChangeText = (value: string) => {
        onValueChange(keyName, value)
    };
    return (
        <InputItem>
            <TextInfo
                onChangeText={onChangeText}
                {...remainingProps}
            />
        </InputItem>
    )
})
const InputItem = styled.View`
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 0.5px;
`
const TextInfo = styled.TextInput`
  background-color: white;
  margin-top: 20px;
  color: #333;
  padding-bottom: 10px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`