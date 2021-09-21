import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import useOktaAxios from '../../../hooks/useOktaAxios';

import './AdminEdit.less';

const { Option } = Select;

function AdminEdit({ initialValues, cancel, cleanup }) {
  const [form] = Form.useForm();

  const oktaAxios = useOktaAxios();

  const handleSubmit = vals => {
    let formattedDate;

    // Making sure that the date is a moment
    if (vals.incident_date === null) {
      formattedDate = moment(initialValues.incident_date);
    } else {
      formattedDate = vals.incident_date;
    }
    // Putting the date in the correct format
    formattedDate = formattedDate.format('YYYY-MM-DD') + 'T00:00:00.000Z';

    // Removing duplicate tags, ex: "asdf " and "asdf"
    let formattedTags = new Set(vals.tags.map(tag => tag.trim()));

    const finalVals = {
      ...initialValues,
      ...vals,
      incident_date: formattedDate,
      tags: [...formattedTags],
    };

    oktaAxios
      .put('/dashboard/incidents', [{ ...finalVals }])
      .then(res => {
        window.location.reload();
        // TODO instead of reloading we should just update the incident in state
        // notice that this kinda breaks the whole cleanup step.
      })
      .catch(err => {
        console.log(err);
        // TODO put some kind of actual error handling here
      })
      .finally(res => {
        cleanup();
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...initialValues,
        incident_date: moment(initialValues.incident_date).add(1, 'days'),
      }}
    >
      <div className="admin-edit-top">
        <Form.Item name="title" label="Title of Incident">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description of Incident">
          <Input />
        </Form.Item>
        <Form.Item label="Location">
          <Input.Group compact>
            <Form.Item name="city" label="City" noStyle>
              <Input style={{ width: '50%' }} placeholder="City" />
            </Form.Item>
            <Form.Item name="state" label="State" noStyle>
              <Input style={{ width: '50%' }} placeholder="State" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item name="incident_date" label="Date">
          <DatePicker
            style={{ width: '100%' }}
            disabledDate={picked => {
              return moment().add(1, 'days') <= picked;
            }}
          />
        </Form.Item>

        {/* Confidence Rating: */}
        <div className="dropdown-text-wrap">
          <p className="complete-incident-dropdown-titles-bold">
            Confidence Rating:
          </p>
          <p>{(initialValues.confidence * 100).toFixed(2)}%</p>
        </div>

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
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select mode="tags">
            {initialValues.tags.map((tag, index) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="admin-edit-bottom">
        <Button onClick={cancel}>Cancel</Button>
        <Button className="admin-edit-submit" type="primary" htmlType="submit">
          Apply Changes
        </Button>
      </div>
    </Form>
  );
}

export default AdminEdit;
