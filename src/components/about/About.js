import React from 'react';
import './About.css';
import confirmIcon from '../../assets/the-confirm-icon.png';
import gatherIcon from '../../assets/gather-icon.png';
import categorizeIcon from '../../assets/categorize-icon.png';

import StudentCredits from './StudentCredits';
import bloomlogo from '../../assets/BloomTechAssets/BIT_Logo_Stacked.png';

const About = () => {
  return (
    <div className="about-page-container">
      <div className="about-top-container">
        <div className="data-description-container">
          <h1>How We Collect Data</h1>
          <p className="h1-text">
            This website crowdsources data from multiple sources, categorized by
            Machine Learning (ML) techs, and is then approved by a member of the
            Blue Witness Administrative Team.
          </p>
        </div>

        <div className="data-info-container">
          <div className="info-container">
            <img className="icons" src={gatherIcon} alt="" />
            <h2>Gather</h2>
            <p>
              The first data source used for this website originates from the
              <a
                className="about-links"
                href="https://github.com/2020PB/police-brutality"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                PB2020/police-brutality GitHub Repository
              </a>
              {'. '}
              This repository accumulates and contextualizes crowdsourced
              evidence of police use-of-force from various sources. Our second
              resource is Twitter. We continually search Twitter for evidence of
              police use-of-force with a Twitter scraper using
              <a
                className="about-links"
                href="https://en.wikipedia.org/wiki/BERT_(language_model)"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                BERT
              </a>
              {'. '}
            </p>
          </div>

          <div className="info-container">
            <img className="icons" src={categorizeIcon} alt="" />
            <h2>Categorize</h2>
            <p>
              Our BERT model categorizes each incident report we receive. Our
              system is in beta, there may be some false positives (e.g.,
              incident reports where law enforcement was present but no
              use-of-force incidents occurred). Also, some false negatives
              (e.g., incident reports where use-of-force occurred and reported
              but do not make it into our system). To combat this, each incident
              report needs approval from the Blue Witness Administrative Team.
            </p>
          </div>

          <div className="info-container">
            <img className="icons" src={confirmIcon} alt="confirm icon" />
            <h2>Confirm</h2>
            <p>
              The incident report exists in our database and its status changed
              to 'approved' or 'rejected'. By keeping both in the database, we
              can be sure that our Twitter scraper doesn't pull in a duplicated
              instance in our database.
            </p>
          </div>
        </div>
      </div>

      <div className="about-bottom-container">
        <div className="inside-bottom-container about-bw-container">
          <div className="about-bw">
            <h2>The Blue Witness Project</h2>
            <p>
              The Blue Witness project is a movement to give the public access
              to reports of police use-of-force incidents. By crowdsourcing
              incident reports from Twitter, we create a platform where people
              can contribute to a greater cause. Our database allows our users
              to export report data for their use. We strive to provide a single
              source of truth on the topic of police use-of-force, that the
              public can use to inform themselves in the current state of the
              issue.
            </p>
          </div>
          <div className="about-hrf">
            <h2>Human Rights First Mission</h2>
            <p>
              Human Rights First is an independent advocacy and action
              organization that challenges America to live up to its ideals. We
              believe American leadership is essential in the global struggle
              for human rights, so we press the U.S. government and private
              companies to respect human rights and the rule of law. When they
              fail, we step in to demand reform, accountability, and justice.
              Around the world, we work where we can best harness American
              influence to secure core freedoms.
            </p>
          </div>
          <div className="about-bot-container">
            <h2>
              Our Twitter Scraper/Bot
              <span>
                {' '}
                <img
                  className="twitter-icon"
                  src="https://img.icons8.com/android/24/ffffff/twitter.png"
                  alt="twitter icon"
                />
              </span>
            </h2>
            <p>
              The Twitter scraper on the Blue Witness project is responsible for
              gathering tweets with content-specific criteria, including (but
              not limited to) keywords such as “police” and “misconduct” and
              their synonyms. It does this multiple times a day and checks the
              incoming data against data in our database to prevent duplicates
              from being entered into the database. It then passes them to the
              BERT model to be classified and awaits administrator approval. The
              Twitter bot is a tool that reaches out to Twitter users to confirm
              or supply the missing information. It is also triggered by the
              Administration Team, and new data gathered awaits approval before
              being marked as an 'approved' incident report. This enhances the
              Blue Witness administrator's ability to quickly update the
              incident map as well as the data available for download for
              researchers, journalists, students, and activists. If you'd like
              to know more, feel free to reach out to HRF on our contact page.
            </p>
          </div>
        </div>
        <div className="inside-bottom-container bloomtech-credits-container">
          <div className="bloomtech-credits">
            <h2>Who Built This Website</h2>
            <p>
              Project designed and developed in partnership between Human Rights
              First's Innovation Lab and Bloom Institute of Technology. It
              represents nearly eight months of work by Bloom Institute of
              Technology learners. Below are the learners who have worked on
              this project, with links to their GitHub profiles included.
            </p>
          </div>
          <div className="student-credits-container">
            <StudentCredits />
          </div>
          <div className="about-logo-container">
            <img
              className="about-bloomtech-logo"
              src={bloomlogo}
              alt="bloomtech logo"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
