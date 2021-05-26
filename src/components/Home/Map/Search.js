import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WebMercatorViewport } from 'react-map-gl';
import axios from 'axios';
import moment from 'moment';
import { nanoid } from 'nanoid';
import useMapSearch from '../../../hooks/useMapSearch';
import { AutoComplete, DatePicker, Select } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const geocode = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  params: {
    country: 'us',
    types: 'region,postcode,district,place,locality,neighborhood',
    access_token: process.env.REACT_APP_MAPBOX_TOKEN,
  },
});

// Configure how many characters after which the app begins querying Mapbox geocoding autocomplete
const MIN_QUERY_LENGTH = 3;

export default function Search({ zoomOnCluster }) {
  const { filterGeo, filterDate } = useMapSearch();

  // ** Filter by location **
  const [geoInput, setGeoInput] = useState('');
  const [geoRes, setGeoRes] = useState([]);

  // **Quick Select **
  const [quickSelect, setQuickSelect] = useState('');

  // Necessary to recalculate the viewport on location selection
  const { width, height } = useSelector(state => ({
    width: state.map.viewport.width,
    height: state.map.viewport.height,
  }));

  const handleGeoInput = input => {
    setGeoInput(input);
  };

  useEffect(() => {
    if (geoInput.length >= MIN_QUERY_LENGTH) {
      // Relevant Mapbox docs: https://docs.mapbox.com/api/search/geocoding/#forward-geocoding
      geocode
        .get(`${geoInput}.json`)
        .then(r => setGeoRes(r.data))
        .catch(e => console.error(e));
    }
  }, [geoInput]);

  const handleGeoSelect = index => {
    const selection = geoRes.features[index];
    const bbox = selection.bbox;
    setGeoInput(selection.place_name);

    // Automatically navigate the location selected by the user
    const { zoom, longitude, latitude } = new WebMercatorViewport({
      width,
      height,
    }).fitBounds(
      [
        [bbox[2], bbox[1]],
        [bbox[0], bbox[3]],
      ],
      { padding: 20, offset: [0, -100] }
    );
    zoomOnCluster(zoom, longitude, latitude);

    filterGeo(bbox);
  };

  // ** Filter by date **
  const disableFutureDates = current => current > moment().endOf('day');

  const handleCalendarChange = dates => {
    filterDate(dates);
  };

  // QuickSelect - uses same filterDate function as handleCalendarChange
  const onChange = value => {
    setQuickSelect(value);
    const dates = value ? [moment().subtract(value, 'days'), moment()] : [];
    filterDate(dates);
  };

  return (
    <div className="search-header">
      <AutoComplete
        style={{ width: '100%' }}
        value={geoInput}
        onChange={handleGeoInput}
        onSelect={handleGeoSelect}
        placeholder="Enter a City or State"
      >
        {geoRes.features && geoInput.length >= MIN_QUERY_LENGTH
          ? geoRes.features.map((f, i) => (
              <Option key={nanoid()} value={`${i}`}>
                {f.place_name}
              </Option>
            ))
          : ''}
      </AutoComplete>
      <RangePicker
        style={{ width: '100%' }}
        disabledDate={disableFutureDates}
        onCalendarChange={handleCalendarChange}
      />

      <Select
        style={{ color: '#C0C0C0' }}
        onChange={onChange}
        value={quickSelect}
        name="quicksearch"
      >
        <Option value="">- Search Recent Reports -</Option>
        <Option value="90">Within Past 90 Days</Option>
        <Option value="30">Within Past 30 Days</Option>
        <Option value="7">Within Past 7 Days</Option>
      </Select>
    </div>
  );
}
