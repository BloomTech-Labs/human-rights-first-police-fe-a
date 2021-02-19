import React from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute } from '@okta/okta-react';
import oktaConfig from '../utils/oktaConfig';

function OktaEnvError() {
  return (
    <p>
      Okta error: missing environment variables. Login and secure pages are
      unavailable.
    </p>
  );
}
// Bandaid fix to prevent production from crashing due to unspecified Okta environment variables
// Prevents rendering invalid SecureRoute component when Okta environment variables are unconfigured
export default function OktaRoute(props) {
  return oktaConfig.clientId && oktaConfig.issuer ? (
    <SecureRoute {...props} />
  ) : (
    <Route component={OktaEnvError} />
  );
}
