import {Platform, StatusBar} from "react-native";
import {getStatusBarHeight, isIphoneX} from "react-native-iphone-x-helper";
import {getBottomSpace} from "react-native-iphone-x-helper";

export const statusBarHeight = Platform.OS == 'ios'? getStatusBarHeight(): StatusBar.currentHeight-15;
export const bottomSpaceHeight = isIphoneX() ? getBottomSpace() + 40 : 50;
export const marginTabBar = Platform.OS =='ios' ? (isIphoneX() ? 15 : 0) : 0;