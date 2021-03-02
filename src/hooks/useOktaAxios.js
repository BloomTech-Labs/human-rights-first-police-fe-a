import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';

export default function useOktaAxios() {
  const { authState } = useOktaAuth();
  const { isAuthenticated, accessToken, idToken } = authState;

  return axios.create({
    baseURL: process.env.REACT_APP_BACKENDURL || '',
    headers: {
      authorization: isAuthenticated
        ? `${accessToken.value}Bearer ${idToken.value}`
        : '',
    },
  });
}
