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
  const {
    unapprovedIncidents,
    setUnapprovedIncidents,
    selected,
    setSelected,
  } = props;

  function formattingDate(inputData) {
    const [year, month, day] = inputData.date.split('-');
    return `${month}/${day.slice(0, 2)}/${year}`;
  }

  const onSelect = selectedIncidents => {
    setSelected(selectedIncidents);
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
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={unapprovedIncidents}
        rowKey={'id'}
        expandable={{
          expandedRowRender: incident => {
            return (
              <CompleteIncident
                incident={incident}
                formattedDate={formattingDate(incident)}
                getData={getData}
                setUnapprovedIncidents={setUnapprovedIncidents}
              />
            );
          },
          rowExpandable: data => data.id !== null,
        }}
        rowSelection={{
          selected,
          onChange: onSelect,
        }}
        pagination={{
          position: ['topRight', 'bottomCenter'],
          total: unapprovedIncidents.length,
          showTotal(total, range) {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
        }}
      />
    </div>
  );
}

export default AntTable;
