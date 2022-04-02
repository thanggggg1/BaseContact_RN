import {Platform, StatusBar} from "react-native";
import {getStatusBarHeight, isIphoneX} from "react-native-iphone-x-helper";

export const statusBarHeight = Platform.OS == 'ios'? getStatusBarHeight(): StatusBar.currentHeight