import React from 'react';
import { useHistory } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import config from '../utils/oktaConfig';

const oktaAuth = new OktaAuth(config);

// Component that wraps okta-react's Security component together with the
// authHandler function that relies on react-router-dom's useHistory hook
export default function OktaWrapper(props) {
  const history = useHistory();
  const authHandler = () => history.push('/login');

  return (
    <Security onAuthRequired={authHandler} oktaAuth={oktaAuth}>
      {props.children}
    </Security>
  );
}
