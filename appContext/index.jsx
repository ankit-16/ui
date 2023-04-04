import React, { useMemo, useReducer, createContext, useContext } from 'react';
import { initialState, contextReducer } from './reducer';
import contextActions from './actions';

const AppContext = createContext();

function AppContextProvider({ children }) {
    const [state, dispacth] = useReducer(contextReducer, initialState);
    const value = useMemo(() => [state, dispacth], [state]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }
    const [state, dispatch] = context;
    const appContextAction = contextActions(dispatch);
    return { state, appContextAction };
};

export { AppContextProvider, useAppContext };