import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ButtonAsync } from '@/skin/actions';

import type { StepperProps } from '..';
import Stepper from '..';
import type {
  StepperNavigationProps,
  StepperNavigationRenderFn,
} from '../compounds/Navigation';

describe('Stepper', () => {
  const TEST_ID: TestId = 'stepper';
  const user = userEvent.setup();

  const renderComponent = ({
    submit,
    navigationChildren,
    ...props
  }: Partial<
    StepperProps &
      StepperNavigationProps & { navigationChildren: StepperNavigationRenderFn }
  > = {}) =>
    render(
      <Stepper data-testid={TEST_ID} {...props}>
        <Stepper.TitleList data-testid="stepper-title-list">
          <Stepper.Title data-testid="stepper-title">Step1</Stepper.Title>
          <Stepper.Title data-testid="stepper-title">Step2</Stepper.Title>
          <Stepper.Title data-testid="stepper-title">Step3</Stepper.Title>
        </Stepper.TitleList>

        <Stepper.PanelList data-testid="stepper-panel-list">
          <Stepper.Panel data-testid="stepper-panel">Panel1</Stepper.Panel>
          <Stepper.Panel data-testid="stepper-panel">Panel2</Stepper.Panel>
          <Stepper.Panel data-testid="stepper-panel">Panel3</Stepper.Panel>
        </Stepper.PanelList>

        <Stepper.Navigation
          submit={
            submit || (
              <ButtonAsync
                onClick={() =>
                  new Promise(resolve => setTimeout(resolve, 3000))
                }
                data-testid="stepper-submit"
              >
                Submit
              </ButtonAsync>
            )
          }
          margin={{ top: 10 }}
          next={<Stepper.Next>Next</Stepper.Next>}
          prev={<Stepper.Prev>Prev</Stepper.Prev>}
        >
          {navigationChildren}
        </Stepper.Navigation>
      </Stepper>,
    );

  const goNext = async () => {
    const button = await screen.findByTestId('stepper-next');
    await user.click(button);
  };

  const getActivePanel = () => screen.findByTestId('stepper-panel-active');

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('stepper');
  });

  it('should have 3 titles', async () => {
    renderComponent();
    const titles = await screen.findAllByTestId('stepper-title');
    // 2 cause one is active (stepper-title-active)
    expect(titles).toHaveLength(2);
  });

  it('should have 3 panels', async () => {
    renderComponent();
    const panels = await screen.findAllByTestId('stepper-panel');
    // 2 cause one is active (stepper-panel-active)
    expect(panels).toHaveLength(2);
  });

  it('should have active step', async () => {
    renderComponent();
    const step = await screen.findByTestId('stepper-title-active');
    await expectToBeVisibleInTheDocument('stepper-title-active');

    expect(step.firstChild).toHaveClass('TitleActive');
  });

  it('should not have prev button', async () => {
    renderComponent();
    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(1);

    await expectToBeVisibleInTheDocument('stepper-next');
    await expectNotToBeVisibleInTheDocument('stepper-prev');
  });

  it('should have prev button', async () => {
    renderComponent();
    await goNext();

    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(2);

    await expectToBeVisibleInTheDocument('Prev', screen.findByText);
    await expectToBeVisibleInTheDocument('Next', screen.findByText);
  });

  it('should change panel', async () => {
    renderComponent();
    await goNext();

    expect(await getActivePanel()).toHaveTextContent('Panel2');
  });

  it('should no go after last step', async () => {
    renderComponent();
    await goNext();
    expect(await getActivePanel()).toHaveTextContent('Panel2');

    await goNext();
    expect(await getActivePanel()).toHaveTextContent('Panel3');

    await expectNotToBeVisibleInTheDocument('stepper-next');
  });

  it('should have submit button at last panel', async () => {
    renderComponent();

    await goNext();
    expect(await getActivePanel()).toHaveTextContent('Panel2');
    await goNext();
    expect(await getActivePanel()).toHaveTextContent('Panel3');

    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(2);

    await expectNotToBeVisibleInTheDocument('stepper-next');
    await expectToBeVisibleInTheDocument('stepper-submit');
  });

  it('should submit as last step', async () => {
    const submit = vi.fn();

    renderComponent({
      submit: (
        <ButtonAsync data-testid="stepper-submit" onClick={submit}>
          Submit
        </ButtonAsync>
      ),
    });

    await goNext();
    await goNext();

    const btn = await screen.findByTestId('stepper-submit');
    await user.click(btn);
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it('should be go to previous step by click', async () => {
    renderComponent();
    await goNext();
    expect(await getActivePanel()).toHaveTextContent('Panel2');

    await user.click(await screen.findByText('Step1'));
    expect(await getActivePanel()).toHaveTextContent('Panel1');
  });

  it('should not access on next steps on click', async () => {
    renderComponent();
    await user.click(await screen.findByText('Step2'));
    expect(await getActivePanel()).toHaveTextContent('Panel1');
  });

  it('should have custom style', async () => {
    renderComponent();

    const navigation = await screen.findByTestId('stepper-navigation');
    expect(navigation).toHaveStyle({
      '--margin-top-xs': 'var(--spacing-10)',
    });
  });

  it('should work without a title list', async () => {
    render(
      <Stepper>
        <Stepper.PanelList data-testid="stepper-panel-list">
          <Stepper.Panel data-testid="stepper-panel">Panel1</Stepper.Panel>
          <Stepper.Panel data-testid="stepper-panel">Panel2</Stepper.Panel>
          <Stepper.Panel data-testid="stepper-panel">Panel3</Stepper.Panel>
        </Stepper.PanelList>
        <Stepper.Navigation
          next={<Stepper.Next>Next</Stepper.Next>}
          prev={<Stepper.Prev>Prev</Stepper.Prev>}
        />
      </Stepper>,
    );

    expect(await getActivePanel()).toHaveTextContent('Panel1');
    await goNext();
    expect(await getActivePanel()).toHaveTextContent('Panel2');
    await goNext();
    expect(await getActivePanel()).toHaveTextContent('Panel3');
  });

  it('should render navigation with children function', async () => {
    renderComponent({
      navigationChildren: ({ prev, next, submit }) => (
        <div data-testid="custom-navigation-render">
          {prev}
          {next}
          {submit}
        </div>
      ),
    });

    await expectToBeVisibleInTheDocument('custom-navigation-render');
    await expectNotToBeVisibleInTheDocument('stepper-prev');
    await expectToBeVisibleInTheDocument('stepper-next');
    await expectNotToBeVisibleInTheDocument('stepper-submit');
    await goNext();
    await expectToBeVisibleInTheDocument('stepper-prev');
    await expectToBeVisibleInTheDocument('stepper-next');
    await expectNotToBeVisibleInTheDocument('stepper-submit');
    await goNext();
    await expectToBeVisibleInTheDocument('stepper-prev');
    await expectNotToBeVisibleInTheDocument('stepper-next');
    await expectToBeVisibleInTheDocument('stepper-submit');
  });

  it('should call onStepChange', async () => {
    const onStepChange = vi.fn();

    renderComponent({ onStepChange });
    await goNext();
    expect(onStepChange).toHaveBeenNthCalledWith(1, 1);
  });
});
