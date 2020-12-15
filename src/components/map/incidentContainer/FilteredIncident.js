import React, {useContext} from 'react'
import {ContextLat, ContextLong, ContextView,} from '../../Store'
import questionMark from '../iconImg/question-mark.png'
import { Input, Collapse, Divider, List, Tooltip } from 'antd';
import { FlyToInterpolator } from 'react-map-gl';

const iconPicker =(incident) =>{

    // return console.log(incident)
        // if(incident?.empty_hand_hard)
        //   {return punch; }
  
        //  if(incident?.empty_hard_soft)
        //   {return wrestling;}
  
        // if(incident?.less_lethal_methods)
        //   {return warning;}
  
        // if(incident?.lethal_force)
        //   {return danger;}
  
         if(incident?.uncategorized)
          {return questionMark;}
        
        //  if(incident?.verbalization)
        //   {return siren;}
    
        }; 

        

const FilteredIncident = ({data, index}) => {
    const [lat, setLat] = useContext(ContextLat);
    const [long, setLong] = useContext(ContextLat);
    const [viewport, setViewport] = useContext(ContextView);

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


const setCoord = (lat, long) => {
            setLat(lat);
            setLong(long);
          };

    return (
        <div
        className="incident-card"
        key={index}
        onMouseEnter={() => setCoord(data.lat, data.long)}
        onClick={() => {
          FlyTo();
        }}
      >
        <img className='icon-img' src={iconPicker(data) ? iconPicker(data) : questionMark} alt='?' />
        <h4 className='incident-location'> {data.city}, {data.state}</h4>
        <h2 className='incident-header'>{data.title}</h2>
        <h3 className='incident-discription'>{data.desc}</h3>
        <h2 className='incident-category' >Category:</h2>
        {data.categories.map((category, i) => {
          return (
            <h3 className='incident-categories'
              style={{ color: 'white', fontWeight: 'lighter' }}>
              - {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
          )
        })}
        <Divider style={{ margin: '0px' }} />
      </div>
    )
}

export default FilteredIncident
