import axios from 'axios';
import { useQuery } from 'react-query';

// ⬇️ --> USAGE: in react component <-- ⬇️
// const incidentsQuery = useIncident();

export const useIncidents = () => {
  return useQuery(
    'incidents',
    () => {
      return axios
        .get(`${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`)
        .then(res => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
