import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';

import type { SelectProps } from '..';
import Select from '..';
import {
  generateCommonSelectOptions,
  generateSelectOptionsFromArray,
  generateSelectOptionsFromObject,
} from '../utils';

describe('Select', () => {
  const OPTIONS = [
    { label: 'Goldfish', value: 'goldfish' },
    { label: 'Starfish', value: 'starfish' },
    { label: 'Shark', value: 'shark' },
  ];
  const LABEL = 'label';

  const renderComponent = ({
    label = LABEL,
    options = OPTIONS,
    ...props
  }: Partial<SelectProps> = {}) =>
    render(<Select label={label} options={options} {...props} />);

  it('should render value with strings as values', async () => {
    renderComponent({
      value: 'goldfish',
    });

    await expectToBeVisibleInTheDocument('Goldfish', screen.findByText);
  });

  it('should render readonlyMode', async () => {
    renderComponent({ value: 'goldfish', readonlyMode: { enabled: true } });

    await expectToBeVisibleInTheDocument('goldfish', screen.findByText);
  });
});

describe('Select utils', () => {
  describe('generate select options from object', () => {
    const data = { GBOX: 'gbox', GCAP: 'gcap' };

    it('should generate options', () => {
      expect(generateSelectOptionsFromObject(data)).toEqual([
        { label: 'gbox', value: 'GBOX' },
        { label: 'gcap', value: 'GCAP' },
      ]);
    });

    it('should generate empty options', () => {
      expect(generateSelectOptionsFromObject({})).toEqual([]);
    });
  });

  describe('generate select options from array', () => {
    const data = [
      { label: 'red', value: 'RED', hexa: '#red' },
      { label: 'green', value: 'GREEN', hexa: '#green' },
    ];

    it('should generate options', () => {
      expect(
        generateSelectOptionsFromArray(data, {
          labelNormalizer: item => item.label,
          valueNormalizer: item => item.value,
        }),
      ).toEqual([
        { label: 'red', value: 'RED' },
        { label: 'green', value: 'GREEN' },
      ]);
    });

    it('should genereate options with meta', () => {
      expect(
        generateSelectOptionsFromArray(data, {
          labelNormalizer: item => item.label,
          valueNormalizer: item => item.value,
          metaNormalizer: item => ({ color: item.hexa }),
        }),
      ).toEqual([
        { label: 'red', value: 'RED', meta: { color: '#red' } },
        { label: 'green', value: 'GREEN', meta: { color: '#green' } },
      ]);
    });

    it('should generate common select options', () => {
      const data = [
        { name: 'name', id: 'id' },
        { name: 'test', id: 'ok' },
      ];

      expect(generateCommonSelectOptions(data)).toEqual([
        { label: 'name', value: 'id' },
        { label: 'test', value: 'ok' },
      ]);
    });
  });
});
