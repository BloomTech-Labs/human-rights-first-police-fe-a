import React from 'react';
import { render, cleanup, screen } from '../../utils/test-utils';
import TimelineItems from './TimelineItems';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = {
  details: {
    incident_id: 'example',
    src: ['https://www.example.com'],
    categories: ['less-lethal'],
    city: 'San Jose',
    state: 'California',
    lat: 37.33532,
    long: -121.88931,
    title: 'Example',
    desc: 'Example',
    date: '2000-01-01T06:00:00.000Z',
    verbalization: false,
    empty_hand_soft: false,
    empty_hand_hard: false,
    less_lethal_methods: true,
    lethal_force: false,
    uncategorized: false,
  },
};

describe('<TimelineItems />', () => {
  test('Component renders', async () => {
    const { container } = await render(<TimelineItems {...props} />);
    expect(container).toContainElement(container.firstChild);
  });

  test('Heading and image are rendered in the component', async () => {
    await render(<TimelineItems {...props} />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images[0]).toBeInTheDocument();
  });
});
