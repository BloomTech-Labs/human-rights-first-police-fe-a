import { useSelector } from 'react-redux';
import Map from './Map';
import RecentTimeline from '../timeline/RecentTimeline';
import HorizontalBar from '../graphs/bargraph/HorizontalBar';
import './Home.css';

export default function Home() {
  const fetchStatus = useSelector(
    state => state.api.incidents.getincidents.status
  );

  return (
    <div>
      <div className="Map">
        <Map />
      </div>
      <div className="bottom-section">
        {fetchStatus === 'success' ? (
          <>
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
