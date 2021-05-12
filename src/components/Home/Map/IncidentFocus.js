import { useMemo } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Collapse, List } from 'antd';
import IncidentFocusCard from './IncidentFocusCard';
const { Panel } = Collapse;

export default function IncidentFocus({ zoomOnCluster }) {
  const activeFocus = useSelector(state => state.map.focus.active);
  const clusterList = useSelector(state => state.map.focus.cluster.list);
  const queryList = useSelector(state => state.map.focus.query.list);
  const defaultList = useSelector(state => [state.incident.timeline[0]]); // most recent incident

  const activeList = useMemo(() => {
    return activeFocus === 'cluster'
      ? clusterList
      : activeFocus === 'query'
      ? queryList
      : defaultList;
  }, [activeFocus, clusterList, queryList, defaultList]);

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
                {activeList.map(id => (
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
