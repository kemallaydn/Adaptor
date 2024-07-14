import React, { createContext, useContext, useReducer, useState } from "react";
import reducer from './reducers';
import { FORM } from "../constant/actionTypes/ReducerStateType";
import initialState from "./initialStates";

interface GlobalContextType {
    state: typeof initialState;
    dispatchAction: (reducerName: string, type: string, payload: any) => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

const GlobalProvider = ({ children }) => {
    const [formState, formDispatch] = useReducer(reducer.form, initialState.form);

    const state = {
        form: formState,
    };

    const dispatchAction = (reducerName: string, type: string, payload: any) => {
        const action = { type, payload };
        switch (reducerName) {
            case FORM:
                formDispatch(action);
            break;
            default:
                throw new Error(`Unknown reducer: ${reducerName}`);
        }
        console.log(`${reducerName} updated with action:`, action);
    };

    return (
        <GlobalContext.Provider value={{ state, dispatchAction }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
