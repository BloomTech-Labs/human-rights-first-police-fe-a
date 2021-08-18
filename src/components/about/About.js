import React from 'react';
import './About.css';
import confirmIcon from '../../assets/the-confirm-icon.png';
import gatherIcon from '../../assets/gather-icon.png';
import categorizeIcon from '../../assets/categorize-icon.png';

import StudentCredits from './StudentCredits';
import lambdalogo from '../../assets/LambdaAssets/Lambda-Logo-Red 1.png';

const About = () => {
  return (
    <div className="about-page-container">
      <div className="about-top-container">
        <div className="data-description-container">
          <h1>How We Collected Data</h1>
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
              This repository accumulates and contextualize crowdsourced
              evidence of police use of force from various sources. Our second
              resource is Twitter. We continually search Twitter for evidence of
              police use of force with a Twitter bot using a technique called
              Natural Language Processing.
            </p>
          </div>

          <div className="info-container">
            <img className="icons" src={categorizeIcon} alt="" />
            <h2>Categorize</h2>
            <p>
              We generated a model within our database to categorize each
              incident report we receive. Our system is in beta, there may be
              some false positives (e.g., incident reports where law enforcement
              was present but no use-of-force incidents actually occurred).
              Also, some false negatives (e.g., incident reports where
              use-of-force occurred and reported but do not make it into our
              system). To combat this, each incident report needs approval by
              the Blue Witness Administrative Team.
            </p>
          </div>

          <div className="info-container">
            <img className="icons" src={confirmIcon} alt="confirm icon" />
            <h2>Confirm</h2>
            <p>
              If a gathered incident report meets the criteria of valid police
              use of force, the incident will be marked and reviewed. After an
              identified incident report has been approved, it is added to the
              incident reports database.
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
              to reports of police use of force incidents. By crowdsourcing
              incident reports from Twitter, we create a platform where people
              can contribute to a greater cause. Our database allows our users
              to export report data for their own use. We strive to provide a
              single source of truth on the topic of police use of force, that
              the public can use to inform themselves in the current state of
              the issue.
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
              Our Twitter Bot
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
              The goal of the Twitter bot on the Blue Witness project is to
              adequately scrape Twitter for reports of incidents of police
              violence. This is a complicated process, and inevitably some data
              gathered will be difficult to verify or at the very worst simply
              not relate to police incidents at all. As the Blue Witness project
              grows, the team is refining the training of this model to
              accurately reflect individual incidents on Twitter. It reaches out
              to people posting those incidents and automatically ask some
              follow-up questions, enhancing the Human Rights First
              administrative team. By having the Ability to quickly update the
              incident map as well as the data available for download to
              researchers, journalists, students, and activists. If you'd like
              to know more, feel free to reach out to HRF on our contact page.
            </p>
          </div>
        </div>
        <div className="inside-bottom-container lambda-credits-container">
          <div className="lambda-credits">
            <h2>Who Built This Website</h2>
            <p>
              This project designed and built in partnership between Human
              Rights First's Innovation Lab and Lambda School. It represents
              nearly eight months of work by Lambda School students. Below are
              all the students, and their GitHub profiles, that have ever worked
              on this website.
            </p>
          </div>
          <div className="student-credits-container">
            <StudentCredits />
          </div>
          <div className="about-logo-container">
            <img
              className="about-lambda-logo"
              src={lambdalogo}
              alt="lambda logo"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
