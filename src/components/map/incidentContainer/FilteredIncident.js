import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mapActions } from '../../../store';
import useViewport from './../../../hooks/useViewport';
import { FlyToInterpolator } from 'react-map-gl';
import { DateTime } from 'luxon';
import { Divider, Popover, Button, Tag } from 'antd';
import { incidentInfo, incidentHeader, maxIncidentHeader } from './Styles';
import sourceListHelper from '../../../utils/sourceListHelper';
import { useMediaQuery } from 'react-responsive';
import { nanoid } from 'nanoid';

const FilteredIncident = () => {
  const dispatch = useDispatch();
  const lat = useSelector(state => state.map.latitude);
  const setLat = l => dispatch(mapActions.setLatitude(l));
  const long = useSelector(state => state.map.longitude);
  const setLong = l => dispatch(mapActions.setLongitude(l));
  const { setViewport } = useViewport();

  const filterDataList = useSelector(state => state.map.filterData);

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
    <div>
      {filterDataList.map((data, index) => {
        return (
          <div
            className="map-incident-card"
            key={index}
            onMouseEnter={() => {
              setLat(data?.lat);
              setLong(data?.long);
            }}
            onClick={() => {
              FlyTo();
            }}
          >
            <div className="card-title">
              <h4>
                {DateTime.fromISO(data?.date)
                  .plus({ days: 1 })
                  .toLocaleString(DateTime.DATE_MED)}
              </h4>
              <h4>
                {data?.city}, {data?.state}
              </h4>
            </div>
            <div
              className="incidentHeader"
              style={renderStyles(incidentHeader, maxIncidentHeader)}
            >
              <h2>{data?.title}</h2>
            </div>
            <h4>{data?.force_rank}</h4>
            {data?.categories.map(cat => {
              return (
                <Tag key={nanoid()}>
                  {cat.charAt(0).toUpperCase() +
                    cat.slice(1).replaceAll('-', ' ')}
                </Tag>
              );
            })}
            <div
              className="map-incident-info"
              style={renderStyles(incidentInfo)}
            >
              <p className="incident-description">{data?.desc}</p>
              <Popover content={sourceListHelper(data)} placement="rightTop">
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
      })}
    </div>
  );
};

export default FilteredIncident;
