import { render, screen } from '@testing-library/react';

import type { AutoSaveProps } from '..';
import AutoSave from '..';
import { DEFAULT_LABELS, TEST_ID } from '../constants';

describe('AutoSave', () => {
  const renderComponent = (props: AutoSaveProps) => {
    return render(<AutoSave {...props} />);
  };

  const getAutoSave = () => screen.getByTestId(TEST_ID);

  it('should render in idle status with default label', async () => {
    renderComponent({ status: 'idle' });
    const element = getAutoSave();
    expect(element).toHaveTextContent(DEFAULT_LABELS.idle);
  });

  it('should render in loading status with default label', async () => {
    renderComponent({ status: 'loading' });
    const element = getAutoSave();
    expect(element).toHaveTextContent(DEFAULT_LABELS.loading);
  });

  it('should render in success status with default label', async () => {
    renderComponent({ status: 'success' });
    const element = getAutoSave();
    expect(element).toHaveTextContent(DEFAULT_LABELS.success);
  });

  it('should render in error status with default label', async () => {
    renderComponent({ status: 'error' });
    const element = getAutoSave();
    expect(element).toHaveTextContent(DEFAULT_LABELS.error);
  });

  it('should render in loading status with custom label', async () => {
    renderComponent({
      labels: { loading: '__loading__' },
      status: 'loading',
    });
    const element = getAutoSave();
    expect(element).toHaveTextContent('__loading__');
  });

  it('should render in success status with custom label', async () => {
    renderComponent({
      labels: { success: '__success__' },
      status: 'success',
    });
    const element = getAutoSave();
    expect(element).toHaveTextContent('__success__');
  });

  it('should render in error status with custom label', async () => {
    renderComponent({
      labels: { error: '__error__' },
      status: 'error',
    });
    const element = getAutoSave();
    expect(element).toHaveTextContent('__error__');
  });

  it('should override the default error label with a custom detail', async () => {
    renderComponent({
      status: 'error',
      errorDetail: '__error_detail__',
    });
    const element = getAutoSave();
    expect(element).toHaveTextContent('__error_detail__');
  });

  it('should override the error label with a custom detail', async () => {
    renderComponent({
      errorDetail: '__error_detail__',
      labels: { error: '__error__' },
      status: 'error',
    });
    const element = getAutoSave();
    expect(element).toHaveTextContent('__error_detail__');
  });
});
