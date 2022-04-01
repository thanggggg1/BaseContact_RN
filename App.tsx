import * as React from 'react';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux'
import {store} from "./src/store/redux";
import {MainStackNavigator} from "./src/navigation/StackNavigation";
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
let persistor = persistStore(store);
export default function App() {
    useEffect(() => {
        SplashScreen.hide();
    },[])
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <MainStackNavigator/>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
