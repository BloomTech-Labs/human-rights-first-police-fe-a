import { useMemo } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Collapse, List } from 'antd';
import IncidentFocusCard from './IncidentFocusCard';
import useIncidentFilter from '../../../hooks/useIncidentFilter';

const { Panel } = Collapse;

//useSelectors for getting state for map
export default function IncidentFocus({ zoomOnCluster }) {
  const filteredIncidents = useIncidentFilter();

  return (
    <div className="map-menu-background">
      <div className="map-menu">
        <Collapse
          className="collapserMap"
          style={{ color: 'white' }}
          defaultActiveKey={['0']}
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          expandIconPosition="right"
          ghost
          accordion={true}
        >
          <Panel
            className="collapseText"
            header="View Incident Reports"
            bordered={false}
            style={{ color: 'white' }}
            key="1"
          >
            <div className="incident-content">
              <List>
                {filteredIncidents.map(id => (
                  <IncidentFocusCard
                    id={id}
                    key={id}
                    zoomOnCluster={zoomOnCluster}
                  />
                ))}
              </List>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
