import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import PieGraph from './PieGraph';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const props = { data: [], usState: '' };

describe('<PieGraph />', () => {
  test('Component renders', async () => {
    const { container } = await render(<PieGraph {...props} />);
    expect(container).toContainElement(container.firstChild);
  });
});
