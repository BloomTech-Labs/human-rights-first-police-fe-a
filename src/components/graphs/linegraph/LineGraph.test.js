import React from 'react';
import { render, cleanup } from '../../../utils/test-utils';
import LineGraph from './LineGraph';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// GraphContainer should take care of the case of null data, so the test should
// have valid test data
const testMonths = ['June'];

const testData = {
  June: 1,
};

describe('<LineGraph />', () => {
  test('Component renders', async () => {
    const { container } = await render(
      <LineGraph data={testData} months={testMonths} />
    );
    expect(container).toContainElement(container.firstChild);
  });
});
