import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Empty, Button, Collapse, Tag, Checkbox, Popover, Select } from 'antd';
import './TwitterForm.css';

const { Option } = Select;

const TwitterForm = () => {
  const [data, setData] = useState([]);
  const [rank, setRank] = useState();
  const { incident_id } = useParams();
  useEffect(() => {
    // axios.get(`https://humanrightsfirst-a-api.herokuapp.com/incidents/incident/${incident_id}`)
    axios
      .get(
        `${process.env.REACT_APP_BACKENDURL}/incidents/incident/${incident_id}`
      )
      .then(res => {
        setData(res.data);
        setRank(res.data.force_rank);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const handleChange = e => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const onRank = e => {
    setRank(e);
  };

  const sendObj = () => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <h2>Blue Witness TwitterBot Additional Information Form</h2>
      <label htmlFor="tweet" className="tweet">
        Tweet
      </label>
      <p id="tweet"> {data.description}</p>
      <div className="form-content">
        <label htmlFor="ranks" className="ranks">
          Rank
        </label>
        <Select
          type="text"
          id="ranks"
          className="form-inputs"
          onChange={onRank}
          value={rank}
        >
          <Option value="Rank 1 - Police Presence">
            Rank 1 - Police Presence
          </Option>
          <Option value="Rank 2 - Empty Hand">Rank 2 - Empty-hand</Option>
          <Option value="Rank 3 - Blunt Force">Rank 3 - Blunt Force</Option>
          <Option value="Rank 4 - Chemical & Electric">
            Rank 4 - Chemical & Electric
          </Option>
          <Option value="Rank 5 - Lethal Force">Rank 5 - Lethal Force</Option>
        </Select>

        <label htmlFor="city" className="city">
          City
        </label>
        <input
          type="text"
          name="city"
          className="form-inputs"
          value={data.city}
          onChange={handleChange}
        />

        <label htmlFor="state" className="state">
          State
        </label>
        <input
          type="text"
          name="state"
          className="form-inputs"
          value={data.state}
          onChange={handleChange}
        />

        <label htmlFor="date" className="date">
          Date
        </label>
        <input
          type="text"
          id="date"
          className="form-inputs"
          value={`${data.incident_date}`}
          onChange={handleChange}
        />
        <Button onClick={sendObj}>SUBMIT</Button>
      </div>
    </div>
  );
};
export default TwitterForm;
