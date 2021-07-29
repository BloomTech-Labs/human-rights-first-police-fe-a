import { Collapse, Avatar, Tag } from 'antd';
import cohorts from './labsCohorts';
import GitHubMark from './GitHubMark.png';
import { Menu } from 'antd';
import labsCohorts from './labsCohorts';
import { useState } from 'react';
import { indexOf } from 'lodash';
import { nanoid } from 'nanoid';
const { Panel } = Collapse;

export default function StudentCredits() {
  const [cohort, setCohort] = useState(labsCohorts[0]);
  return (
    <div style={{ paddingBottom: '2rem' }}>
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
            key={nanoid()}
          >
            <div>
              <a
                href={`https://github.com/${student.githubUser}`}
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: '0.4rem' }}
              >
                <Avatar src={GitHubMark} size={16} />
              </a>

              {student.name}
            </div>

            <span style={{ marginLeft: '0.5rem' }}>
              {student.roles.map(role =>
                role === 'fe' ? (
                  <Tag key={nanoid()}>Front End Developer</Tag>
                ) : role === 'mle' ? (
                  <Tag key={nanoid()}>Machine Learning Engineer</Tag>
                ) : role === 'tpm' ? (
                  <Tag key={nanoid()}>Technical Project Manager</Tag>
                ) : role === 'be' ? (
                  <Tag key={nanoid()}>Back End Developer</Tag>
                ) : role === 'design' ? (
                  <Tag key={nanoid()}>Design Lead</Tag>
                ) : role === 'ds' ? (
                  <Tag key={nanoid()}>Data Scientist</Tag>
                ) : role === 'web' ? (
                  <Tag key={nanoid()}>Web Developer</Tag>
                ) : role === 'fs' ? (
                  <Tag key={nanoid()}>Full Stack Developer</Tag>
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
