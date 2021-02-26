import React from 'react';

// This is barely in use, but was previously applied to ClusterIncident, FilteredIncident, LastIncident for mobile/desktop styles. It wasn't actually being used where I removed it from those files due to a typo in where it was called, so I assume it won't be missed.

export const maxStyles = {
  width: 200,
  height: 50,
  backgroundColor: 'red',
};

export const minStyles = {
  display: 'flex',
  flexDirection: 'row',
};
export const imgMinStyle = {
  width: '50px',
  height: '50px',
};
export const incidentTitle = {
  fontSize: '.8rem',
};
export const incidentLocation = {
  fontSize: '.7rem',
};
export const incidentInfo = {
  display: 'flex',
  flexDirection: ' column-reverse',
};
export const MaxIncidentInfo = {
  display: 'flex',
  flexDirection: ' column',
};
export const incidentCategory = {
  fontSize: '.9rem',
};
export const maxIncidentCategories = {
  fontWeight: 'lighter',
};
export const incidentCategories = {
  fontWeight: 'lighter',
  fontSize: '.7rem',
};
export const categories = {
  display: 'flex',
  // justifyContent: 'flex-start',
  justifyContent: 'space-between',
};
export const incidentHeader = {
  marginLeft: '8%',
};
export const maxIncidentHeader = {
  marginLeft: '0%',
};

export const next = {
  top: '50%',
  position: 'absolute',
  background: 'white',
  borderRadius: '30px',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userDelect: 'none',
  cursor: 'grab',
  fontWeight: 'bold',
  fontSize: '18px',
  zIndex: '1',
  right: '10px',
};
export const prev = {
  top: '50%',
  position: 'absolute',
  background: 'white',
  borderRadius: '30px',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userDelect: 'none',
  cursor: 'grab',
  fontWeight: 'bold',
  fontSize: '18px',
  zIndex: '2',
  left: '10px',
  transform: 'scale(-1)',
};
