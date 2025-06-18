import {
  expectNotToBeVisibleInTheDocument,
  expectToBeVisibleInTheDocument,
} from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import { act } from 'react';

import type { JsonViewerProps } from '..';
import JsonViewer from '..';

describe('JsonViewer', () => {
  const TEST_ID: TestId = 'json-viewer';
  const DATA = {
    level1: {
      key: 'value',
      level2: {
        label: 'level 2',
        level3: {
          leaf: 'leaf_value',
        },
      },
    },
    link: 'https://www.google.com',
    number: 1,
    string: 'string',
    z: 'last',
    boolean: false,
    arrayOfStrings: ['lorem', 'ipsum'],
    arrayOfNumbers: [1, 2],
    arrayOfObjects: [
      { label: 'label 1', value: 'value 1' },
      { label: 'label 2', value: 'value 2' },
    ],
    nullable: null,
  };

  const renderComponent = async ({
    data = DATA,
    ...props
  }: Partial<JsonViewerProps> = {}) =>
    render(<JsonViewer data={data} data-testid={TEST_ID} {...props} />);

  const getDraggableByText = (text: string | RegExp) => {
    const element = screen.getByText(text).closest('[data-testid="draggable"]');

    return {
      expectDraggingDataToBe: (data: string) => {
        expect(element).toHaveAttribute('data-dragData', data);
      },
    };
  };

  it('should render', async () => {
    await act(async () => {
      renderComponent();
    });
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should render json', async () => {
    await act(async () => {
      renderComponent({
        defaultExpandedDepth: 5,
      });
    });

    await expectToBeVisibleInTheDocument('leaf:', screen.findByText);
    await expectToBeVisibleInTheDocument('leaf_value', screen.findByText);
    await expectToBeVisibleInTheDocument('boolean:', screen.findByText);
    await expectToBeVisibleInTheDocument('false', screen.findByText);
    await expectToBeVisibleInTheDocument('null', screen.findByText);
  });

  it('should render count', async () => {
    await act(async () => {
      renderComponent({
        defaultExpandedDepth: 5,
      });
    });

    const firstNode = (await screen.findAllByTestId('json-viewer-node')).at(0);
    expect(firstNode?.childNodes).toHaveLength(3);
    expect(firstNode?.lastElementChild).toHaveTextContent('{} 2 items');
  });

  it('should render with defaultExpandedDepth', async () => {
    await act(async () => {
      renderComponent({ defaultExpandedDepth: 1 });
    });

    await expectToBeVisibleInTheDocument(/level1/, screen.findByText);
    await expectToBeVisibleInTheDocument('boolean:', screen.findByText);
    await expectNotToBeVisibleInTheDocument('leaf_value', screen.queryByText);
  });

  it('should sort keys', async () => {
    await act(async () => {
      renderComponent({
        sort: (a, b) => b.localeCompare(a),
      });
    });

    const firstLeaf = (await screen.findAllByTestId('json-viewer-leaf')).at(0);
    expect(firstLeaf?.childNodes[1]).toHaveTextContent('z');
    expect(firstLeaf?.lastElementChild).toHaveTextContent('last');
  });

  it('should render link', async () => {
    await act(async () => {
      renderComponent();
    });

    await expectToBeVisibleInTheDocument('link-external');
  });

  it('should not display items with empty array', async () => {
    await act(async () => {
      renderComponent({
        data: {
          emptyArray: [],
        },
      });
    });

    await expectToBeVisibleInTheDocument('emptyArray:', screen.findByText);
    await expectNotToBeVisibleInTheDocument('1 item', screen.queryByText);
  });

  it('should have JMESPath data', async () => {
    await act(async () => {
      renderComponent({
        data: {
          scalar: '',
          array: [{ id: '' }],
          object: { prop: { subProp: '' } },
        },
        defaultExpandedDepth: 3,
        withJmesPathDragging: true,
      });
    });

    getDraggableByText(/scalar/).expectDraggingDataToBe('{{ scalar }}');
    getDraggableByText(/array/).expectDraggingDataToBe('{{ array[] }}');
    getDraggableByText(/0/).expectDraggingDataToBe('{{ array[0] }}');
    getDraggableByText(/id/).expectDraggingDataToBe('{{ array[].id }}');
    getDraggableByText(/object/).expectDraggingDataToBe('{{ object }}');
    getDraggableByText(/prop/).expectDraggingDataToBe('{{ object.prop }}');
    getDraggableByText(/subProp/).expectDraggingDataToBe(
      '{{ object.prop.subProp }}',
    );
  });
});
