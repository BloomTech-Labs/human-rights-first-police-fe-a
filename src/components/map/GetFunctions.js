import React from 'react';
import wrestling from './iconImg/wrestling.png';
import warning from './iconImg/warning.png';
import siren from './iconImg/siren.png';
import punch from './iconImg/question-mark.png';
import danger from './iconImg/punch.png';
import bullHorn from './iconImg/bull-horn.png';
import questionMark from './iconImg/question-mark.png';
import FilteredIncident from './incidentContainer/FilteredIncident';
import ClusterIncident from './incidentContainer/ClusterIncident';

export const iconPicker = incident => {
  // return console.log(incident)
  if (incident?.empty_hand_hard) {
    return punch;
  }

  if (incident?.uncategorized) {
    return questionMark;
  }

  if (incident?.less_lethal_methods) {
    return warning;
  }

  if (incident?.lethal_force) {
    return danger;
  }

  if (incident?.empty_hand_soft) {
    return wrestling;
  }

  if (incident?.verbalization) {
    return siren;
  }
};

export const toolTipPicker = incident => {
  // return console.log(incident)
  if (incident?.empty_hand_hard) {
    return 'Officers use bodily force to gain control of a situation';
  } else if (incident?.empty_hard_soft) {
    return 'Officers use bodily force to gain control of a situation';
  } else if (incident?.less_lethal_methods) {
    return 'Officers use less-lethal technologies to gain control of a situation';
  } else if (incident?.lethal_force) {
    return 'Officers use lethal weapons to gain control of a situation';
  } else if (incident?.uncategorized) {
    return 'uncategorized incident type';
  } else if (incident?.verbalization) {
    return 'Force is not-physical';
  }
};

//Function removes null and undefinded data
export const newData = data => {
  const newCurrentData = data.map(obj =>
    Object.keys(obj)
      .filter(x => obj[x] !== null)
      .reduce((o, e) => {
        o[e] = obj[e];
        return o;
      }, {})
  );
  const noUnderfined = newCurrentData.map(obj =>
    Object.keys(obj)
      .filter(x => obj[x] !== undefined)
      .reduce((o, e) => {
        o[e] = obj[e];
        return o;
      }, {})
  );
  return noUnderfined;
};
