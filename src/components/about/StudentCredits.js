import { Collapse, Avatar, Tag } from 'antd';
import cohorts from './labsCohorts';
import GitHubMark from './GitHubMark.png';
const { Panel } = Collapse;

export default function StudentCredits() {
  return (
    <div style={{ 'padding-bottom': '2rem' }}>
      <Collapse defaultActiveKey={[cohorts[0].number]} expandIcon={() => ''}>
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
      </Collapse>
    </div>
  );
}
