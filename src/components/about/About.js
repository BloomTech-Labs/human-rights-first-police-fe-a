import React from 'react';
import './About.css';

import StudentCredits from './StudentCredits';

// component imports
import DataExportForm from './DataExportForm';

import lambdalogo from '../../assets/LambdaAssets/Lambda-Logo-Red 1.png';

// const About = () => {
//   return (
//     <div className="about-container">
//       <h1>Frequently Asked Questions</h1>
//       <h2>Where does your data come from?</h2>
//       <p>
//         The data used for this website originates from multiple sources:
//         <ol>
//           <li>
//             PB2020/police-brutality Github Repository - This repository
//             accumulates and contextualizes crowdsourced evidence of police
//             brutality from various sources. The repository can be found at{' '}
//             <a
//               href="https://github.com/2020PB/police-brutality"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               https://github.com/2020PB/police-brutality
//             </a>
//           </li>
//           <li>
//             Twitter - We continually search Twitter for evidence of police
//             intervention using a technique called Natural Language Processing.
//             After an identified incident report has been approved by a member of
//             the Blue Witness team, it is added to the incident reports database.
//           </li>
//           <li>Manually input data by Blue Witness team members.</li>
//         </ol>
//         Because our system is in beta, there may be some false positives (e.g.,
//         incident reports where law enforcement were present but no use-of-force
//         incidents actually occurred) and some false negatives (e.g., incident
//         reports where use-of-force occurred and were reported but do not make it
//         into our system).
//       </p>
//       {/*
//       To be updated when DS API updates are corrected
//       <h2>How up-to-date is your data?</h2>
//       <p>Our system updates every 24 hours at XX:XX time Pacific.</p>
//       */}
//       {/*
//       To be updated when DS API updates are corrected
//       <h2>How much time does your data cover?</h2>
//       <p>Our backend processes started collection on date [X] and run through the present day. Our earliest reported incident occurred on [Insert Date Here]</p>
//       */}
//       <h2>Can I have a copy of your dataset?</h2>
//       <div>
//         <span>
//           Yes, you can access our complete database via download as a .csv file
//           and view as a JSON object. This site is also open source and you can
//           access the site code here [link to Github repo]. Leave date and state
//           fields empty to receive complete data set.
//         </span>
//         <DataExportForm />
//         <p></p> {/* for spacing */}
//       </div>
//       <h2>Who built this site?</h2>
//       <p>
//         This project was designed and built in a partnership between Human
//         Rights First's Innovation Lab and Lambda School. It represents nearly
//         seven months of work by Lambda School students.
//       </p>
//       <StudentCredits />
//       <img
//         className="lambda-logo"
//         src={lambdalogo}
//         alt="Lambda School Red Logo"
//       />
//     </div>
//   );
// };

const About = () => {
  return (
    <div className="about-page-container">
      <div className="about-top-container">
        <div className="data-description-container">
          <h2>How our data is crowdsourced</h2>
          <p>
            The data for this website originates from multipe sources and is
            categorized by ML techs and approved by a member of the Blue Witness
            Administrative Team.
          </p>
        </div>

        <div className="">
          <div className="gather-container">
            <h3>Gather</h3>
            <ul>
              The data used for this website originates from multiple sources:
              <li>
                <a
                  href="https://github.com/2020PB/police-brutality"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PB2020/police-brutality GitHub Repository
                </a>{' '}
                - This repository accumulates and contextualizes crowdsourced
                evidence of police brutality from various sources.{' '}
              </li>
              <li>
                Twitter - We continually search Twitter for evidence of police
                intervention with a twitter bot using a technique called Natural
                Language Processing.
              </li>
              <li>
                Manual - Manually inputed data by the Blue Witness
                Administrative Team.
              </li>
            </ul>
          </div>

          <div className="categorize-container">
            <h3>Categorize</h3>
            <p>
              We have generated a model with in our data base to catergorize
              each incident report we recive. Because our system is in beta,
              there may be some false positives (e.g.,incident reports where law
              enforcement were present but no use-of-force incidents actually
              occurred), and some false negatives (e.g., incident reports where
              use-of-force occurred and were reported but do not make it into
              our system). To combat this, each incident report needs to be
              approved by the Blue Witness Administrative Team.
            </p>
          </div>

          <div className="confirm-container">
            <h3>Confirm</h3>
            <p>
              If a gathered incident report meets the criteria of a valid
              "police brutallity" incident, then it's marked to be reviewed.
              After an identified incident report has been approved, it is added
              to the incident reports database.
            </p>
          </div>
        </div>
      </div>

      <div className="about-bottom-container"></div>
    </div>
  );
};

export default About;
