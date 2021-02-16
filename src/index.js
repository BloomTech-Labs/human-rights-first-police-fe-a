import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import MapContainer from './components/map/MapContainer';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import 'antd/dist/antd.less';

import RecentTimeline from './components/timeline/RecentTimeline';
import Incidents from './components/incidents/Incidents';
import About from './components/about/About';

import GraphContainer from './components/graphs/GraphContainer';
import NavBar from './components/NavBar/NavBar';
import HorizontalBar from './components/graphs/bargraph/HorizontalBar';
import Stats from './components/Stats/Stats';
import LoginContainer from './Login/LoginContainer';
import Dashboard from './components/dashboardTest/Dashboard';

import { config } from './utils/oktaConfig';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <div className="Map">
            <MapContainer />
          </div>
          <div className="bottom-section">
            <div className="Timeline">
              <RecentTimeline />
              <div className="Info-Section">
                <div className="Stats">
                  <Stats />
                </div>
                <div className="H-bar">
                  <HorizontalBar />
                </div>
              </div>
            </div>
          </div>
        </Route>

        <Route path="/graph">
          <GraphContainer />
        </Route>
        <Route path="/incidents">
          <Incidents />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login" component={LoginContainer} />
        <SecureRoute path="/" exact component={() => <MapContainer />} />
        <SecureRoute path="/dashboard" component={Dashboard} />
        <Route path="/implicit/callback" component={LoginCallback} />
      </Switch>
    </Security>
  );
}
