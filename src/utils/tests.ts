// Needs to be called after userEvent.setup().

// https://testing-library.com/docs/user-event/clipboard/
export const mockClipboardWriteText = (
  mockImplementation: () => Promise<void> = async () => {},
) =>
  vi
    .spyOn(window.navigator.clipboard, 'writeText')
    .mockImplementation(mockImplementation);
