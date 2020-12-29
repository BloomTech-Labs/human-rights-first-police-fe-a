import React, { useContext } from 'react';
import questionMark from '../iconImg/question-mark.png';
import {
  ContextLat,
  ContextLong,
  ContextView,
  ContextFilterData,
} from '../../Store';
import { FlyToInterpolator } from 'react-map-gl';
import { Divider } from 'antd';
import { iconPicker, newData } from '../GetFunctions';
// import { useIncidents } from '../../../state/query_hooks/useIncidents';

//

const FilteredIncident = ({ data, index }) => {
  const [lat, setLat] = useContext(ContextLat);
  const [long, setLong] = useContext(ContextLong);
  const [viewport, setViewport] = useContext(ContextView);
  const [filterDataList, setFilterDataList] = useContext(ContextFilterData);

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
  const newData = [];
  console.log(data);

  return (
    <div
      className="incident-card"
      style={{ Width: '200px' }}
      key={index}
      onMouseEnter={() => {
        setLat(data?.lat);
        setLong(data?.long);
      }}
      onClick={() => {
        FlyTo();
      }}
    >
      <img
        className="icon-img"
        src={iconPicker(data) ? iconPicker(data) : questionMark}
        alt="?"
      />
      <h4 className="incident-location">
        {' '}
        {data.city}, {data.state}
      </h4>
      <h2 className="incident-header">{data.title}</h2>
      <h3 className="incident-discription">{data.desc}</h3>
      <h2 className="incident-category">Category:</h2>
      {data.categories.map((category, i) => {
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

export default FilteredIncident;
