import React, { useContext, useState } from 'react';
import questionMark from '../iconImg/question-mark.png';
import {
  ContextLat,
  ContextLong,
  ContextView,
  ContextFilterData,
} from '../../Store';

import { FlyToInterpolator } from 'react-map-gl';
import { Divider } from 'antd';
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

const FilteredIncident = ({ data, index, filterData }) => {
  const [lat, setLat] = useContext(ContextLat);
  const [long, setLong] = useContext(ContextLong);
  const [viewport, setViewport] = useContext(ContextView);

  const desktopOrMobile = useMediaQuery({
    query: '(min-device-width: 800px',
  });

  const renderStyles = (style1, style2) => {
    return !desktopOrMobile ? style1 : style2;
  };

  const newData = filterData.map(x => x);
  console.log(newData);

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
      key={index}
      onMouseEnter={() => {
        setLat(data?.lat);
        setLong(data?.long);
      }}
    >
      <h4 className="incident-location" style={renderStyles(incidentLocation)}>
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
          <h2 className="incident-header" style={renderStyles(incidentTitle)}>
            {data?.title}
          </h2>
        </div>
      </div>

      <div className="incident-info" style={renderStyles(incidentInfo)}>
        <h3 className="incident-discription">{data?.desc}</h3>
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
            <Divider style={{ margin: '0px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredIncident;
