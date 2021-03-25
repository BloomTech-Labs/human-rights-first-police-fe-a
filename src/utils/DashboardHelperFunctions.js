import axios from 'axios';

const postToApproved = reviewedIncidents => {
  axios
    .post(
      `${process.env.REACT_APP_BACKENDURL}/data/createincidents`,
      reviewedIncidents
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const putIncidents = (incidents, approved) => {
  const reviewedIncidents = incidents.map(incident => {
    return {
      ...incident,
      approved,
      pending: false,
      rejected: !approved,
    };
  });

  postToApproved(reviewedIncidents);

  axios
    .put(
      `${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`,
      reviewedIncidents
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const sortApproved = (unapprovedIncidents, selected) => {
  const reviewedData = [];
  const unreviewedData = [];
  unapprovedIncidents.forEach(dataObj => {
    if (selected.includes(dataObj.id)) {
      reviewedData.push(dataObj);
    } else {
      unreviewedData.push(dataObj);
    }
  });
  return [reviewedData, unreviewedData];
};

export const getData = setUnapprovedIncidents => {
  axios
    .get(`${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`)
    .then(res => {
      setUnapprovedIncidents(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// CompleteIncident.js
export const applyEdits = (formValues, incident) => {
  const [month, day, year] = formValues.date.split('/');
  const [date, time] = incident.date.split('T');
  const newDate = `${year}-${month}-${day}T${time}`;
  const updatedIncident = {
    ...formValues,
    date: newDate,
  };
  const putRequest = new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`, [
        { ...updatedIncident },
      ])
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
  return putRequest;
};

// AddIncident.js
export const getLatAndLong = formValues => {
  const getRequest = new Promise((resolve, reject) => {
    const { city, state } = formValues;
    axios
      .get(
        `http://open.mapquestapi.com/geocoding/v1/address?key=${
          process.env.REACT_APP_MAPQUEST_API_KEY
        }&location=${city ? city.toLowerCase() : ''}${
          state ? ',' + state.toLowerCase() : ''
        }`
      )
      .then(res => {
        const { lat, lng } = res.data.results[0].locations[0].latLng;
        resolve([lat, lng]);
      })
      .catch(err => {
        reject([null, null]);
      });
  });
  return getRequest;
};

export const postIncident = newIncident => {
  const postRequest = new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`,
        newIncident
      )
      .then(res => {
        resolve('New incident added successfully');
      })
      .catch(err => {
        reject('Something went wrong');
      });
  });
  return postRequest;
};

export const formatDate = date => {
  const [month, day, year] = date.split('/');
  return `${year}-${month}-${day}`;
};
