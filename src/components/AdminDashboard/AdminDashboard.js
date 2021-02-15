import React from 'react';

import PendingIncident from './PendingIncident';

import './AdminDashboard.scss';

const dummyData = [
  {
    categories: [
      'explosive',
      'less-lethal',
      'projectile',
      'rubber-bullet',
      'shoot',
    ],
    city: 'San Jose',
    date: '2020-05-29T05:00:00.000Z',
    desc:
      'A protester filming receives water bottles from a car and begins to distribute them',
    empty_hand_hard: false,
    empty_hand_soft: false,
    incident_id: 'ca-sanjose-5',
    lat: 37.3353,
    less_lethal_methods: true,
    lethal_force: false,
    long: -121.889,
    src: ['https://www.youtube.com/watch?v=89mUHzu3480'],
    state: 'California',
    title: 'Man struck by rubber bullet and explosive device',
    uncategorized: false,
  },
  {
    categories: ['explosive', 'shoot'],
    city: 'Chicago',
    date: '2020-05-29T05:00:00.000Z',
    desc:
      'A protester filming receives water bottles from a car and begins to distribute them',
    empty_hand_hard: false,
    empty_hand_soft: false,
    incident_id: 'il-chicago-6',
    lat: 37.3353,
    less_lethal_methods: true,
    lethal_force: false,
    long: -121.889,
    src: ['https://www.youtube.com/watch?v=89mUHzu3480'],
    state: 'Illinois',
    title: 'Man struck by weapon',
    uncategorized: false,
  },
];

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Statistics</h3>
      <div className="statboxes">
        <div className="statbox">
          <p>{dummyData.length} unapproved incidents</p>
        </div>
        <div className="statbox">
          <p>stats</p>
        </div>
        <div className="statbox">
          <p>STATS!</p>
        </div>
      </div>
      <h3>Incidents</h3>
      <label htmlFor="select-all">
        Select All
        <input type="checkbox" name="select-all" />
      </label>
      <div className="incidents">
        {dummyData.map(incident => {
          return <PendingIncident incident={incident} />;
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
