import React from 'react';
import { Collapse, Form, Input, Button, Select, DatePicker } from 'antd';

const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

function FilterForm({ onValuesChange }) {
  const [form] = Form.useForm();
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
                <Option value="asdf">asdf</Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="multiple">
              <Option value="asdfasdf">asdfasdf</Option>
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
