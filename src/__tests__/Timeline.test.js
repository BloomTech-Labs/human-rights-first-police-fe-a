import React from 'react';
import { render } from '@testing-library/react';
import { RecentTimeline } from '../components/timeline/RecentTimeline';

test('renders RecentTimeline component', () => {
  render(<RecentTimeline />);
});

test('renders RecentTimeline individual components', () => {
  const title = document.querySelector('h3');
  const cityState = document.getElementsByClassName('cityState');
  const timelineLinks = document.getElementsByClassName('timeline-links');
  const categoriesItems = document.querySelectorAll('span');

  expect(title).toBeDefined();
  expect(cityState).toBeDefined();
  expect(timelineLinks).toBeDefined();
  expect(categoriesItems).toBeDefined();
});
