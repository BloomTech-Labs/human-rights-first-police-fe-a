import React, { useEffect } from 'react';
import { StyledLogin } from './LoginContainerStyled';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
// Below is the Human Rights logo
import hrfLogo from './hrf-logo.png';

import config from '../../utils/oktaConfig';

const LoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;

    if (issuer && clientId) {
      // Bandaid fix to prevent production from crashing due to unspecified Okta environment variables
      // Conditional statement prevents widget from being configured and rendered when it would cause a crash
      const widget = new OktaSignIn({
        baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
        clientId,
        redirectUri,
        registration: {},
        features: { registration: true },
        // turning this feature on allows your widget to use Okta for user registration
        logo: `${hrfLogo}`, // Import any logo you want to display at the top of the login widget
        i18n: {
          en: {
            'primaryauth.title': 'Login',
            // change title for your app
          },
        },
        authParams: {
          pkce,
          issuer,
          display: 'page',
          scopes,
        },
      });

      widget.renderEl(
        { el: '#sign-in-widget' },
        () => {
          /**
           * In this flow, the success handler will not be called because we redirect
           * to the Okta org for the authentication workflow.
           */
        },
        err => {
          throw err;
        }
      );
    }
  }, []);

  return config.issuer && config.clientId ? (
    <StyledLogin>
      <div class="background-image" aria-label="cosmetic background image" />
      <div id="sign-in-widget" aria-label="login form" />
    </StyledLogin>
  ) : (
    <></>
  );
};

export default LoginContainer;
