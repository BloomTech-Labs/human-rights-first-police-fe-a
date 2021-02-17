import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MapContainer from './components/map/MapContainer';
import { LoginCallback, SecureRoute } from '@okta/okta-react';

import RecentTimeline from './components/timeline/RecentTimeline';
import Incidents from './components/incidents/Incidents';
import About from './components/about/About';

import GraphContainer from './components/graphs/GraphContainer';
import NavBar from './components/NavBar/NavBar';
import HorizontalBar from './components/graphs/bargraph/HorizontalBar';
import Stats from './components/Stats/Stats';
import LoginContainer from './components/Login/LoginContainer';
import Dashboard from './components/dashboardTest/Dashboard';

import useOktaRedux from './hooks/useOktaRedux';

export default function App() {
  // Keeps Okta and Redux in sync
  useOktaRedux();

  return (
    <>
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
    </>
  );
}
