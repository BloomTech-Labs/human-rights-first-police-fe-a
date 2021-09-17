import React from 'react';
import { Collapse, Form, Input, Select, DatePicker } from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'NewHampshire',
  'NewJersey',
  'NewMexico',
  'NewYork',
  'NorthCarolina',
  'NorthDakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'RhodeIsland',
  'SouthCarolina',
  'SouthDakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'WestVirginia',
  'Wisconsin',
  'Wyoming',
];

function FilterForm({ onValuesChange }) {
  const [form] = Form.useForm();
  const tags = useSelector(state => Object.keys(state.incident.tagIndex));

  const onChange = (trash, vals) => {
    onValuesChange(vals);
  };
  return (
    <Collapse>
      <Panel header="Filter Incident Reports">
        <Form form={form} onValuesChange={onChange} layout="vertical">
          <Form.Item name="force_rank" label="Force Rank">
            <Select>
              <Option value="">Show All Force Ranks</Option>
              <Option value="Rank 1">Rank 1 - Police Presence</Option>
              <Option value="Rank 2">Rank 2 - Empty-hand</Option>
              <Option value="Rank 3">Rank 3 - Blunt Force</Option>
              <Option value="Rank 4">Rank 4 - Chemical &amp; Electric</Option>
              <Option value="Rank 5">Rank 5 - Lethal Force</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Location">
            <Form.Item name="city" noStyle>
              <Input placeholder="City" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item name="state" noStyle>
              <Select placeholder="State" style={{ width: '50%' }}>
                {states.map(state => (
                  <Option value={state}>{state}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="multiple">
              {tags.map(tag => (
                <Option value={tag}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date_range" label="Date">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
}

export default FilterForm;
