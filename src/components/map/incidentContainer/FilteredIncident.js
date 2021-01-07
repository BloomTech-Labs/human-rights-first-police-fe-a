import React, { useContext, useState, useMemo } from 'react';
import questionMark from '../iconImg/question-mark.png';
import { useIncidents } from '../../../state/query_hooks/useIncidents';
import {
  ContextLat,
  ContextLong,
  ContextView,
  ContextFilterData,
  ContextDates,
  ContextSearchText
} from '../../Store';

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
import { iconPicker, newData } from '../GetFunctions';
import { useMediaQuery } from 'react-responsive';
import { nanoid } from 'nanoid';


const { Search } = Input;

const FilteredIncident = () => {
  const [lat, setLat] = useContext(ContextLat);
  const [long, setLong] = useContext(ContextLong);
  const [viewport, setViewport] = useContext(ContextView);
  const [dates, setDates] = useContext(ContextDates)
  const [filterDataList, setFilterDataList] = useContext(ContextFilterData);
  const [searchText, setSearchText] = useContext(ContextSearchText)

  const incidentsQuery = useIncidents();

  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];

  const dataList = newData(incidents);


  const exclude = ['incident_id'];

  const filterData = value => {
    
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') setFilterDataList([]);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          exclude.includes(key)
            ? false
            : item[key]
                .toString()
                .toLowerCase()
                .includes(lowercasedValue)
        );
      });

      setFilterDataList(filteredData);
    }
    
  };

console.log(filterDataList)

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

  const onSearch = value => {
    setSearchText(value);
    filterData(value)
  
  };

console.log(filterDataList)



  return (
    <div>
      {filterDataList.map((data, index) =>{
        return(
          <div
      className="incident-card"
      key={nanoid}
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
      <Divider style={{ borderWidth: '3px', borderColor:'rgb(0,55,103)' }} /> 
    </div>

        )
      })}
     
    {/* <div
      className="incident-card"
      key={nanoid}
      onMouseEnter={() => {
        setLat(filterDataList?.lat);
        setLong(filterDataList?.long);
      }}
    >
      <h4 className="incident-location" style={renderStyles(incidentLocation)}>
        {' '}
        {filterDataList?.city}, {filterDataList?.state}
      </h4>
      <div className="HeaderInfo" style={renderStyles(minStyles)}>
        <img
          className="icon-img"
          onClick={() => {
            FlyTo();
          }}
          style={renderStyles(imgMinStyle)}
          src={iconPicker(filterDataList) ? iconPicker(filterDataList) : questionMark}
          alt="?"
        />
        <div
          className="incidentHeader"
          style={renderStyles(incidentHeader, maxIncidentHeader)}
        >
          <h2 className="incident-header" style={renderStyles(incidentTitle)}>
            {filterDataList?.title}
          </h2>
        </div>
      </div>

      <div className="incident-info" style={renderStyles(incidentInfo)}>
        <h3 className="incident-discription">{filterDataList?.desc}</h3>
        <div>
          <h2
            className="incident-category"
            style={renderStyles(incidentCategory)}
          >
            Category:
          </h2>
          <div className="categories" style={renderStyles(categories)}>
            {filterDataList?.categories.map((category, i) => {
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
    </div> */}
    </div>
  );
};

export default FilteredIncident;
