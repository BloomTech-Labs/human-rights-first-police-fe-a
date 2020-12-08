import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';

import './index.css';
import 'antd/dist/antd.less';


import MapView from './components/map/MapView';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  return (
    <>
      <div>
        
        

        <Switch>
          
          <Route path="/">
            <MapView />
          </Route>
        </Switch>
      
      </div>
      <ReactQueryDevtools />
    </>
  );
}
