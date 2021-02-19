import React from 'react';
import { useHistory } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import config from '../utils/oktaConfig';

const oktaAuth = config.issuer && config.clientId ? new OktaAuth(config) : null;

// Component that wraps okta-react's Security component together with the
// authHandler function that relies on react-router-dom's useHistory hook
export default function OktaWrapper(props) {
  const history = useHistory();
  const authHandler = () => history.push('/login');

  return config.issuer && config.clientId ? (
    // Bandaid fix to prevent production from crashing due to unspecified Okta environment variables
    // Prevents rendering invalid Security component when Okta environment variables are unconfigured
    <Security onAuthRequired={authHandler} oktaAuth={oktaAuth}>
      {props.children}
    </Security>
  ) : (
    <>{props.children}</>
  );
}
