import React from 'react';
import { Collapse, Form, Input, Button, Select, DatePicker } from 'antd';

const { Option } = Select;
const { Panel } = Collapse;

function FilterForm(props) {
  const [form] = Form.useForm();
  return (
    <Collapse>
      <Panel header="Filter Incident Reports">
        <Form form={form} onFinish={console.log} layout="vertical">
          <Form.Item name="force_rank" label="Force Rank">
            <Select>
              <Option value="vdn" />
            </Select>
          </Form.Item>
          <Form.Item label="Location">
            <Form.Item name="city" noStyle>
              <Input placeholder="City" style={{ width: '50%' }} />
            </Form.Item>
            <Form.Item name="state" noStyle>
              <Select placeholder="State" style={{ width: '50%' }}>
                <Option value="asdf" />
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="multiple">
              <Option value="asdfasdf">asdfasdf</Option>
            </Select>
          </Form.Item>
          <Form.Item name="incident_date" label="Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Panel>
    </Collapse>
  );
}

export default FilterForm;
