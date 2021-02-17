import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { userActions } from '../store';
const { setUser } = userActions;

// Hook that listens for changes in Okta authentication state and refreshes
// user data and tokens stored in the Redux store as appropriate
export default function useOktaRedux() {
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    const updateState = async () => {
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
    };

    updateState();
  }, [authState, oktaAuth, dispatch]);
}
