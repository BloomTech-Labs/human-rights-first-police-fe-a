import React, { useContext } from 'react';
import questionMark from '../iconImg/question-mark.png';
import { ContextLat, ContextLong, ContextView } from '../../Store';
import { FlyToInterpolator } from 'react-map-gl';
import { iconPicker, newData } from '../GetFunctions';
import { useIncidents } from '../../../state/query_hooks/useIncidents';
import { Divider} from 'antd';
import './LastIncident.css';
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

const LastIncident = () => {
  const [lat, setLat] = useContext(ContextLat);
  const [long, setLong] = useContext(ContextLong);
  const [viewport, setViewport] = useContext(ContextView);

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
        <h4
          className="incident-location"
          style={renderStyles(incidentLocation)}
        >
          {' '}
          {lastIncident?.city}, {lastIncident?.state}
        </h4>
        <div className="HeaderInfo" style={renderStyles(minStyles)}>
          <img
            className="icon-img"
            style={renderStyles(imgMinStyle)}
            src={
              iconPicker(lastIncident) ? iconPicker(lastIncident) : questionMark
            }
            alt="?"
          />
          <div
            className="incidentHeader"
            style={renderStyles(incidentHeader, maxIncidentHeader)}
          >
            <h2 className="incident-header" style={renderStyles(incidentTitle)}>
              {lastIncident?.title}
            </h2>
          </div>
        </div>
        <Divider style={{ borderWidth: '1px' }} />
        <div className="incident-info" style={renderStyles(incidentInfo)}>
          <h3 className="incident-discription">{lastIncident?.desc}</h3>
          <Divider style={{ borderWidth: '1px' }} />

          <div>
            <h2
              className="incident-category"
              style={renderStyles(incidentCategory)}
            >
              Category:
            </h2>
            <div className="categories" style={renderStyles(categories)}>
              {lastIncident?.categories.map((category, i) => {
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
                      {category.charAt(0).toUpperCase() +
                      category.slice(1).replaceAll('-', ' ')}
                    &nbsp;&nbsp;
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastIncident;
