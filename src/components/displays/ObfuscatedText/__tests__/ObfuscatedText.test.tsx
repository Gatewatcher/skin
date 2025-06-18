import { render, screen } from '@testing-library/react';

import ObfuscatedText from '..';

describe('ObfuscatedText', () => {
  it('should find by text', async () => {
    render(<ObfuscatedText text="hello world!" />);

    expect(screen.getByText('hello world!').textContent).not.toEqual(
      'hello world!',
    );
  });
});
