import { renderComponent } from './utils';

describe('SidePanel', () => {
  it('should open using the provider API', async () => {
    const result = renderComponent();
    await result.openUsingProvider();
    result.expectContentToBeDisplayed();
  });

  it('should open using the hook', async () => {
    const result = renderComponent();
    await result.openUsingHook();
    result.expectContentToBeDisplayed();
  });

  it('should close using the provider API', async () => {
    const result = renderComponent();
    await result.closeUsingProvider();
    await result.expectContentNotToBeDisplayed();
  });

  it('should close using the hook', async () => {
    const result = renderComponent();
    await result.closeUsingHook();
    await result.expectContentNotToBeDisplayed();
  });

  it('should initially be opened by passing an init element', async () => {
    const result = renderComponent({ init: 'Hello side panel!' });
    result.expectContentToBeDisplayed();
  });

  it('should initially be opened by passing an init function', async () => {
    const result = renderComponent({ init: () => 'Hello side panel!' });
    result.expectContentToBeDisplayed();
  });
});
