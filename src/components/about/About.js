import React from 'react';
import StudentCredits from './StudentCredits';

// component imports
import DataExportForm from './DataExportForm';

import lambdalogo from '../../assets/LambdaAssets/Lambda-Logo-Red 1.png';

const About = () => {
  return (
    <div className="about-container">
      <h1>Frequently Asked Questions</h1>
      <h2>Where does your data come from?</h2>
      <p>
        The incidents displayed on the map and in our database come from three
        different sources: reports from social media sites, specifically Twitter
        and Reddit; reports that were manually curated for inclusion in the
        database maintained by r/2020PBAPI; reports from local and national
        news. The system’s AI recognizes incidents of police-use-of-force via a
        family of techniques referred to as Natural Language Processing.
        Wherever possible, we deduplicated incidents after merging the data from
        these three sources to present as comprehensive a view as possible
        without inflating the number of incidents during the aggregation
        process. Because our system is largely automated, there may be some
        false positives (e.g., incidents where law enforcement were present but
        no use-of-force incidents actually occurred) and some false negatives
        (e.g., incidents where use-of-force occurred and were reported but do
        not make it into our system). If you would like to submit an incident
        that is not currently in our system, you can do so through this
        submission form [Link].
      </p>
      {/* 
      To be updated when DS API updates are corrected
      <h2>How up-to-date is your data?</h2>
      <p>Our system updates every 24 hours at XX:XX time Pacific.</p> 
      */}
      {/* 
      To be updated when DS API updates are corrected
      <h2>How much time does your data cover?</h2>
      <p>Our backend processes started collection on date [X] and run through the present day. Our earliest reported incident occurred on [Insert Date Here]</p> 
      */}
      <h2>Can I have a copy of your dataset?</h2>
      <div>
        <span>
          Yes, you can access our complete database via download as a .csv file
          and view as a JSON object. This site is also open source and you can
          access the site code here [link to Github repo]. Leave date and state
          fields empty to receive complete data set.
        </span>
        <DataExportForm />
        <p></p> {/* for spacing */}
      </div>
      <h2>Who built this site?</h2>
      <p>
        This project was designed and built in a partnership between Human
        Rights First's Innovation Lab and Lambda School. It represents nearly
        six months of work by Lambda School students.
      </p>
      <StudentCredits />
    </div>
  );
};

export default About;
