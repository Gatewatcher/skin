import { range } from '@gatewatcher/bistoury/utils-lang';
import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Finder from '..';
import type { FinderPanelProps } from '../compounds/Panel';
import type { FinderPanelItemProps } from '../compounds/PanelItem';
import type { ItemBase } from '../types';

describe('Finder', () => {
  const user = userEvent.setup();

  describe('Panels', () => {
    it('should have 3 panels', async () => {
      render(
        <Finder.Panels count={3} data-testid="panels" title="Title">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Finder.Panels>,
      );

      await expectToBeVisibleInTheDocument('Title', screen.findByText);

      expect(await screen.findByTestId('grid-container')).toHaveStyle({
        'grid-template-columns': 'repeat(3, 300px)',
      });
    });

    it('should have search bar', async () => {
      render(
        <Finder.Panels
          count={2}
          searchBar={<Finder.SearchBar data-testid="search" />}
        >
          <div>1</div>
          <div>2</div>
        </Finder.Panels>,
      );

      await expectToBeVisibleInTheDocument('search');
    });

    it('should have custom width', async () => {
      render(
        <Finder.Panels count={2} width={800}>
          <div>panel 1</div>
          <div>panel 2</div>
        </Finder.Panels>,
      );

      expect(await screen.findByTestId('grid-container')).toHaveStyle({
        'grid-template-columns': 'repeat(2, 800px)',
      });
    });
  });

  describe('Panel', () => {
    const data: ItemBase[] = range({ stop: 10 }).map(index => ({
      id: index.toString(),
      name: `data n°${index}`,
      test: true,
    }));

    const renderComponent = (
      args: Partial<FinderPanelProps<ItemBase>> = {},
    ) => {
      return render(
        <Finder.Panel
          data={data}
          name={<Finder.PanelName>panel</Finder.PanelName>}
          {...args}
        >
          {item => (
            <div key={item.id} data-testid="item">
              {item.name}
            </div>
          )}
        </Finder.Panel>,
      );
    };

    it('should render', async () => {
      renderComponent();

      await expectToBeVisibleInTheDocument('finder-panel');
      await expectToBeVisibleInTheDocument('panel', screen.findByText);
    });

    it('should have 10 items', async () => {
      renderComponent();
      const items = await screen.findAllByTestId('item');
      expect(items).toHaveLength(10);
    });

    it('should be disabled', async () => {
      renderComponent({
        disabled: true,
        disabledPlaceholder: 'panel disabled',
      });

      await expectToBeVisibleInTheDocument('panel disabled', screen.findByText);
    });
  });

  describe('PanelItem', () => {
    const defaultItem = { id: '0', name: 'panel item 0' };
    const renderComponent = ({
      item = defaultItem,
      hasChildren = true,
      ...args
    }: Partial<FinderPanelItemProps<ItemBase>> = {}) => {
      render(
        <Finder.PanelItem hasChildren={hasChildren} item={item} {...args} />,
      );
    };

    it('should render', async () => {
      renderComponent();

      await expectToBeVisibleInTheDocument('finder-panel-item');
    });

    it('should call onSelect', async () => {
      const onSelect = vi.fn();

      renderComponent({ onSelect });
      await user.click(await screen.findByText(defaultItem.name));
      expect(onSelect).toHaveBeenNthCalledWith(1, defaultItem);
    });

    it('should call onSelect when radio is clicked', async () => {
      const onSelect = vi.fn();

      renderComponent({ onSelect });

      const radio = await screen.findByRole('radio', {
        name: defaultItem.name,
      });
      await user.click(radio);
      expect(onSelect).toHaveBeenNthCalledWith(1, defaultItem);
    });

    it('should call onReset', async () => {
      const onReset = vi.fn();

      renderComponent({ onReset, defaultChecked: true });
      await user.click(await screen.findByText(defaultItem.name));
      expect(onReset).toHaveBeenNthCalledWith(1, defaultItem);
    });

    it('should not call onSelect when disabled', async () => {
      const onSelect = vi.fn();

      renderComponent({ onSelect, disabled: true });
      await user.click(await screen.findByText(defaultItem.name));
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('Resume', () => {
    it('should render 3 items', async () => {
      render(
        <Finder.Resume>
          <Finder.ResumeItem>1</Finder.ResumeItem>
          <Finder.ResumeItem>2</Finder.ResumeItem>
          <Finder.ResumeItem>3</Finder.ResumeItem>
        </Finder.Resume>,
      );

      const items = await screen.findAllByTestId('finder-resume-item');
      expect(items).toHaveLength(3);
    });
  });

  describe('ResumeItem', () => {
    it('should display a custom icon', async () => {
      render(<Finder.ResumeItem icon="Action">1</Finder.ResumeItem>);

      await expectToBeVisibleInTheDocument('icon-Action');
    });

    it('should default to slash icon', async () => {
      render(<Finder.ResumeItem>1</Finder.ResumeItem>);

      await expectToBeVisibleInTheDocument('icon-Slash');
    });
  });
});
