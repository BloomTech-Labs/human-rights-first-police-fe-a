import axios from 'axios';
import { useQuery } from 'react-query';

// ⬇️ --> USAGE: in react component <-- ⬇️
// const incidentsQuery = useIncident();

export const useIncidents = () => {

 
  return useQuery(
    'incidents',
    () => {
      return axios
        .get(`http://hrf-c-api.herokuapp.com/incidents/showallincidents`)
        .then(res => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
