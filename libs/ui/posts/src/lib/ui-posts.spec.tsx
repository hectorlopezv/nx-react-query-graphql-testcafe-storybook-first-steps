import { render } from '@testing-library/react';

import UiPosts from './ui-posts';

describe('UiPosts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiPosts />);
    expect(baseElement).toBeTruthy();
  });
});
