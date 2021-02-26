import React from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import { nanoid } from 'nanoid';
import { DateTime } from 'luxon';
import { newData } from '../GetFunctions';
import { useIncidents } from '../../../hooks/legacy/useIncidents';
import { Divider, Popover, Button, Tag } from 'antd';
import { incidentInfo, incidentHeader, maxIncidentHeader } from './Styles';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { mapActions } from '../../../store';
import useViewport from './../../../hooks/useViewport';
import sourceListHelper from '../../../utils/sourceListHelper';

const LastIncident = () => {
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

  const incidentsQuery = useIncidents();
  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];
  const dataList = newData(incidents);
  const lastIncident = dataList.shift();

  return (
    <div
      className="map-incident-card"
      onMouseEnter={() => {
        setLat(lastIncident?.lat);
        setLong(lastIncident?.long);
      }}
      onClick={() => {
        FlyTo();
      }}
    >
      <div className="card-title">
        <h4>
          {lastIncident
            ? // Prevents a DateTime error from being displayed in the page when
              // lastIncident is undefined because fetching failed or is incomplete.
              // Just a temporary fix - We should revise this to clearly communicate
              // error state to users, but for now here's no ghost error when all is well.
              DateTime.fromISO(lastIncident?.date)
                .plus({ days: 1 })
                .toLocaleString(DateTime.DATE_MED)
            : ''}
        </h4>
        <h4>
          {lastIncident?.city}, {lastIncident?.state}
        </h4>
      </div>
      <div
        className="incidentHeader"
        style={renderStyles(incidentHeader, maxIncidentHeader)}
      >
        <h2>{lastIncident?.title}</h2>
      </div>
      {lastIncident?.categories.map(cat => {
        return (
          <Tag key={nanoid()}>
            {cat.charAt(0).toUpperCase() + cat.slice(1).replaceAll('-', ' ')}
          </Tag>
        );
      })}
      <div className="map-incident-info" style={renderStyles(incidentInfo)}>
        <br />
        <h3 className="incident-discription">{lastIncident?.desc}</h3>
        <Popover content={sourceListHelper(lastIncident)} placement="rightTop">
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

export default LastIncident;
