import React, { useState } from 'react';

const keyData = {
  'Officer Presence': {
    desc: 'No force is used',
  },
  Verbalization: {
    desc: 'Force is not-physical',
  },
  'Empty-Hand Control': {
    desc: 'Officers use bodily force to gain control of a situation',
    soft:
      'Officers use grabs, holds and joint locks to restrain an individual.',
    hard: 'Officers use punches and kicks to restrain an individual',
  },
  'Less-Lethal Methods': {
    desc:
      ' Officers use less-lethal technologies to gain control of a situation',
  },
  'Lethal Force': {
    desc:
      'Officers use lethal weapons to gain control of a situation. Should only be used if a suspect poses a serious threat to the officer or another individual.',
  },
};

const Key = props => {
  const [data] = useState(keyData);

  return (
    <ul>
      {Object.keys(data).map((type, index) => {
        if (type === 'Empty-Hand Control') {
          return (
            <>
              <li key={index}> {`${type}: ${data[type]['desc']}`} </li>
              <ul>
                <li key={'soft'}> {`Soft: ${data[type]['soft']}`} </li>
                <li key={'hard'}> {`Hard: ${data[type]['hard']}`} </li>
              </ul>
            </>
          );
        } else {
          return <li key={index}> {`${type}: ${data[type]['desc']}`} </li>;
        }
      })}
    </ul>
  );
};

export default Key;
