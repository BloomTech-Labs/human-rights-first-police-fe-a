import { useEffect, useMemo } from 'react';
// State
import { useSelector, useDispatch } from 'react-redux';
import { mapActions } from '../../../store';
// Mapbox
import useViewport from '../../../hooks/useViewport';
import { FlyToInterpolator, WebMercatorViewport } from 'react-map-gl';
// Utility
import axios from 'axios';
import moment from 'moment';
import { nanoid } from 'nanoid';
import _ from 'lodash';
// Components
import { AutoComplete, DatePicker } from 'antd';
const { Option } = AutoComplete;
const { RangePicker } = DatePicker;

const {
  setSearchQuery,
  setSearchGeoRes,
  setSearchGeoBounds,
  setSearchDateRange,
  resetViewport,
  resetSearchGeo,
  resetSearchDate,
  setFilterData,
} = mapActions;

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

export default function SearchHeader() {
  const dispatch = useDispatch();
  const incidents = useSelector(state => state.incident);
  const incidentsArray = useMemo(() => Object.values(incidents), [incidents]);

  const searchDateRange = useSelector(state => state.map.search.dateRange);

  // ** Filter by location **
  const query = useSelector(state => state.map.search.query);
  const geoRes = useSelector(state => state.map.search.geoRes); // Mapbox autocomplete response data
  const searchGeoBounds = useSelector(state => state.map.search.geoBounds); // Coordinate boundaries for filtering incidents
  const { viewport, setViewport } = useViewport();

  const handleChange = input => {
    if (typeof input === 'string') {
      dispatch(setSearchQuery(input));
    }
  };

  useEffect(() => {
    if (query.length >= MIN_QUERY_LENGTH) {
      // Relevant Mapbox docs: https://docs.mapbox.com/api/search/geocoding/#forward-geocoding
      geocode
        .get(`${query}.json`)
        .then(r => dispatch(setSearchGeoRes(r.data)))
        .catch(e => console.error(e));
    }
  }, [query, dispatch]);

  const handleSelect = index => {
    dispatch(setSearchQuery(geoRes.features[index].place_name));

    const [minLon, minLat, maxLon, maxLat] = geoRes.features[index].bbox;
    dispatch(setSearchGeoBounds({ minLon, minLat, maxLon, maxLat }));

    // Automatically navigate the location selected by the user
    const {
      latitude,
      longitude,
      zoom,
      altitude,
      bearing,
      pitch,
      height,
      width,
    } = new WebMercatorViewport({
      width: viewport.width,
      height: viewport.height,
    }).fitBounds(
      [
        [maxLon, minLat],
        [minLon, maxLat],
      ],
      { padding: 20, offset: [0, -100] }
    );

    setViewport({
      latitude,
      longitude,
      zoom,
      altitude,
      bearing,
      pitch,
      height,
      width,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 'auto',
    });
  };

  // Memoized list of incident IDs that meet geographic criteria
  const geoFilter = useMemo(() => {
    const { minLon, minLat, maxLon, maxLat } = searchGeoBounds;
    return incidentsArray
      .filter(
        ({ lat, long }) =>
          lat >= minLat && lat <= maxLat && long >= minLon && long <= maxLon
      )
      .map(item => item.id);
  }, [searchGeoBounds, incidentsArray]);

  // ** Filter by date **
  const disableFutureDates = current => current > moment().endOf('day');

  const handleCalendarChange = dates => {
    // If a date is not selected, use 1/1/1970 for start and/or the current time for end
    const start = dates?.[0] ? dates[0] : moment(0);
    const end = dates?.[1] ? dates[1] : moment();
    dispatch(
      setSearchDateRange({ start: start.toISOString(), end: end.toISOString() })
    );
  };

  // Memoized list of incident IDs within the selected date range
  const dateFilter = useMemo(() => {
    const start = moment(searchDateRange.start);
    const end = moment(searchDateRange.end);

    return incidentsArray
      .filter(({ date }) => moment(date).isBetween(start, end))
      .map(item => item.id);
  }, [searchDateRange, incidentsArray]);

  // ** Filter data across both data and geographic criteria and dispatch for use by other components
  // Memoized list of incident IDs that meet both filter criteria
  const combinedFilter = useMemo(() => {
    return _.intersection(geoFilter, dateFilter);
  }, [geoFilter, dateFilter]);

  // When the list of filtered IDs changes, dispatch the new list of incidents
  useEffect(() => {
    // This should be optimized later by configuring other components to select incidents from the store on their own
    // from a list of IDs. We're currently storing these large incident objects twice in the store
    const filtered = combinedFilter.map(id => incidents[id]);
    dispatch(setFilterData(filtered));
  }, [combinedFilter, incidents, dispatch]);

  // ** Reset both search filters on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetViewport());
      dispatch(resetSearchGeo());
      dispatch(resetSearchDate());
    };
  }, [dispatch]);

  return (
    <div className="search-header">
      <AutoComplete
        style={{ width: '100%' }}
        value={query}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {geoRes.features && query.length >= MIN_QUERY_LENGTH
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
    </div>
  );
}
