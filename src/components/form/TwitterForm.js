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
      {/* <p id="tweet"> {data.description}</p> */}
      <section>
        <div>
          {/* random filler tweet */}
          <div class="twitter-tweet">
            <p lang="en" dir="ltr">
              <a href="https://twitter.com/hashtag/Jaguars?src=hash&amp;ref_src=twsrc%5Etfw">
                #Jaguars
              </a>{' '}
              coach Urban Meyer on releasing Tim Tebow: “It was the right
              thing.”<br></br>A bit of his Q and A with reporters:{' '}
              <a href="https://t.co/CgibqbArK8">pic.twitter.com/CgibqbArK8</a>
            </p>
            &mdash; Ian Rapoport (@RapSheet){' '}
            <a href="https://twitter.com/RapSheet/status/1427676181571198985?ref_src=twsrc%5Etfw">
              August 17, 2021
            </a>
          </div>{' '}
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </div>
        <p className="graph">
          <li className="rank">
            Rank 1 — Officer Presence: Police are present, but no force
            detected. This is not shown on the graph.
          </li>
          <li className="rank">
            Rank 2 — Empty-hand: Officers use bodily force to gain control of a
            situation. Officers may use grabs, holds, joint locks, punches and
            kicks to restrain an individual.
          </li>
          <li className="rank">
            Rank 3 — Blunt Force: Officers use less-lethal technologies to gain
            control of a situation. Baton or projectile may be used to
            immobilize a combative person for example.
          </li>
          <li className="rank">
            Rank 4 — Chemical & Electric: Officers use less-lethal technologies
            to gain control of a situation, such as chemical sprays, projectiles
            embedded with chemicals, or tasers to restrain an individual.
          </li>
          <li className="rank">
            Rank 5 — Lethal Force: Officers use lethal weapons to gain control
            of a situation.
          </li>
        </p>
      </section>
      <div className="form-content">
        <label htmlFor="ranks" className="form-label">
          Rank
        </label>
        <br></br>
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

        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          name="city"
          className="form-inputs"
          value={data.city}
          onChange={handleChange}
        />

        <label htmlFor="state" className="form-label">
          State
        </label>
        <input
          type="text"
          name="state"
          className="form-inputs"
          value={data.state}
          onChange={handleChange}
        />

        <label htmlFor="date" className="form-label">
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
