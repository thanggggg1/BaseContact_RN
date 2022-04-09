import * as React from 'react';
import {memo, useCallback} from 'react';
import {Dimensions, StatusBar} from 'react-native';
import styled from "styled-components/native";
import {IMG_LOGIN_BACKGROUND, IMG_LOGO_APP, IMG_LOGO_APP_SMALL} from "../assets";
import {useNavigation} from "@react-navigation/native";
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export const LoginScreen = memo(function HomeScreen() {
    const navigation: any = useNavigation();
    const onNavigateContactScreen = useCallback(()=>{
        navigation.navigate("ContactScreen")
    },[navigation])

    return (
        <Container>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle={"dark-content"}
            />
            <Section1>
                <LoginApp source={IMG_LOGO_APP}/>
                <LoginBackground resizeMode="contain" source={IMG_LOGIN_BACKGROUND}/>
            </Section1>
            <Section2>
                <Title>
                    Base contact
                </Title>
                <SubTitle>
                    {`Giải pháp quản lý công việc\n & dự án toàn diện cho doanh nghiệp 4.0`}
                </SubTitle>
                <SmallIconField>
                    <SmallIcon source={IMG_LOGO_APP_SMALL}/>
                </SmallIconField>

            </Section2>
            <Section3>
                <TextWithoutLogin>
                    Bạn chưa đăng nhập
                </TextWithoutLogin>
                <WrapButton>
                    <BtnLogin onPress={onNavigateContactScreen}>
                        <LoginText>
                            Đăng nhập bằng base account
                        </LoginText>
                    </BtnLogin>
                    <BtnManualLogin>
                        <LoginTextManually>
                            Đăng nhập thủ công
                        </LoginTextManually>
                    </BtnManualLogin>
                </WrapButton>
            </Section3>
        </Container>
    )
})

const width = Dimensions.get("window").width
const Container = styled.View`
  padding-top: ${getStatusBarHeight() + 60}px;
  flex: 1;
  background-color: #fff;
`;

const Section1 = styled.View`
  justify-content: center;
  align-items: center;
`
const Section2 = styled.View`
  margin-top: 50px;
  align-items: center;
  flex: auto;
`;
const SmallIconField = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
`
const Section3 = styled.View`
  margin-bottom: 50px;
`;
const LoginApp = styled.Image`

`;
const LoginBackground = styled.Image`
  position: absolute;
  z-index: -1;
  width: ${width}px;
  bottom: 0;
  left: 0;
  top: 40px;
`;
const Title = styled.Text`
  font-size: 30px;
  letter-spacing: 0.12px;
  color: #F2A54A;
  padding-bottom: 10px;
  font-weight: bold;
`
const SubTitle = styled.Text`
  font-size: 15px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #333333;
`
const SmallIcon = styled.Image`
  width: 30px;
  height: 30px;
`
const TextWithoutLogin = styled.Text`
  font-size: 15px;
  text-align: center;
  letter-spacing: -0.24px;
  color: #828282;
  padding: 20px 0;
`
const WrapButton = styled.View`
  padding: 0 40px;
`
const BtnLogin = styled.TouchableOpacity`
  height: 48px;
  background: #F2A54A;
  border-radius: 4px;
  margin: 5px 0;
  justify-content: center;
`
const BtnManualLogin = styled(BtnLogin)`
  background-color: #ffffff;
  border-color: #f2a54a;
  border-width: 1px;
`
const LoginText = styled.Text`
  font-size: 15px;
  text-align: center;
  letter-spacing: -0.24px;
  text-transform: uppercase;
  color: #FFFFFF;
`
const LoginTextManually = styled(LoginText)`
  color: #f2a54a;
`
