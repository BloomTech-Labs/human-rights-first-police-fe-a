import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import Main from './components/Main';

import './index.css';
import 'antd/dist/antd.less';
import RecentTimeline from './components/timeline/RecentTimeline';

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
            <Main />
            <RecentTimeline />
          </Route>
        </Switch>
      </div>
      <ReactQueryDevtools />
    </>
  );
}
