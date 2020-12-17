import React, { useContext } from 'react';
import { ContextLat, ContextLong, ContextView } from '../../Store';
import questionMark from '../iconImg/question-mark.png';
import { Input, Collapse, Divider, List, Tooltip } from 'antd';
import { FlyToInterpolator } from 'react-map-gl';
import { iconPicker, newData } from '../GetFunctions';

const ClusterIncident = ({ incidents, i }) => {
  const [lat, setLat] = useContext(ContextLat);
  const [long, setLong] = useContext(ContextLong);
  const [viewport, setViewport] = useContext(ContextView);

  console.log(lat);
  console.log(long);

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

  return (
    <div
      className="incident-card"
      key={i}
      onMouseEnter={() => {
        setLat(incidents.properties.incident?.lat);
        setLong(incidents.properties.incident?.long);
      }}
      onClick={() => {
        FlyTo();
      }}
    >
      <img
        className="icon-img"
        src={
          iconPicker(incidents.properties.incident)
            ? iconPicker(incidents.properties.incident)
            : questionMark
        }
        alt="?"
      />
      <h4 className="incident-location">
        {incidents.properties.incident.city},{' '}
        {incidents.properties.incident.state}{' '}
      </h4>
      <h2 className="incident-header">{incidents.properties.incident.title}</h2>

      <h3 className="incident-discription">
        {incidents.properties.incident.desc}
      </h3>
      <h2 className="incident-category">Category:</h2>
      {incidents.properties.incident?.categories.map((category, i) => {
        return (
          <h3
            className="incident-categories"
            style={{ color: 'white', fontWeight: 'lighter' }}
          >
            - {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
        );
      })}
      <Divider style={{ margin: '0px' }} />
    </div>
  );
};

export default ClusterIncident;
