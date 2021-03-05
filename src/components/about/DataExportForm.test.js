import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import DataExportForm from './DataExportForm';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<DataExportForm />', () => {
  test('Component renders', async () => {
    const { container } = await render(<DataExportForm />);
    expect(container).toContainElement(container.firstChild);
  });
});
