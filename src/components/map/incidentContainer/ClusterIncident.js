import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mapActions } from '../../../store';
import useViewport from './../../../hooks/useViewport';
import { Divider, Popover, Button, Tag } from 'antd';
import { FlyToInterpolator } from 'react-map-gl';
import { nanoid } from 'nanoid';
import { DateTime } from 'luxon';
import { incidentInfo, incidentHeader, maxIncidentHeader } from './Styles';
import sourceListHelper from '../../../utils/sourceListHelper';
import { useMediaQuery } from 'react-responsive';

const ClusterIncident = ({ incidents, i }) => {
  const dispatch = useDispatch();
  const lat = useSelector(state => state.map.latitude);
  const setLat = l => dispatch(mapActions.setLatitude(l));
  const long = useSelector(state => state.map.longitude);
  const setLong = l => dispatch(mapActions.setLongitude(l));
  const { setViewport } = useViewport();

  const desktopOrMobile = useMediaQuery({
    query: '(min-device-width: 800px)',
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
      className="map-incident-card"
      key={i}
      onMouseEnter={() => {
        setLat(incidents.properties.incident?.lat);
        setLong(incidents.properties.incident?.long);
      }}
      onClick={() => {
        FlyTo();
      }}
    >
      <div className="card-title">
        <h4>
          {DateTime.fromISO(incidents.properties.incident?.date)
            .plus({ days: 1 })
            .toLocaleString(DateTime.DATE_MED)}
        </h4>
        <h4>
          {incidents.properties.incident?.city},{' '}
          {incidents.properties.incident?.state}
        </h4>
      </div>
      <div
        className="incidentHeader"
        style={renderStyles(incidentHeader, maxIncidentHeader)}
      >
        <h2>{incidents.properties.incident?.title}</h2>
      </div>
      {incidents.properties.incident?.categories.map(cat => {
        return (
          <Tag key={nanoid()}>
            {cat.charAt(0).toUpperCase() + cat.slice(1).replaceAll('-', ' ')}
          </Tag>
        );
      })}
      <div className="map-incident-info" style={renderStyles(incidentInfo)}>
        <br />
        <h3 className="incident-discription">
          {incidents.properties.incident?.desc}
        </h3>
        <Popover
          content={sourceListHelper(incidents.properties.incident)}
          placement="rightTop"
        >
          <Button
            type="primary"
            style={{ backgroundColor: '#003767', border: 'none' }}
          >
            Sources
          </Button>
        </Popover>
      </div>
      <Divider style={{ borderWidth: '1px' }} />
    </div>
  );
};

export default ClusterIncident;
