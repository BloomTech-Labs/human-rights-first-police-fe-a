import React, { useContext } from 'react';
import {
  ContextLat,
  ContextLong,
  ContextView,
  ContextIncidents,
} from '../../Store';
import questionMark from '../iconImg/question-mark.png';
import { Divider } from 'antd';
import { FlyToInterpolator } from 'react-map-gl';
import { iconPicker } from '../GetFunctions';
import {
  minStyles,
  imgMinStyle,
  incidentTitle,
  incidentLocation,
  incidentInfo,
  incidentCategory,
  maxIncidentCategories,
  incidentCategories,
  categories,
  incidentHeader,
  maxIncidentHeader,
} from './Styles';
import { useMediaQuery } from 'react-responsive';

const ClusterIncident = ({ incidents, i }) => {
  const [lat, setLat] = useContext(ContextLat);
  const [long, setLong] = useContext(ContextLong);
  const [viewport, setViewport] = useContext(ContextView);
  const [incidentsofInterest, setIncidentsOfInterest] = useContext(
    ContextIncidents
  );
  console.log(incidentsofInterest);

  const desktopOrMobile = useMediaQuery({
    query: '(min-device-width: 800px',
  });

  const renderStyles = (style1, style2) => {
    return !desktopOrMobile ? style1 : style2;
  };

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
    >
      <h4 className="incident-location" style={renderStyles(incidentLocation)}>
        {' '}
        {incidents.properties.incident?.city},{' '}
        {incidents.properties.incident?.state}
      </h4>
      <div className="HeaderInfo" style={renderStyles(minStyles)}>
        <img
          className="icon-img"
          onClick={() => {
            FlyTo();
          }}
          style={renderStyles(imgMinStyle)}
          src={
            iconPicker(incidents.properties.incident)
              ? iconPicker(incidents.properties.incident)
              : questionMark
          }
          alt="?"
        />
        <div
          className="incidentHeader"
          style={renderStyles(incidentHeader, maxIncidentHeader)}
        >
          <h2 className="incident-header" style={renderStyles(incidentTitle)}>
            {incidents.properties.incident?.title}
          </h2>
        </div>
      </div>

      <div className="incident-info" style={renderStyles(incidentInfo)}>
        <h3 className="incident-discription">
          {incidents.properties.incident?.desc}
        </h3>
        <div>
          <h2
            className="incident-category"
            style={renderStyles(incidentCategory)}
          >
            Category:
          </h2>
          <div className="categories" style={renderStyles(categories)}>
            {incidents.properties.incident?.categories.map((category, i) => {
              return (
                <div
                  className="incident-container"
                  style={renderStyles(categories)}
                >
                  <h3
                    className="incident-categories"
                    style={renderStyles(
                      incidentCategories,
                      maxIncidentCategories
                    )}
                  >
                    - {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                </div>
              );
            })}
            <Divider style={{ margin: '0px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterIncident;
