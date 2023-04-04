import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';
import { AppContextProvider } from './context/appContext';

ReactDOM.render(
    <AppContextProvider>
        <App />
    </AppContextProvider>,
    document.getElementById('root')   
)