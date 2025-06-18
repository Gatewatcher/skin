import { render, screen } from '@testing-library/react';

import { Label } from '@/skin/displays';

describe('Label', () => {
  const LABEL_TEXT = 'hello world';

  it('should find the text element by text, then get its ancestor label', async () => {
    render(<Label label={LABEL_TEXT} />);

    const textElement = await screen.findByText(LABEL_TEXT);

    expect(textElement.closest('label')).toBeInstanceOf(HTMLLabelElement);
  });

  it('should find the label element by label text', async () => {
    render(<Label label={LABEL_TEXT} isRequired obfuscated />);

    const labelElement = await screen.findByLabelText(LABEL_TEXT);

    expect(labelElement).toBeInstanceOf(HTMLLabelElement);
  });

  it('should find the associated input element by role (linked)', async () => {
    render(
      <>
        <Label htmlFor="hello" label={LABEL_TEXT} isRequired obfuscated />
        <input id="hello" type="text" />
      </>,
    );

    const inputElement = await screen.findByRole('textbox', {
      name: LABEL_TEXT,
    });

    expect(inputElement).toBeInstanceOf(HTMLInputElement);
  });

  it('should find the associated input element by role (nested)', async () => {
    render(
      <Label label={LABEL_TEXT} isRequired obfuscated>
        <input type="text" />
      </Label>,
    );

    const inputElement = await screen.findByRole('textbox', {
      name: LABEL_TEXT,
    });

    expect(inputElement).toBeInstanceOf(HTMLInputElement);
  });
});
