import * as React from "react";
import {memo} from "react";
import styled from "styled-components/native";


interface Props {
    title: string,
    image_url:any,
    onPress : () => void
}
export const NonActiveActionButton = memo( function NonActiveActionButton(props:Props){
    const {title, image_url,onPress} = props;
    return (
        <ButtonAction onPress={onPress}
        disabled={true}>
            <BackgroundNonTouchAction>
                <ImageButtonAction source={image_url}/>
            </BackgroundNonTouchAction>
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
const BackgroundNonTouchAction = styled(BackgroundButtonAction)`
  background-color: #ffffff;
  border-style: solid;
  border-color: #bdbdbd;
  border-width: 0.5px
`
const ImageButtonAction = styled.Image`

`
const TextButtonAction = styled.Text`
  font-weight: 400;
  font-size: 11px;
  letter-spacing: -0.41px;
  color: #BDBDBD;
  padding-top: 10px;
`
