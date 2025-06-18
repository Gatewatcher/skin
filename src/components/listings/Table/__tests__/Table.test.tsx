import { range } from '@gatewatcher/bistoury/utils-lang';
import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
  suffixTestId,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { User } from '@/mocks/types';
import { FloatingActions } from '@/skin/actions';
import { calcOffset } from '@/skin/pagination';
import { renderWithRouter } from '@/tests';

import type { TableColumnsProps, TableProps, TableRowsProps } from '..';
import Table from '..';
import { generateUsers } from '../../Listing/__tests__/utils';
import TableBatchActions from '../compounds/BatchActions';
import TableHeaders from '../compounds/Headers';
import {
  COLUMN_PIN_DROPDOWN_TEST_ID,
  COLUMN_PIN_MENU_TRIGGER_TEST_ID,
  DEFAULT_IS_RESIZABLE,
  DEFAULT_LAYOUT,
} from '../constants';
import { TableContext } from '../contexts';

describe('Table', () => {
  const TEST_ID: TestId = 'table';
  const user = userEvent.setup();

  const contextValue = {
    layout: DEFAULT_LAYOUT,
    tableRef: null,
    columnsResizingData: undefined,
    setColumnsResizingData: () => undefined,
    isResizable: DEFAULT_IS_RESIZABLE,
    pinColumn: () => undefined,
    unpinColumn: () => undefined,
    getPinnedStyles: () => ({}),
    isPinned: () => false,
    isPinnedRight: () => false,
    isPinnedLeft: () => false,
  };

  const renderComponent = ({
    children,
    data,
    headers,
    ...props
  }: Partial<TableRowsProps<User>> = {}) =>
    renderWithRouter(
      <Table
        headers={
          headers || (
            <Table.Headers data-testid="table-headers">
              <Table.HeaderCell
                data-testid="table-header-cell"
                sort={{ id: 'id' }}
              >
                Id
              </Table.HeaderCell>
              <Table.HeaderCell data-testid="table-header-cell">
                Name
              </Table.HeaderCell>
            </Table.Headers>
          )
        }
        data={data || generateUsers(10)}
        data-testid={TEST_ID}
        persistenceKey="table"
        {...props}
      >
        {children ||
          (row => (
            <Table.Row key={row.email} id={row.email}>
              <Table.Cell>
                {row.firstname} {row.lastname}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table>,
    );

  describe('general', () => {
    it('should render', async () => {
      renderComponent();
      await expectToBeVisibleInTheDocument(TEST_ID);
    });

    it('should render listing as table', async () => {
      renderComponent();
      expect((await screen.findByTestId(TEST_ID)).tagName).toBe('TABLE');
    });

    it('should render row', async () => {
      renderComponent();
      expect(
        (await screen.findByTestId(suffixTestId(TEST_ID, 'body'))).tagName,
      ).toBe('TBODY');
    });

    it('should call onClick on row click', async () => {
      const onClick = vi.fn();
      renderComponent({
        children: row => (
          <Table.Row
            key={row.id}
            data-testid="table-row"
            id={row.id}
            onClick={onClick}
          >
            <Table.Cell>{row.firstname}</Table.Cell>
          </Table.Row>
        ),
      });
      const rows = await screen.findAllByTestId('table-row');
      await user.click(rows[0]);

      expect(onClick).toHaveBeenCalled();
    });

    it('should not call onClick on row click if table cell withStopPropagation', async () => {
      const onClick = vi.fn();
      renderComponent({
        children: row => (
          <Table.Row key={row.id} id={row.id} onClick={onClick}>
            <Table.Cell withStopPropagation>{row.firstname}</Table.Cell>
          </Table.Row>
        ),
      });
      const cell = await screen.findAllByTestId('table-cell');
      await user.click(cell[0]);

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call onClick on action click', async () => {
      const onClick = vi.fn();
      const action = vi.fn();

      renderComponent({
        data: generateUsers(1),
        children: row => (
          <Table.Row
            key={row.id}
            data-testid="table-row"
            id={row.id}
            onClick={onClick}
          >
            <Table.Cell>{row.firstname}</Table.Cell>
            <Table.Actions>
              <Table.ActionButton
                data-testid="row-action"
                icon="Add"
                onClick={action}
              >
                action
              </Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await user.click(await screen.findByTestId('row-action'));
      expect(action).toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should have emptyCellFallback', async () => {
      const data = generateUsers(1);

      renderComponent({
        data: [{ ...data[0], firstname: '', age: 0 }],
        emptyCellFallback: 'empty',
        children: user => (
          <Table.Row key={user.id} id={user.id}>
            <Table.Cell data-testid="cell-firstname">
              {user.firstname}
            </Table.Cell>
            <Table.Cell data-testid="cell-age">{user.age}</Table.Cell>
            <Table.Cell data-testid="cell-undefined">{undefined}</Table.Cell>
            <Table.Cell data-testid="cell-null">{null}</Table.Cell>
            <Table.Cell data-testid="cell-false">{false}</Table.Cell>
          </Table.Row>
        ),
      });

      const firstname = await screen.findByTestId('cell-firstname');
      expect(firstname).toHaveTextContent('empty');

      const age = await screen.findByTestId('cell-age');
      expect(age).toHaveTextContent('0');

      const cellUndefined = await screen.findByTestId('cell-undefined');
      expect(cellUndefined).toHaveTextContent('empty');

      const cellNull = await screen.findByTestId('cell-null');
      expect(cellNull).toHaveTextContent('empty');

      const cellFalse = await screen.findByTestId('cell-false');
      expect(cellFalse).toHaveTextContent('empty');
    });

    it('should have fixed layout', async () => {
      renderComponent({ layout: 'fixed' });

      expect(await screen.findByRole('table')).toHaveClass('TableLayoutFixed');
    });

    it('should have min width', async () => {
      renderComponent({ minWidth: 100 });
      expect(await screen.findByRole('table')).toHaveStyle({
        'min-width': '100px',
      });
    });
  });

  describe('Headers', () => {
    it('should render', async () => {
      renderComponent();
      await expectToBeVisibleInTheDocument('table-headers');
    });

    it('should have two headers', async () => {
      renderComponent();
      const headers = await screen.findAllByTestId('table-header-cell');
      expect(headers).toHaveLength(2);
      expect(headers[0].textContent).toBe('Id');
    });

    it('should have sticky headers', async () => {
      renderComponent({
        headers: (
          <Table.Headers data-testid="table-headers" withStickyPosition={true}>
            <Table.HeaderCell>cell</Table.HeaderCell>
          </Table.Headers>
        ),
      });
      expect(await screen.findByTestId('table-headers')).toHaveClass(
        'HeadersSticky',
      );
    });

    it('should render header cell', async () => {
      renderComponent({ data: generateUsers(2) });
      await expectToBeVisibleInTheDocument('icon-ChevronUp');
      await expectToBeVisibleInTheDocument('icon-ChevronDown');
    });

    it('should have header select cell disabled on loading', async () => {
      renderComponent({
        data: generateUsers(10),
        isLoading: true,
        headers: (
          <Table.Headers>
            <Table.HeaderSelectCell data-testid="select-all" />
          </Table.Headers>
        ),
      });

      const input = await within(
        await screen.findByTestId('select-all'),
      ).findByLabelText('');

      expect(input).toBeDisabled();
    });

    it('should have noWrap', async () => {
      renderComponent({
        data: generateUsers(10),
        headers: (
          <Table.Headers>
            <Table.HeaderCell data-testid="header-cell" noWrap>
              header cell
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      const cell = await screen.findByTestId('header-cell');
      expect(cell).toHaveClass('HeaderCellNoWrap');
    });

    it('should have default noWrap if layout auto', async () => {
      renderComponent({
        data: generateUsers(10),
        headers: (
          <Table.Headers>
            <Table.HeaderCell data-testid="header-cell">
              header cell
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      const cell = await screen.findByTestId('header-cell');
      expect(cell).toHaveClass('HeaderCellNoWrap');
    });

    it('should have explicitly noWrap', async () => {
      renderComponent({
        data: generateUsers(10),
        layout: 'fixed',
        headers: (
          <Table.Headers>
            <Table.HeaderCell data-testid="header-cell" noWrap>
              header cell
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      const cell = await screen.findByTestId('header-cell');
      expect(cell).toHaveClass('HeaderCellNoWrap');
    });
  });

  describe('Row', () => {
    it('should call onClick', async () => {
      const onClick = vi.fn();
      render(
        <TableContext.Provider value={contextValue}>
          <Table.Row id={0} onClick={onClick}>
            <Table.Cell>content</Table.Cell>
          </Table.Row>
          ,
        </TableContext.Provider>,
      );
      const row = screen.getByTestId('table-row');
      await user.click(row);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should apply the clickable class', async () => {
      render(
        <TableContext.Provider value={contextValue}>
          <Table.Row id={1} onClick={() => {}}>
            <Table.Cell>content</Table.Cell>
          </Table.Row>
          ,
        </TableContext.Provider>,
      );
      const row = await screen.findByTestId('table-row');
      expect(row).toHaveClass('RowClickable');
    });
  });

  describe('Cell', () => {
    const data: User[] = [
      {
        id: 1,
        firstname: 'john',
        lastname: 'doe',
        email: 'a@a.com',
        age: 10,
        avatar: 'avatar.png',
      },
    ];

    it('should have content', async () => {
      renderComponent({ data });
      await expectToBeVisibleInTheDocument('john doe', screen.findByText);
    });

    it('should have maxWidth', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell data-testid="table-cell" maxWidth={200}>
              {row.firstname}
            </Table.Cell>
          </Table.Row>
        ),
      });

      expect(await screen.findByTestId('table-cell')).toHaveStyle({
        'max-width': '200px',
      });
    });

    it('should have minWidth', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell data-testid="table-cell" minWidth={200}>
              {row.firstname}
            </Table.Cell>
          </Table.Row>
        ),
      });

      expect(await screen.findByTestId('table-cell')).toHaveStyle({
        'min-width': '200px',
      });
    });

    it('should fit', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell data-testid="table-cell" fit>
              {row.firstname}
            </Table.Cell>
          </Table.Row>
        ),
      });
      expect(await screen.findByTestId('table-cell')).toHaveClass('CellFit');
    });

    it('should render with muted class', async () => {
      render(
        <TableContext.Provider value={contextValue}>
          <Table.Cell isMuted>Content</Table.Cell>
        </TableContext.Provider>,
      );

      const cell = screen.getByTestId('table-cell');

      expect(cell).toHaveClass('CellMuted');
    });

    it('should have actions', async () => {
      const onClick = vi.fn();

      render(
        <TableContext.Provider value={contextValue}>
          <Table.Cell
            actions={
              <FloatingActions.Content>
                <FloatingActions.Actions data-testid="actions">
                  <FloatingActions.Button
                    data-testid="action"
                    icon="Add"
                    onClick={onClick}
                  />
                </FloatingActions.Actions>
              </FloatingActions.Content>
            }
          >
            Content
          </Table.Cell>
          ,
        </TableContext.Provider>,
      );

      await user.click(await screen.findByTestId('floating-actions-trigger'));

      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('actions');
        const button = await within(
          await screen.findByTestId('actions'),
        ).findByRole('button');
        await user.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Actions', () => {
    const data: User[] = [
      {
        id: 1,
        firstname: 'john',
        lastname: 'doe',
        email: 'a@a.com',
        avatar: 'avatar.png',
        age: 10,
      },
    ];

    const openDropdown = async () => {
      const trigger = await screen.findByTestId(
        'table-actions-dropdown-trigger',
      );
      await user.click(trigger);
    };

    it('should have action cell', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions>
              <Table.ActionButton icon="Add">Add</Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await expectToBeVisibleInTheDocument('icon-Add');
      await expectNotToBeVisibleInTheDocument('Add', screen.queryByText);
    });

    it('should force dropdown with one action', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions asDropdown>
              <Table.ActionButton data-testid="add" icon="Add">
                Add
              </Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await expectToBeVisibleInTheDocument('table-actions-dropdown-trigger');
    });

    it('should have tooltip if only one action', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions>
              <Table.ActionButton data-testid="add" icon="Add">
                Add
              </Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await user.click(await screen.findByTestId('floating-trigger'));

      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('Add', screen.findByText);
      });
    });

    it('should call action on button click', async () => {
      const action = vi.fn();

      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions>
              <Table.ActionButton data-testid="add" icon="Add" onClick={action}>
                Add
              </Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      const elm = await screen.findByTestId('add');
      await user.click(elm);

      expect(action).toHaveBeenCalledTimes(1);
    });

    it('should not call row on click on table actions', async () => {
      const onClick = vi.fn();
      const action = vi.fn();

      renderComponent({
        data: generateUsers(1),
        children: row => (
          <Table.Row
            key={row.id}
            data-testid="table-row"
            id={row.id}
            onClick={onClick}
          >
            <Table.Cell>{row.firstname}</Table.Cell>
            <Table.Actions data-testid="actions">
              <Table.ActionButton icon="Add" onClick={action}>
                action
              </Table.ActionButton>
              <Table.ActionButton icon="Add" onClick={action}>
                action
              </Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      const actionsTrigger = await within(
        await screen.findByTestId('actions'),
      ).findByTestId('actions-dropdown-trigger');

      await user.click(actionsTrigger);
      await expect(onClick).not.toHaveBeenCalled();
    });

    it('should have dropdown if multiple actions', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions>
              <Table.ActionButton icon="Add" onClick={() => {}}>
                Add
              </Table.ActionButton>
              <Table.ActionButton icon="Edit" onClick={() => {}}>
                Edit
              </Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await expectToBeVisibleInTheDocument('table-actions-dropdown-trigger');
      await openDropdown();
      await expectToBeVisibleInTheDocument('table-actions-dropdown-content');
    });

    it('should have icon and labels in dropdown', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions>
              <Table.ActionButton
                data-testid="table-action-cell"
                icon="Add"
                onClick={() => {}}
              >
                Add
              </Table.ActionButton>
              <Table.ActionButton
                data-testid="table-action-cell"
                icon="Edit"
                onClick={() => {}}
              >
                Edit
              </Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await openDropdown();
      const actions = await screen.findAllByTestId('table-action-cell');
      expect(actions).toHaveLength(2);
      await expectToBeVisibleInTheDocument('Add', screen.findByText);
      await expectToBeVisibleInTheDocument('Edit', screen.findByText);
    });

    it('should call action and close dropdown on click', async () => {
      const action = vi.fn();

      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions>
              <Table.ActionButton icon="Add" onClick={action}>
                Add
              </Table.ActionButton>
              <Table.ActionButton icon="Edit" onClick={action}>
                Edit
              </Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await openDropdown();
      const actionCell = await screen.findByText('Add');
      await user.click(actionCell);

      expect(action).toHaveBeenCalledTimes(1);
      await waitFor(async () => {
        await expectNotToBeVisibleInTheDocument('floating-content');
      });
    });

    it('should render link action cell in short version', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions>
              <Table.ActionLink
                data-testid="cell-action"
                to="https://www.google.com"
              >
                Link
              </Table.ActionLink>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await expectToBeVisibleInTheDocument('icon-Link');
    });

    it('should render link action cell in full version', async () => {
      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions>
              <Table.ActionButton icon="Add">test</Table.ActionButton>
              <Table.ActionLink
                data-testid="cell-action"
                to="https://www.google.com"
              >
                Link
              </Table.ActionLink>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await openDropdown();
      await expectToBeVisibleInTheDocument('icon-Link');
      await expectToBeVisibleInTheDocument('Link', screen.findByText);
    });

    it('should call onOpen and onClose', async () => {
      const onOpen = vi.fn();
      const onClose = vi.fn();

      renderComponent({
        data,
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Actions onClose={onClose} onOpen={onOpen}>
              <Table.ActionButton icon="Add">test</Table.ActionButton>
              <Table.ActionButton icon="Add">action 2</Table.ActionButton>
            </Table.Actions>
          </Table.Row>
        ),
      });

      await openDropdown();
      expect(onOpen).toHaveBeenCalledTimes(1);
      const action = await screen.findByText('test');
      await user.click(action);
      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ActionCell', () => {
    it('should forward disabled to the button', async () => {
      const action = vi.fn();
      render(
        <Table.ActionButton icon="CircleCheck" onClick={action} disabled>
          Action
        </Table.ActionButton>,
      );

      const actionCell = screen.getByTestId('table-action-button');
      await user.click(actionCell);

      expect(actionCell).toHaveAttribute('disabled');
      expect(action).not.toHaveBeenCalled();
    });
  });

  describe('Header sort', () => {
    it('should call onSort on header cell click', async () => {
      const onSort = vi.fn();
      renderComponent({ data: generateUsers(2), onSort });
      const cells = await screen.findAllByTestId('table-header-cell-sortable');
      await user.click(cells[0]);

      expect(onSort).toHaveBeenCalledWith([{ id: 'id', order: 'asc' }]);
    });

    it('should call onSort on header cell click - desc', async () => {
      const onSort = vi.fn();
      renderComponent({
        data: generateUsers(2),
        initialSort: [{ id: 'id', order: 'desc' }],
        onSort,
        headers: (
          <Table.Headers>
            <Table.HeaderCell
              data-testid="table-header-cell"
              sort={{ id: 'id', initialOrder: 'desc' }}
            >
              ID
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      const cell = await screen.findByTestId('table-header-cell-sortable');
      await user.click(cell);
      expect(onSort).toHaveBeenCalledWith([{ id: 'id', order: 'asc' }]);
    });

    it('should call onSort on header cell click - asc > desc > reset > asc', async () => {
      const onSort = vi.fn();
      renderComponent({
        data: generateUsers(2),
        onSort,
        headers: (
          <Table.Headers>
            <Table.HeaderCell
              data-testid="table-header-cell"
              sort={{ id: 'id' }}
            >
              ID
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });
      const cell = await screen.findByTestId('table-header-cell-sortable');

      await user.click(cell);
      expect(onSort).toHaveBeenNthCalledWith(1, [{ id: 'id', order: 'asc' }]);

      await user.click(cell);
      expect(onSort).toHaveBeenNthCalledWith(2, [{ id: 'id', order: 'desc' }]);

      await user.click(cell);
      expect(onSort).toHaveBeenNthCalledWith(3, []);

      await user.click(cell);
      expect(onSort).toHaveBeenNthCalledWith(4, [{ id: 'id', order: 'asc' }]);
    });

    it('should call onParamsChange onSort', async () => {
      const onParamsChange = vi.fn();
      const onSort = vi.fn();
      renderComponent({
        data: generateUsers(2),
        onParamsChange,
        onSort,
        headers: (
          <Table.Headers>
            <Table.HeaderCell
              data-testid="table-header-cell"
              sort={{ id: 'id' }}
            >
              ID
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      const cell = await screen.findByTestId('table-header-cell-sortable');

      await user.click(cell);
      expect(onSort).toHaveBeenNthCalledWith(1, [{ id: 'id', order: 'asc' }]);

      expect(onParamsChange).toHaveBeenNthCalledWith(1, {
        offset: calcOffset({ page: 1, perPage: 25 }),
        page: 1,
        perPage: 25,
        type: 'pagination',
        sort: [{ id: 'id', order: 'asc' }],
      });
    });

    it('should sort with multiple items', async () => {
      const onParamsChange = vi.fn();
      const onSort = vi.fn();

      renderComponent({
        data: generateUsers(2),
        onParamsChange,
        onSort,
        headers: (
          <Table.Headers isMultipleSorting>
            <Table.HeaderCell data-testid="header-id" sort={{ id: 'id' }}>
              ID
            </Table.HeaderCell>
            <Table.HeaderCell data-testid="header-age" sort={{ id: 'age' }}>
              Age
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      const cellId = await screen.findByTestId('header-id-sortable');
      const ageId = await screen.findByTestId('header-age-sortable');
      await user.click(cellId);

      expect(onSort).toHaveBeenNthCalledWith(1, [{ id: 'id', order: 'asc' }]);
      expect(onParamsChange).toHaveBeenNthCalledWith(1, {
        offset: calcOffset({ page: 1, perPage: 25 }),
        page: 1,
        perPage: 25,
        type: 'pagination',
        sort: [{ id: 'id', order: 'asc' }],
      });

      await user.click(ageId);
      expect(onSort).toHaveBeenNthCalledWith(2, [
        { id: 'id', order: 'asc' },
        { id: 'age', order: 'asc' },
      ]);
      expect(onParamsChange).toHaveBeenNthCalledWith(2, {
        offset: calcOffset({ page: 1, perPage: 25 }),
        page: 1,
        perPage: 25,
        type: 'pagination',
        sort: [
          { id: 'id', order: 'asc' },
          { id: 'age', order: 'asc' },
        ],
      });

      await user.click(cellId);
      expect(onSort).toHaveBeenNthCalledWith(3, [
        { id: 'age', order: 'asc' },
        { id: 'id', order: 'desc' },
      ]);

      await user.click(cellId);
      expect(onSort).toHaveBeenNthCalledWith(4, [{ id: 'age', order: 'asc' }]);
    });

    it('should sort with multiple items and priority', async () => {
      const onParamsChange = vi.fn();
      const onSort = vi.fn();

      renderComponent({
        data: generateUsers(2),
        onParamsChange,
        onSort,
        headers: (
          <Table.Headers isMultipleSorting>
            <Table.HeaderCell
              data-testid="header-id"
              sort={{ id: 'id', priority: 2 }}
            >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell
              data-testid="header-age"
              sort={{ id: 'age', priority: 1 }}
            >
              Age
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      const cellId = await screen.findByTestId('header-id-sortable');
      const ageId = await screen.findByTestId('header-age-sortable');
      await user.click(cellId);

      expect(onSort).toHaveBeenNthCalledWith(1, [
        { id: 'id', order: 'asc', priority: 2 },
      ]);
      expect(onParamsChange).toHaveBeenNthCalledWith(1, {
        offset: calcOffset({ page: 1, perPage: 25 }),
        page: 1,
        perPage: 25,
        type: 'pagination',
        sort: [{ id: 'id', order: 'asc', priority: 2 }],
      });

      await user.click(ageId);
      expect(onSort).toHaveBeenNthCalledWith(2, [
        { id: 'age', order: 'asc', priority: 1 },
        { id: 'id', order: 'asc', priority: 2 },
      ]);
      expect(onParamsChange).toHaveBeenNthCalledWith(2, {
        offset: calcOffset({ page: 1, perPage: 25 }),
        page: 1,
        perPage: 25,
        type: 'pagination',
        sort: [
          { id: 'age', order: 'asc', priority: 1 },
          { id: 'id', order: 'asc', priority: 2 },
        ],
      });

      await user.click(cellId);
      expect(onSort).toHaveBeenNthCalledWith(3, [
        { id: 'age', order: 'asc', priority: 1 },
        { id: 'id', order: 'desc', priority: 2 },
      ]);

      await user.click(cellId);
      expect(onSort).toHaveBeenNthCalledWith(4, [
        { id: 'age', order: 'asc', priority: 1 },
      ]);
    });

    it('should init header cell sort with table initial sort', async () => {
      const onReady = vi.fn();

      renderComponent({
        initialSort: [{ id: 'id', order: 'desc' }],
        onReady,
        headers: (
          <Table.Headers isMultipleSorting>
            <Table.HeaderCell
              data-testid="table-header-cell"
              sort={{ id: 'id' }}
            >
              ID
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      await expectToBeVisibleInTheDocument('table-header-cell-id-desc');
    });

    it('should init header cell multiple sort with table initial sort', async () => {
      const onReady = vi.fn();

      renderComponent({
        initialSort: [
          { id: 'id', order: 'desc' },
          { id: 'age', order: 'asc' },
        ],
        onReady,
        headers: (
          <Table.Headers>
            <Table.HeaderCell
              data-testid="table-header-cell"
              sort={{ id: 'id' }}
            >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell
              data-testid="table-header-cell"
              sort={{ id: 'age' }}
            >
              Age
            </Table.HeaderCell>
          </Table.Headers>
        ),
      });

      await expectToBeVisibleInTheDocument('table-header-cell-id-desc');
      await expectToBeVisibleInTheDocument('table-header-cell-age-asc');
    });
  });

  describe('Batch selection', () => {
    const renderComponentWithBatchSelection = (
      props: Partial<TableProps<User>> = {},
    ) =>
      renderComponent({
        data: generateUsers(20),
        totalItemsCount: 20,
        headers: (
          <TableHeaders>
            <Table.HeaderSelectCell data-testid="table-header-select" />
            <Table.HeaderCell>firstname</Table.HeaderCell>
          </TableHeaders>
        ),
        children: row => (
          <Table.Row key={row.email} id={row.email}>
            <Table.SelectCell data-testid="table-row-select" id={row.id} />
            <Table.Cell>{row.firstname}</Table.Cell>
          </Table.Row>
        ),
        ...props,
      });

    const selectAll = async () => {
      await user.click(await screen.findByText(/select the 20 rows/i));
    };

    const clearAll = async () => {
      await user.click(await screen.findByText(/clear all/i));
    };

    const selectPage = async () => {
      const selectPageCheckbox = await within(
        await screen.findByTestId('table-header-select'),
      ).findByTestId('checkbox');

      await user.click(selectPageCheckbox);
    };

    it('should render select cell on row', async () => {
      renderComponentWithBatchSelection();

      const selectCells = await screen.findAllByTestId('table-row-select');
      expect(selectCells).toHaveLength(20);
    });

    it('should render select cell on headers', async () => {
      renderComponentWithBatchSelection();
      await expectToBeVisibleInTheDocument('table-header-select');
    });

    it('should call onBatchSelect on row select', async () => {
      const onBatchSelect = vi.fn();
      renderComponentWithBatchSelection({
        onBatchSelect,
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      expect(onBatchSelect).toHaveBeenNthCalledWith(1, {
        hasSelection: true,
        selectedIds: ['4'],
        itemsCount: 1,
        unselectedIds: [],
        allSelected: false,
      });
    });

    it('should have intermediate state on headers if selection incomplete', async () => {
      const onBatchSelect = vi.fn();
      renderComponentWithBatchSelection({
        onBatchSelect,
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      const headerSelectCell = await within(
        await screen.findByTestId('table-header-select'),
      ).findByTestId('checkbox');

      expect(headerSelectCell).toHaveClass('CheckboxIndeterminate');
    });

    it('should call onBatchSelect on headers select all', async () => {
      const onBatchSelect = vi.fn();
      renderComponentWithBatchSelection({
        onBatchSelect,
      });
      const headerSelectCell = await within(
        await screen.findByTestId('table-header-select'),
      ).findByLabelText('');

      await user.click(headerSelectCell);

      expect(onBatchSelect).toHaveBeenNthCalledWith(1, {
        hasSelection: true,
        itemsCount: 20,
        selectedIds: range({ stop: 20 }).map(String),
        unselectedIds: [],
        allSelected: false,
      });
    });

    it('should call onBatchSelect on heeaders remove all (current page)', async () => {
      const onBatchSelect = vi.fn();
      renderComponentWithBatchSelection({
        onBatchSelect,
      });
      const headerSelectCell = await within(
        await screen.findByTestId('table-header-select'),
      ).findByLabelText('');

      await user.click(headerSelectCell);

      expect(onBatchSelect).toHaveBeenCalledWith({
        hasSelection: true,
        itemsCount: 20,
        selectedIds: range({ stop: 20 }).map(String),
        unselectedIds: [],
        allSelected: false,
      });

      await user.click(headerSelectCell);

      expect(onBatchSelect).toHaveBeenCalledWith({
        hasSelection: false,
        itemsCount: 0,
        selectedIds: [],
        unselectedIds: [],
        allSelected: false,
      });
    });

    it('should have batch actions selector', async () => {
      renderComponentWithBatchSelection({
        batch: {
          actions: () => [],
          'data-testid': 'batch-actions',
        },
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('batch-actions');
        expect(
          await within(await screen.findByTestId('batch-actions')).findByTestId(
            'count',
          ),
        ).toHaveTextContent('1');
      });
    });

    it('should select all', async () => {
      const onBatchSelect = vi.fn();

      renderComponentWithBatchSelection({
        onBatchSelect,
        batch: {
          actions: () => [],
          'data-testid': 'batch-actions',
        },
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('batch-actions');
        await selectAll();
        expect(await screen.findByTestId('count')).toHaveTextContent('20');

        expect(onBatchSelect).toHaveBeenCalledWith({
          allSelected: true,
          hasSelection: true,
          itemsCount: 20,
          selectedIds: [],
          unselectedIds: [],
        });
      });
    });

    it('should clear all', async () => {
      const onBatchSelect = vi.fn();

      renderComponentWithBatchSelection({
        onBatchSelect,
        batch: {
          actions: () => [],
          'data-testid': 'batch-actions',
        },
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('batch-actions');
        await clearAll();

        expect(onBatchSelect).toHaveBeenCalledWith({
          allSelected: false,
          hasSelection: false,
          itemsCount: 0,
          selectedIds: [],
          unselectedIds: [],
        });
      });

      await waitFor(async () => {
        await expectNotToBeVisibleInTheDocument('batch-actions');
      });
    });

    it('should add on unselectedIds', async () => {
      const onBatchSelect = vi.fn();

      renderComponentWithBatchSelection({
        onBatchSelect,
        batch: {
          actions: () => [],
          'data-testid': 'batch-actions',
        },
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('batch-actions');
        await selectAll();
        expect(onBatchSelect).toHaveBeenNthCalledWith(2, {
          allSelected: true,
          hasSelection: true,
          itemsCount: 20,
          selectedIds: [],
          unselectedIds: [],
        });
        const input3 = await within(cells[3]).findByLabelText('');
        await user.click(input3);

        expect(onBatchSelect).toHaveBeenNthCalledWith(3, {
          allSelected: true,
          hasSelection: true,
          itemsCount: 19,
          selectedIds: [],
          unselectedIds: ['3'],
        });
      });
    });

    it('should call actions', async () => {
      const onClick = vi.fn();

      renderComponentWithBatchSelection({
        batch: {
          actions: () => (
            <TableBatchActions.Actions>
              <TableBatchActions.Action onClick={onClick} startIcon="Action">
                Action 1
              </TableBatchActions.Action>
            </TableBatchActions.Actions>
          ),
          'data-testid': 'batch-actions',
        },
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      await user.click(await screen.findByText('Action 1'));
      expect(onClick).toHaveBeenCalled();
    });

    it('should open batch selector after 3 selected', async () => {
      renderComponentWithBatchSelection({
        batch: {
          actions: () => [],
          min: 3,
          'data-testid': 'batch-actions',
        },
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      await expectNotToBeVisibleInTheDocument('batch-actions');
      await user.click(await within(cells[5]).findByLabelText(''));
      await user.click(await within(cells[6]).findByLabelText(''));

      await waitFor(async () => {
        await expectToBeVisibleInTheDocument('batch-actions');
      });
    });

    it('should have good itemsCount', async () => {
      const onBatchSelect = vi.fn();

      renderComponentWithBatchSelection({
        onBatchSelect,
        batch: {
          actions: () => [],
          'data-testid': 'batch-actions',
        },
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[0]).findByLabelText('');

      await selectPage();
      expect(onBatchSelect).toHaveBeenNthCalledWith(1, {
        allSelected: false,
        hasSelection: true,
        itemsCount: 20,
        selectedIds: range({ stop: 20 }).map(String),
        unselectedIds: [],
      });
      await user.click(input);
      expect(onBatchSelect).toHaveBeenNthCalledWith(2, {
        allSelected: false,
        hasSelection: true,
        itemsCount: 19,
        selectedIds: range({ start: 1, stop: 20 }).map(String),
        unselectedIds: [],
      });
      await selectPage();
      expect(onBatchSelect).toHaveBeenNthCalledWith(3, {
        allSelected: false,
        hasSelection: true,
        itemsCount: 20,
        selectedIds: [...range({ start: 1, stop: 20 }).map(String), '0'],
        unselectedIds: [],
      });
    });

    it('should not clear on action click', async () => {
      const onClick = vi.fn();

      renderComponentWithBatchSelection({
        batch: {
          actions: () => (
            <TableBatchActions.Actions>
              <TableBatchActions.Action
                onClick={onClick}
                startIcon="Action"
                withResetOnClick={false}
              >
                Action 1
              </TableBatchActions.Action>
            </TableBatchActions.Actions>
          ),
          'data-testid': 'batch-actions',
        },
      });

      const cells = await screen.findAllByTestId('table-row-select');
      const input = await within(cells[4]).findByLabelText('');

      await user.click(input);

      await expectToBeVisibleInTheDocument('batch-actions');

      await user.click(await screen.findByText('Action 1'));
      expect(onClick).toHaveBeenCalledTimes(1);

      await expectToBeVisibleInTheDocument('batch-actions');
    });
  });

  describe('Columns', () => {
    const john: User = {
      age: 10,
      avatar: '',
      email: 'john@doe.com',
      firstname: 'John',
      lastname: 'Doe',
      id: 0,
    };

    const renderComponentWithColumns = ({
      data,
      columns,
      ...rest
    }: Partial<TableColumnsProps<User>> = {}) => {
      const col = columns || [
        { key: 'id', header: 'Id' },
        { key: 'firstname', header: 'Firstname' },
      ];

      return renderWithRouter(
        <Table
          columns={col}
          data={data || generateUsers(10)}
          persistenceKey="table"
          {...rest}
        />,
      );
    };

    it('should have columns and headers', async () => {
      renderComponentWithColumns({
        data: [john],
      });

      await expectToBeVisibleInTheDocument('Firstname', screen.findByText);
      await expectToBeVisibleInTheDocument('Id', screen.findByText);

      await expectToBeVisibleInTheDocument('John', screen.findByText);
    });

    it('should render column and header', async () => {
      renderComponentWithColumns({
        data: [john],
        columns: [
          {
            key: 'id',
            header: () => (
              <Table.HeaderCell key="header" data-testid="id-header">
                Id
              </Table.HeaderCell>
            ),
          },
          {
            key: 'username',
            render: item => `${item.firstname} ${item.lastname}`,
          },
        ],
      });

      await expectToBeVisibleInTheDocument('id-header');
      await expectToBeVisibleInTheDocument('John Doe', screen.findByText);
    });

    it('should hide column', async () => {
      renderComponentWithColumns({
        data: [john],
        columns: [{ key: 'id' }, { key: 'firstname', hidden: true }],
      });

      await expectToBeVisibleInTheDocument('0', screen.findByText);
      await expectNotToBeVisibleInTheDocument('John', screen.queryByText);
    });

    it('should have on row click', async () => {
      const onRowClick = vi.fn();

      renderComponentWithColumns({
        data: [john],
        columns: [{ key: 'id' }, { key: 'firstname' }],
        onRowClick,
      });

      await user.click(await screen.findByText('John'));
      expect(onRowClick).toHaveBeenNthCalledWith(1, john);
    });

    const renderComponentWithPinning = () => {
      return renderWithRouter(
        <Table
          columns={[
            {
              key: 'id',
              header: () => (
                <Table.HeaderCell
                  settings={{
                    columnKey: 'id',
                    columnPinConfig: {
                      isPinned: true,
                      direction: 'left',
                    },
                  }}
                >
                  Id
                </Table.HeaderCell>
              ),
              render: user => <Table.Cell columnKey="id">{user.id}</Table.Cell>,
            },
            {
              key: 'firstname',
              header: () => (
                <Table.HeaderCell
                  settings={{
                    columnKey: 'firstname',
                    columnPinConfig: {
                      direction: 'left',
                      userCanPin: true,
                    },
                  }}
                >
                  First name
                </Table.HeaderCell>
              ),
              render: user => (
                <Table.Cell columnKey="firstname" maxWidth={300}>
                  {user.firstname}
                </Table.Cell>
              ),
            },
            {
              key: 'lastname',
              header: () => (
                <Table.HeaderCell
                  settings={{
                    columnKey: 'lastname',
                    columnPinConfig: {
                      direction: 'right',
                      userCanPin: true,
                    },
                  }}
                >
                  Last name
                </Table.HeaderCell>
              ),
              render: user => (
                <Table.Cell columnKey="lastname">{user.lastname}</Table.Cell>
              ),
            },
          ]}
          data={generateUsers(10)}
        ></Table>,
      );
    };

    it('should render column pin menu trigger for firstname column', async () => {
      renderComponentWithPinning();
      await expectToBeVisibleInTheDocument(
        suffixTestId(COLUMN_PIN_MENU_TRIGGER_TEST_ID, 'firstname'),
      );
    });

    it('should not render column pin menu trigger for id column', async () => {
      renderComponentWithPinning();
      await expectNotToBeVisibleInTheDocument(
        suffixTestId(COLUMN_PIN_MENU_TRIGGER_TEST_ID, 'id'),
      );
    });

    it('should render column pin menu', async () => {
      renderComponentWithPinning();
      const columnPinMenuTrigger = await screen.findAllByTestId(
        suffixTestId(COLUMN_PIN_MENU_TRIGGER_TEST_ID, 'firstname'),
      );
      await user.click(columnPinMenuTrigger[0]);
      await expectToBeVisibleInTheDocument(
        suffixTestId(COLUMN_PIN_DROPDOWN_TEST_ID, 'firstname'),
      );
      await expectNotToBeVisibleInTheDocument(
        suffixTestId(COLUMN_PIN_DROPDOWN_TEST_ID, 'id'),
      );
    });

    it('should not render column pin menu', async () => {
      renderComponentWithPinning();
      const columnPinMenuTrigger = await screen.findAllByTestId(
        suffixTestId(COLUMN_PIN_MENU_TRIGGER_TEST_ID, 'firstname'),
      );
      await user.click(columnPinMenuTrigger[0]);
      await expectNotToBeVisibleInTheDocument(
        suffixTestId(COLUMN_PIN_DROPDOWN_TEST_ID, 'id'),
      );
    });
  });
});
