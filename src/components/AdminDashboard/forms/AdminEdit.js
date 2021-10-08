import React from 'react';
import { Form, Input, Select, DatePicker, Button, Spin } from 'antd';
import moment from 'moment';

import './AdminEdit.less';

import { unitedStatesStates } from '../../../utils/DashboardHelperFunctions';

/** @typedef {import('../../../store/allIncidentsSlice').Incident} Incident */

/**
 * @typedef AdminEditProps
 * @property {Incident} incident
 * @property {() => void} onCancel
 * @property {(incident: Incident) => void} onSubmit
 * @property {boolean} isLoading
 */

const { Option } = Select;

/**
 *
 * @param {AdminEditProps} props
 */
function AdminEdit(props) {
  const { incident, onCancel, onSubmit, isLoading } = props;
  const [form] = Form.useForm();

  const initialValues = {
    ...incident,
    src: Array.isArray(incident.src) ? incident.src.join('\n') : incident.src,
    incident_date: moment(incident.incident_date).add(1, 'days'),
  };

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
      src: vals.src.split('\n'),
    };

    onSubmit(finalVals);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 9 }}
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <div className="admin-edit-top">

        {/* Title */}
        <Form.Item name="title" label="Title">
          <Input placeholder="No Title" />
        </Form.Item>

        {/* Description */}
        <Form.Item name="description" label="Description">
          <Input.TextArea autoSize={{ minRows: 2 }} />
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

        {/* Confidence Rating: */}
        <Form.Item label="Confidence">
          <div>{(initialValues.confidence * 100).toFixed(2)}%</div>
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
          />
        </Form.Item>


        <Form.Item label="Tweet">
          <Input.Group compact>
            <Form.Item name="user_name" label="Username" noStyle>
              <Input style={{ width: '50%' }} placeholder="Username" />
            </Form.Item>

            <Form.Item name="tweet_id" label="Tweet ID" noStyle>
              <Input style={{ width: '50%' }} placeholder="Tweet ID" />
            </Form.Item>
          </Input.Group>
        </Form.Item>


        <Form.Item name="tags" label="Tags">
          <Select mode="tags" tokenSeparators={[',']}>
            {initialValues.tags.map((tag, index) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="admin-edit-bottom">
            <Button onClick={onCancel}>Cancel</Button>
            <Spin spinning={isLoading}>
              <Button className="admin-edit-submit" type="primary" htmlType="submit">
                Apply Changes
              </Button>
            </Spin>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
}

export default AdminEdit;
