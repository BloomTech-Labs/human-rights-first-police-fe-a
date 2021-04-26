import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const keyData = {
  'Rank I: Officer Presence': {
    desc: 'Police are present, but no force detected; not imaged.',
  },
  'Rank II: Empty-Hand': {
    desc:
      'Officers use bodily force to gain control of a situation. Officers may use grabs, holds, joint locks, punches and kicks to restrain an individual.',
  },
  'Rank III: Blunt Force Methods': {
    desc:
      'Officers use less-lethal technologies to gain control of a situation. For example, a baton or projectile may be used to immobilize a combative person.',
  },
  'Rank IV: Chemical & Electric': {
    desc:
      'Officers use less-lethal technologies to gain control of a situation, such as chemical sprays, projectiles embedded with chemicals, or tasers.',
  },
  'Rank V: Lethal Force': {
    desc: 'Officers use lethal weapons to gain control of a situation.',
  },
  Uncategorized: {
    desc: 'An incident was detected but we were not able to categorize it.',
  },
};

const Key = props => {
  const [data] = useState(keyData);

  return (
    <>
      <h3>Legend</h3>
      <ul
        style={{
          border: '1px solid black',
          flexFlow: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          margin: 0,
        }}
      >
        {Object.keys(data).map((type, index) => {
          return (
            <li key={nanoid()}>
              <h4>{type}</h4>
              <p>{data[type]['desc']}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Key;
