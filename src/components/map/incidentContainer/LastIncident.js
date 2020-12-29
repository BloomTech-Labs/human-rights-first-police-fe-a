import React, { useContext } from 'react';
import questionMark from '../iconImg/question-mark.png';
import { ContextLat, ContextLong, ContextView } from '../../Store';
import { FlyToInterpolator } from 'react-map-gl';
import { iconPicker, newData } from '../GetFunctions';
import { useIncidents } from '../../../state/query_hooks/useIncidents';

const LastIncident = () => {
  const [lat, setLat] = useContext(ContextLat);
  const [long, setLong] = useContext(ContextLong);
  const [viewport, setViewport] = useContext(ContextView);

  const FlyTo = () => {
    const flyViewport = {
      latitude: lat,
      longitude: long,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    };
    setViewport(flyViewport);
  };

  const incidentsQuery = useIncidents();
  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];
  const dataList = newData(incidents);
  const lastIncident = dataList.shift();

  return (
    <div>
      <div
        className="incident-card"
        onMouseEnter={() => {
          setLat(lastIncident?.lat);
          setLong(lastIncident?.long);
        }}
        onClick={() => {
          FlyTo();
        }}
      >
        <img
          className="icon-img"
          src={
            iconPicker(lastIncident) ? iconPicker(lastIncident) : questionMark
          }
          alt="?"
        />

        <h4 className="incident-location">
          {' '}
          {lastIncident?.city}, {lastIncident?.state}
        </h4>
        <h2 className="incident-header">{lastIncident?.title}</h2>
        <h4
          className="incident-date"
          style={{ color: 'white', fontWeight: 'lighter' }}
        >
          {}
        </h4>
        <h3 className="incident-discription">
          {lastIncident?.desc.slice(0, 139)}...
        </h3>
        <h2 className="incident-category">Category:</h2>
        {lastIncident?.categories.map((category, i) => {
          return (
            <div
              className="incident-container"
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <h3
                className="incident-categories"
                style={{ color: 'white', fontWeight: 'lighter' }}
              >
                - {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LastIncident;
