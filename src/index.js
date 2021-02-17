import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import 'antd/dist/antd.less';

import OktaWrapper from './components/OktaWrapper';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <OktaWrapper>
          <App />
        </OktaWrapper>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
