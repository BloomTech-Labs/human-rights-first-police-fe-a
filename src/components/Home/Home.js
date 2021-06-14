import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Map from './Map';
import Stats from '../Stats/Stats';
import RecentTimeline from '../timeline/RecentTimeline';
import HorizontalBar from '../graphs/bargraph/HorizontalBar';
import MobileNotification from '../Home/MobileNotification';
import { useMediaQuery } from 'react-responsive'; // npm package that allows you to use media queries in React
import './Home.css';

export default function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fetchStatus = useSelector(
    state => state.api.incidents.getincidents.status
  );

  return (
    <div>
      {isVisible && isMobile ? <MobileNotification /> : null}
      <div className="Map">
        <Map />
      </div>
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
