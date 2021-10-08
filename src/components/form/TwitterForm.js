import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Spin } from 'antd';
import moment from 'moment';

import './TwitterForm.less';

import { unitedStatesStates } from '../../utils/DashboardHelperFunctions';
import axios from 'axios';
import { useParams } from 'react-router';
import Legend from '../graphs/assets/Legend';

/** @typedef {import('../../../store/allIncidentsSlice').Incident} Incident */

const { Option } = Select;

const initialFormValues = {
  city: null,
  force_rank: '',
  incident_date: '',
  state: null,
};

function TwitterForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [incident, setIncident] = useState({});
  const [loaded, setLoaded] = useState(false);

  const { incident_id } = useParams();

  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_BACKENDURL}/incidents/incident/${incident_id}`)
      .then(res => {
        setIncident({ ...res.data, incident_date: moment(incident.incident_date).add(1, 'days') });
        setLoaded(true);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const handleSubmit = vals => {
    // Putting the date in the correct format
    const formattedDate = vals.incident_date.format('YYYY-MM-DD') + 'T00:00:00.000Z';

    const submission = {
      ...incident,
      ...vals,
      incident_date: formattedDate,
    };

    setIsLoading(true);

    axios.post(`https://a.api.humanrightsfirst.dev/form-in`, submission)
      .then(res => {
        setIsLoading(false);
        alert(JSON.stringify(res));
        console.log(res);
      })
      .catch(err => {
        setIsLoading(false);
        alert(JSON.stringify(err));
        console.log(err);
      });
  };

  const handleChange = (changed, values) => {
    console.log(changed);
  };

  return (
    <div className='form-container'>
      <h2>Blue Witness TwitterBot Additional Information Form</h2>
      <Spin spinning={isLoading}>
        {loaded &&
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 9 }}
            onFinish={handleSubmit}
            initialValues={incident}

          >
            <div className="admin-edit-top">

              {/* Tweet */}
              <Form.Item name="description" label="Tweet" >
                <Input.TextArea autoSize={{ minRows: 2 }} disabled />
              </Form.Item>

              {/* Location */}
              <Form.Item label="Location">
                <Input.Group compact>

                  <Form.Item name="city" label="City" noStyle>
                    <Input style={{ width: '50%' }} placeholder="City" />
                  </Form.Item>

                  <Form.Item name="state" label="State" noStyle>
                    {/* <Input  placeholder="State" /> */}
                    <Select
                      style={{ width: '50%' }}
                      showSearch
                      placeholder="State"
                      defaultActiveFirstOption={false}
                      showArrow
                      optionFilterProp="value"
                      filterOption={(input, option) =>
                        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {unitedStatesStates.map(s => <Option key={s} value={s}>{s}</Option>)}
                    </Select>
                  </Form.Item>

                </Input.Group>
              </Form.Item>

              {/* Date */}
              <Form.Item name="incident_date" label="Date">
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={picked => {
                    return moment().add(1, 'days') <= picked;
                  }}
                />
              </Form.Item>

              <Form.Item name="force_rank" label="Force Rank">
                <Select placeholder="Select a Force Rank">
                  <Option value="Rank 0">Rank 0 - No Police Presence</Option>
                  <Option value="Rank 1">Rank 1 - Police Presence</Option>
                  <Option value="Rank 2">Rank 2 - Empty-hand</Option>
                  <Option value="Rank 3">Rank 3 - Blunt Force</Option>
                  <Option value="Rank 4">Rank 4 - Chemical &amp; Electric</Option>
                  <Option value="Rank 5">Rank 5 - Lethal Force</Option>
                </Select>
              </Form.Item>

              <Form.Item name="src" label="Sources">
                <Input.TextArea
                  placeholder="One source per line"
                  autoSize={{ minRows: 2 }}
                  disabled
                />
              </Form.Item>

              <Form.Item>
                <div className="admin-edit-bottom">
                  <Button className="admin-edit-submit" type="primary" htmlType="submit">
                    Apply Changes
                  </Button>
                </div>
              </Form.Item>
            </div>
          </Form>
        }
      </Spin>

<Legend/>

    </div>
  );
}

export default TwitterForm;
