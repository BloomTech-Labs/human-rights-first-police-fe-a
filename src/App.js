import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import useOktaRedux from './hooks/useOktaRedux';
import useFetchIncidents from './hooks/useFetchIncidents';
import Home from './components/Home';
import Incidents from './components/incidents/Incidents';
import About from './components/about/About';
import GraphContainer from './components/graphs/GraphContainer';
import NavBar from './components/NavBar/NavBar';
import LoginContainer from './components/Login/LoginContainer';
import Dashboard from './components/AdminDashboard/AdminDashboard';
import Footer from './components/Footer/Footer';
import OktaRoute from './components/OktaRoute';

export default function App() {
  // Keeps Okta and Redux in sync
  useOktaRedux();
  const { fetch } = useFetchIncidents();
  useEffect(() => {
    fetch();
  }, [fetch]);

  console.log(process.env.REACT_APP_OKTA_ISSUER_URI);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/graph">
          <GraphContainer />
        </Route>
        <Route path="/incident-reports">
          <Incidents />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login" component={LoginContainer} />
        {/* Bandaid fix to prevent production from crashing due to unspecified Okta environment variables */}
        <OktaRoute path="/admin-dashboard" component={Dashboard} />
        <Route path="/implicit/callback" component={LoginCallback} />
      </Switch>
      <Footer />
    </div>
  );
}
