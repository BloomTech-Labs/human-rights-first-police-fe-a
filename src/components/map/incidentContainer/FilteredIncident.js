import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mapActions } from '../../../store';
import useViewport from './../../../hooks/useViewport';
import questionMark from '../iconImg/question-mark.png';
import { FlyToInterpolator } from 'react-map-gl';
import { Divider, Input } from 'antd';
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
import { iconPicker } from '../GetFunctions';
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
    <div>
      {filterDataList.map((data, index) => {
        return (
          <div
            className="incident-card"
            key={nanoid}
            onMouseEnter={() => {
              setLat(data?.lat);
              setLong(data?.long);
            }}
          >
            <h4
              className="incident-location"
              style={renderStyles(incidentLocation)}
            >
              {' '}
              {data?.city}, {data?.state}
            </h4>
            <div className="HeaderInfo" style={renderStyles(minStyles)}>
              <img
                className="icon-img"
                onClick={() => {
                  FlyTo();
                }}
                style={renderStyles(imgMinStyle)}
                src={iconPicker(data) ? iconPicker(data) : questionMark}
                alt="?"
              />
              <div
                className="incidentHeader"
                style={renderStyles(incidentHeader, maxIncidentHeader)}
              >
                <h2
                  className="incident-header"
                  style={renderStyles(incidentTitle)}
                >
                  {data?.title}
                </h2>
              </div>
            </div>
            <Divider style={{ borderWidth: '1px' }} />

            <div className="incident-info" style={renderStyles(incidentInfo)}>
              <h3 className="incident-discription">{data?.desc}</h3>
              <Divider style={{ borderWidth: '1px' }} />
              <div>
                <h2
                  className="incident-category"
                  style={renderStyles(incidentCategory)}
                >
                  Category:
                </h2>
                <div className="categories" style={renderStyles(categories)}>
                  {data?.categories.map((category, i) => {
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
            <Divider
              style={{ borderWidth: '3px', borderColor: 'rgb(0,55,103)' }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FilteredIncident;
