import { render } from '@testing-library/react';

import UiPost from './ui-post';

describe('UiPost', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiPost />);
    expect(baseElement).toBeTruthy();
  });
});
