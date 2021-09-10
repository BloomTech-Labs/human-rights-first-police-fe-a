import React from 'react';
import './Legend.css';

function Legend() {
  return (
    <div>
      <h3 className="homepage-legend">Graph Legend</h3>
      <p className="graph-legend-wrap">
        <li className="rank">
          Rank 1 — Officer Presence: Police are present, but no force detected.
          This is not shown on the graph.
        </li>
        <li className="rank">
          Rank 2 — Empty Hand: Officers use bodily force to gain control of a
          situation. Officers may use grabs, holds, joint locks, punches, and
          kicks to restrain an individual.
        </li>
        <li className="rank">
          Rank 3 — Blunt Force: Officers use less-lethal technologies to gain
          control of a situation. Officers may use batons or projectiles to
          immobilize a combative individual.
        </li>
        <li className="rank">
          Rank 4 — Chemical & Electric: Officers use less-lethal technologies to
          gain control of a situation. Officers may use chemical sprays,
          projectiles embedded with chemicals, or tasers to restrain an
          individual.
        </li>
        <li className="rank">
          Rank 5 — Lethal Force: Officers use lethal weapons to gain control of
          a situation.
        </li>
        <br />
        <li className="graph-disclaimer">
          Note: This graph relies on open source data from multiple sources and
          a machine learning model that is still in beta. These categories may
          not accurately represent the circumstances of each incident.{' '}
        </li>
      </p>
    </div>
  );
}

export default Legend;
