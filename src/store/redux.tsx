import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RawContact} from "../utils/type";
import {useSelector} from "react-redux";
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from 'redux-thunk';

const initContact = {byKey: {}};

const ContactReducer = createSlice({
    name: 'ContactReducer',
    initialState: initContact,
    reducers: {
        update: (state, payload: PayloadAction<RawContact>) => {
            let byKey = {...state.byKey, [payload.payload.key]: payload.payload}
            return {byKey}
        },
        deleteContact: (state, payload: PayloadAction<{ key: string }>) => {
            let byKey = {...state.byKey}
            delete byKey[payload.payload.key]
            return {...state, byKey}
        }
    }
})

const reducers = combineReducers({
    ContactReducer: ContactReducer.reducer
})
const persistConfig = {
    key: 'root',
    storage:AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})
export const {update, deleteContact} = ContactReducer.actions

export const useContacts = () => {       //connect vao store de lay danh sach
    // @ts-ignore
    return useSelector(state => state.ContactReducer)
}
export const updateContactAction = (val: RawContact) => {
    return store.dispatch(update(val))
}
export const removeContactAction = (key: string) => {
    return store.dispatch(deleteContact({key}))
}