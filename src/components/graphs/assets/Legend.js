import React from 'react';
import './Legend.css';

function Legend() {
  return (
    <div>
      <h3>Graph Legend</h3>
      <p className="graph-legend-wrap">
        <li>
          Rank 1 — Officer Presence: Police are present, but no force detected.
          This is not shown on the graph.
        </li>
        <li>
          Rank 2 — Empty-hand: Officers use bodily force to gain control of a
          situation. Officers may use grabs, holds, joint locks, punches and
          kicks to restrain an individual.
        </li>
        <li>
          Rank 3 — Blunt Force: Officers use less-lethal technologies to gain
          control of a situation. Baton or projectile may be used to immobilize
          a combative person for example.
        </li>
        <li>
          Rank 4 — Chemical & Electric: Officers use less-lethal technologies to
          gain control of a situation, such as chemical sprays, projectiles
          embedded with chemicals, or tasers to restrain an individual.
        </li>
        <li>
          Rank 5 — Lethal Force: Officers use lethal weapons to gain control of
          a situation.
        </li>
        <br />
        <p className="graph-disclaimer">
          Note: This graph relies on open source data from multiple sources and
          a machine learning model that is still in beta. These categories may
          not accurately represent the circumstances of each incident.{' '}
        </p>
      </p>
    </div>
  );
}

export default Legend;
