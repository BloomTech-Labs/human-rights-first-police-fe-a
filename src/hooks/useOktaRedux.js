import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { userActions } from '../store';
const { setUser } = userActions;

// Hook that listens for changes in Okta authentication state and refreshes
// user data and tokens stored in the Redux store as appropriate
export default function useOktaRedux() {
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth
    ? useOktaAuth
    : { authState: null, oktaAuth: null };

  useEffect(() => {
    const updateState = async () => {
      if (authState && oktaAuth) {
        // Bandaid fix to prevent production from crashing due to unspecified Okta environment variables
        // Conditional statement prevents destructuring useOktaAuth variables when undefined
        const { isAuthenticated, isPending, accessToken, idToken } = authState;
        const updates = {
          status: { authenticated: isAuthenticated, pending: isPending },
        };

        if (accessToken || idToken) {
          updates.tokens = { access: accessToken, id: idToken };
        }

        if (isAuthenticated) {
          updates.info = await oktaAuth.getUser();
        }

        dispatch(setUser(updates));
      } else {
        dispatch(
          setUser({
            status: { authenticated: false, pending: false },
          })
        );
      }
    };
    updateState();
  }, [authState, oktaAuth, dispatch]);
}
