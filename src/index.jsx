import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './style/app.less';

import { Router as RouterHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from '@/utils/history';
import store from '@/redux/store';

import { AppContextProvider } from '@/context/appContext';

ReactDOM.render(
  <RouterHistory history={history}>
    <Provider store={store}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Provider>
  </RouterHistory>,
  document.getElementById('root')
);
