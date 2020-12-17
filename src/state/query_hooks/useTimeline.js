import axios from 'axios';
import { useQuery } from 'react-query';

export const useTimeline = () => {
  return useQuery(
    'timeline',
    () => {
      return axios
        .get(`${process.env.REACT_APP_BACKENDURL}/incidents/gettimeline`)
        .then(res => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
