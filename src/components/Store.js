import React, { createContext, useState } from 'react';

const initialState = {
  cluster: {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [],
      properties: {
        incident: null,
        cluster: false,
        incident_id: null,
      },
    },
  },
};

const initialView = {
  latitude: 41.850033,
  longitude: -97.6500523,
  zoom: 3.2,
};

const initialLong = -97.6500523;
const initialLat = 41.850033;

export const ContextState = createContext();
export const ContextView = createContext();
export const ContextSearchText = createContext();
export const ContextActiveFilters = createContext();
export const ContextLong = createContext();
export const ContextLat = createContext();
export const ContextIncidents = createContext();
export const ContextFilterData = createContext();

const Store = ({ children }) => {
  const [viewport, setViewport] = useState(initialView);
  const [state, setState] = useState(initialState);
  const [searchText, setSearchText] = useState('');
  const [long, setLong] = useState(initialLong);
  const [lat, setLat] = useState(initialLat);
  const [activeFilters, setActiveFilters] = useState();
  const [incidentsOfInterest, setIncidentsOfInterest] = useState();
  const [filterDataList, setFilterDataList] = useState([]);

  return (
    <ContextView.Provider value={[viewport, setViewport]}>
      <ContextSearchText.Provider value={[searchText, setSearchText]}>
        <ContextActiveFilters.Provider
          value={[activeFilters, setActiveFilters]}
        >
          <ContextLong.Provider value={[long, setLong]}>
            <ContextLat.Provider value={[lat, setLat]}>
              <ContextState.Provider value={[state, setState]}>
                <ContextIncidents.Provider
                  value={[incidentsOfInterest, setIncidentsOfInterest]}
                >
<<<<<<< HEAD
                  <ContextFilterData.Provider
                    value={[filterDataList, setFilterDataList]}
                  >
                    {children}
                  </ContextFilterData.Provider>
=======
                  {children}
>>>>>>> 951bfc1a1879dd041e5fbf8ff7e72bb86caedb6c
                </ContextIncidents.Provider>
              </ContextState.Provider>
            </ContextLat.Provider>
          </ContextLong.Provider>
        </ContextActiveFilters.Provider>
      </ContextSearchText.Provider>
    </ContextView.Provider>
  );
};

export default Store;
