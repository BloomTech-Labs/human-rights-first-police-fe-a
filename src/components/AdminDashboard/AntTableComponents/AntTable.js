import React, { useState, useEffect } from 'react';
import { Table, Space, Divider } from 'antd';
import axios from 'axios';
import { getData } from '../../../utils/DashboardHelperFunctions';
import CompleteIncident from '../CompleteIncident';
import { DateTime } from 'luxon';

//https://ant.design/components/table/ <---documentation on the table

function AntTable(props) {
  const [incidents, setIncidents] = useState([]);
  const [selectionType, setSelectionType] = useState('checkbox');
  const { unapprovedIncidents, setUnapprovedIncidents } = props;

  const [selected, setSelected] = useState([]);

  //this axios call should be passed in, not repeated
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`)
  //     .then(res => {
  //       console.log(res.data);
  //       setIncidents(res.data);
  //     });
  // }, []);

  function formattingDate(inputData) {
    const [year, month, day] = inputData.date.split('-');
    return `${month}/${day.slice(0, 2)}/${year}`;
  }

  const onSelect = selectedIncident => {
    setSelected(selectedIncident);
    console.log(selected);
  };

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
      align: 'left',
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
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        let aTime = DateTime.fromISO(a.date.slice(0.1));
        let bTime = DateTime.fromISO(b.date.slice(0, 10));

        return aTime - bTime;
      },
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
          <button>Delete</button>
          <button>Approve</button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* <Divider /> */}

      <Table
        columns={columns}
        dataSource={unapprovedIncidents}
        rowKey={'id'}
        expandable={{
          expandedRowRender: incident => (
            <CompleteIncident
              incident={incident}
              formattedDate={formattingDate(incident)}
              getData={getData}
              setUnapprovedIncidents={setUnapprovedIncidents}
            />
          ),
          rowExpandable: data => data.id !== null,
        }}
        rowSelection={{
          selected,
          onChange: onSelect,
        }}
        pagination={{
          position: ['topRight', 'bottomCenter'],
        }}
        // scroll={{ y: 800 }}
      />
    </div>
  );
}

export default AntTable;
