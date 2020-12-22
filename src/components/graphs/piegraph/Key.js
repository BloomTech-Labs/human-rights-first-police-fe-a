import React, { useState } from 'react';
import { nanoid } from 'nanoid';

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
    <ul
      style={{
        flexFlow: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      {Object.keys(data).map((type, index) => {
        if (type === 'Empty-Hand Control') {
          return (
            <React.Fragment key={nanoid()}>
              <li key={nanoid()}> {`${type}: ${data[type]['desc']}`} </li>
              <ul
                style={{
                  flexFlow: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}
              >
                <li key={nanoid()}> {`Soft: ${data[type]['soft']}`} </li>
                <li key={nanoid()}> {`Hard: ${data[type]['hard']}`} </li>
              </ul>
            </React.Fragment>
          );
        } else {
          return <li key={nanoid()}> {`${type}: ${data[type]['desc']}`} </li>;
        }
      })}
    </ul>
  );
};

export default Key;
