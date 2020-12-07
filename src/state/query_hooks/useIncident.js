import axios from 'axios';
import { useQuery } from 'react-query';

// ⬇️ --> USAGE: in react component <-- ⬇️
// const incident_id = 'mn-minneapolis-18';
// const incidentQuery = useIncident({ incident_id });

export const useIncident = ({ incident_id }) => {
  return useQuery(
    `incident/${incident_id}`,
    () => {
      return axios
        .get(
          `http://hrf-c-api.herokuapp.com/incidents/incident/${incident_id}`
        )
        .then(res => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
