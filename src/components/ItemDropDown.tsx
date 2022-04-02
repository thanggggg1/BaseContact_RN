import * as React from 'react';
import {memo} from 'react';
import styled from "styled-components/native";
import {IC_CONTACT} from "../assets";
interface Props {
    title: string
}
export const ItemDropDown = memo(function ItemDropDown(props: Props) {
    return (
        <ItemDropdown>
            <ButtonContact>
                <ImageContact source={IC_CONTACT}/>
            </ButtonContact>
            <TextContact>{props.title}</TextContact>
        </ItemDropdown>
    )
})
const CollectionsButton = styled.View`
  background: rgba(242, 165, 74, 0.1);
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`
const ItemDropdown = styled(CollectionsButton)`
  background: white;
  flex-direction: row;
  height: 44px;
  align-items: center;
  padding-left: 18px;
`
const ButtonContact = styled.TouchableOpacity`

`
const ImageContact = styled.Image`

`
const TextContact = styled.Text`
  padding-left: 14px;
`

