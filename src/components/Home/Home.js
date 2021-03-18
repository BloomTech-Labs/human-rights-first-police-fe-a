import { useSelector } from 'react-redux';
import Map from './Map';
import Stats from '../Stats/Stats';
import RecentTimeline from '../timeline/RecentTimeline';
import HorizontalBar from '../graphs/bargraph/HorizontalBar';
import { Alert } from 'antd';

const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, 'I was closed.');
};

export default function Home() {
  const fetchStatus = useSelector(
    state => state.api.incidents.getincidents.status
  );

  return (
    <div>
      <div className="Map">
        <Map />
        {/* Scroll down for latest reported incidents */}
      </div>
      <Alert
        message="Scroll Down for Latest Reported Incidents"
        type="info"
        closable
        onClose={onClose}
      />
      <div className="bottom-section">
        {fetchStatus === 'success' ? (
          <>
            <Stats />
            <div className="bottom-section-wrap">
              <div className="Timeline">
                <RecentTimeline />
              </div>
              <div className="horizontal-graph">
                <HorizontalBar />
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
