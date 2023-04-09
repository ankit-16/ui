import React, { useMemo, useReducer, createContext, useContext } from 'react';
import { initialState, contextReducer } from './reducer';
import contextActions from './actions';
import contextSelectors from './selectors';

const CrmContext = createContext();

function CrmContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
}

function useCrmContext() {
  const context = useContext(CrmContext);
  if (context === undefined) {
    throw new Error('useCrmContext must be used within a CrmContextProvider');
  }
  const [state, dispatch] = context;
  const crmContextAction = contextActions(dispatch);
  const crmContextSelector = contextSelectors(state);
  return { state, crmContextAction, crmContextSelector };
}

export { CrmContextProvider, useCrmContext };
