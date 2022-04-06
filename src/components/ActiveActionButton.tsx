import {memo} from "react";
import {IC_CALL_BUTTON} from "../assets";
import * as React from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";


interface Props {
    title: string,
    image_url:any,
    onPress : () => void
}
export const ActiveActionButton = memo( function ActiveActionButton(props:Props){
    const {title, image_url,onPress} = props;
    return (
        <ButtonAction onPress={onPress}>
            <BackgroundButtonAction>
                <ImageButtonAction source={image_url}/>
            </BackgroundButtonAction>
            <TextButtonAction>
                {title}
            </TextButtonAction>
        </ButtonAction>
    )
})

const ButtonAction = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`
const BackgroundButtonAction = styled.View`
  background-color: #F2A54A;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`

const ImageButtonAction = styled.Image`
tint-color:white;
`
const TextButtonAction = styled.Text`
  font-weight: 400;
  font-size: 11px;
  letter-spacing: -0.41px;
  color: #F2A54A;
  padding-top: 10px;
`
