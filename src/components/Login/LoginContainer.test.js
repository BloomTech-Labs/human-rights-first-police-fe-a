import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import LoginContainer from './LoginContainer';

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
});
