import React, { useState, useEffect } from 'react';
import { Table, Space, Divider } from 'antd';
import axios from 'axios';

//https://ant.design/components/table/ <---documentation on the table

function AntTable() {
  const [incidents, setIncidents] = useState([]);
  const [selectionType, setSelectionType] = useState('checkbox');

  //this axios call should be passed in, not repeated
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`)
      .then(res => {
        console.log(res.data);
        setIncidents(res.data);
      });
  }, []);

  const columns = [
    //   //When DS provides data for this, uncomment for Admin Table to show %, and move.
    // {
    //   title: 'Accuracy Estimate',
    //   dataIndex: 'acc_estimate',
    //     key: 'acc_estimate',
    //     },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
      fixed: 'top',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      align: 'right',
      fixed: 'top',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      fixed: 'top',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      fixed: 'top',
    },
    {
      title: 'Changes',
      dataIndex: '',
      key: 'changes',
      align: 'center',
      fixed: 'top',
      render: (text, record) => (
        <Space size="middle">
          {/* I believe if you create onClick functions, this will work the same but there was not enough documentation to figure it out and pass props to this */}
          <button>Edit</button>
          <button>Delete</button>
          <button>Approve</button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Divider />

      <Table
        columns={columns}
        dataSource={incidents}
        pagination={{ position: ['topRight', 'bottomCenter'] }}
        scroll={{ y: 300 }}
      />
    </div>
  );
}

export default AntTable;
