import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import BarGraph from './BarGraph';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// Having a null count is dealt with by GraphContainer, so BarGraph should
// always expect a valid dataset
const testCount = {
  'A test case': { abbreviation: 'a', count: 1 },
};

describe('<BarGraph />', () => {
  test('Component renders', async () => {
    const { container } = await render(<BarGraph count={testCount} />);
    expect(container).toContainElement(container.firstChild);
  });
});
