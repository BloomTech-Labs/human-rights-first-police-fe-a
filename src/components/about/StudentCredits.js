import { Collapse, Avatar, Tag } from 'antd';
import cohorts from './labsCohorts';
import GitHubMark from './GitHubMark.png';
import { Menu } from 'antd';
import labsCohorts from './labsCohorts';
import { useState } from 'react';
import { indexOf } from 'lodash';
const { Panel } = Collapse;

export default function StudentCredits() {
  const [cohort, setCohort] = useState(labsCohorts[0]);
  return (
    <div style={{ 'padding-bottom': '2rem' }}>
      <Menu
        mode="horizontal"
        style={{
          textAlign: 'center',
        }}
      >
        {cohorts.map(cohort => (
          <Menu.Item
            key={cohort.number}
            onClick={() => {
              setCohort(cohort);
            }}
          >
            Labs {cohort.number}
          </Menu.Item>
        ))}
      </Menu>

      <div>
        {cohort.students.map(student => (
          <div
            style={{
              margin: '0.25rem 0',
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
            className="student-container"
          >
            <div>
              <a
                href={`https://github.com/${student.githubUser}`}
                target="_blank"
                rel="noreferrer"
                style={{ 'margin-right': '0.4rem' }}
              >
                <Avatar src={GitHubMark} size={16} />
              </a>

              {student.name}
            </div>

            <span style={{ 'margin-left': '0.5rem' }}>
              {student.roles.map(role =>
                role === 'fe' ? (
                  <Tag>Front End</Tag>
                ) : role === 'mle' ? (
                  <Tag>Machine Learning Engineer</Tag>
                ) : role === 'tpm' ? (
                  <Tag>Technical Project Manager</Tag>
                ) : role === 'be' ? (
                  <Tag>Back End</Tag>
                ) : role === 'design' ? (
                  <Tag>Design Lead</Tag>
                ) : role === 'ds' ? (
                  <Tag>Data Science</Tag>
                ) : role === 'web' ? (
                  <Tag>Web</Tag>
                ) : role === 'fs' ? (
                  <Tag>Full Stack</Tag>
                ) : (
                  ''
                )
              )}
            </span>
          </div>
        ))}
      </div>

      {/* <Collapse defaultActiveKey={[cohorts[0].number]} expandIcon={() => ''}>
        {cohorts.map(cohort => (
          <Panel
            header={
              <span
                style={{ 'font-size': '1rem' }}
              >{`Labs ${cohort.number}`}</span>
            }
            key={cohort.number}
          >
            {cohort.students.map(student => (
              <div style={{ margin: '0.25rem 0' }}>
                {student.name}
                <a
                  href={`https://github.com/${student.githubUser}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ 'margin-left': '0.4rem' }}
                >
                  <Avatar src={GitHubMark} size={16} />
                </a>
                <span style={{ 'margin-left': '0.5rem' }}>
                  {student.roles.map(role =>
                    role === 'fe' ? (
                      <Tag color="blue">front end</Tag>
                    ) : role === 'be' ? (
                      <Tag color="green">back end</Tag>
                    ) : role === 'ds' ? (
                      <Tag color="magenta">data science</Tag>
                    ) : role === 'web' ? (
                      <Tag>web</Tag>
                    ) : (
                      ''
                    )
                  )}
                </span>
              </div>
            ))}
          </Panel>
        ))}
      </Collapse> */}
    </div>
  );
}
