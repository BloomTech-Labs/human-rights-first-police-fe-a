import React from 'react';
import { render, cleanup, screen } from '../../utils/test-utils';
import LoginContainer from './LoginContainer';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<LoginContainer />', () => {
  test('Component renders and inserts Okta widget', async () => {
    const { container } = await render(<LoginContainer />);
    expect(container).toContainElement(container.firstChild);

    // Would prefer to split these into two tests, but widget.remove() crashes jest
    // and widget.renderEl() causes a crash if remove() wasn't previously called.
    // Not sure it's worth the effort to mock the OktaSignIn constructor.
    expect(container.querySelector('#sign-in-widget')).toBeTruthy();
    expect(container.querySelector('#okta-sign-in')).toBeTruthy();
  });
  test.only('Component responds with error message due to no credentials provided', async () => {
    await render(<LoginContainer />);
    const submitButton = await screen.findByText(/sign in/i);
    userEvent.click(submitButton);
    const errorMessage = await screen.findByText(
      /We found some errors. Please review the form and make corrections./i
    );
    expect(errorMessage).toBeTruthy();
  });
});
