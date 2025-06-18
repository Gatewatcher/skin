import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { SelectOption } from '../..';
import { Form, Input } from '../..';

describe('Form with selects', () => {
  const cities: SelectOption[] = [
    { label: 'Paris', value: 'paris' },
    { label: 'Madrid', value: 'madrid' },
    { label: 'London', value: 'london' },
  ];

  const user = userEvent.setup();

  const submit = async () => {
    await user.click(await screen.findByText('submit'));
  };

  const getSelect = async (label = 'city') =>
    await screen.findByRole('combobox', { name: label });

  it('should render and submit single value without option', async () => {
    const onSubmit = vi.fn();

    render(
      <Form initialValues={{ city: 'paris' }} onFinish={onSubmit}>
        <Form.Field name="city" type="select">
          <Input.Select options={cities} />
        </Form.Field>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    );

    await submit();
    expect(onSubmit).toHaveBeenNthCalledWith(1, { city: 'paris' });

    await user.click(await getSelect());
    await user.click(await screen.findByText('London'));

    await submit();
    expect(onSubmit).toHaveBeenNthCalledWith(2, { city: 'london' });
  });

  it('should render and submit multi value without option', async () => {
    const onSubmit = vi.fn();

    render(
      <Form initialValues={{ cities: ['paris', 'london'] }} onFinish={onSubmit}>
        <Form.Field name="cities" type="multiSelect">
          <Input.MultiSelect options={cities} menuIsOpen />
        </Form.Field>

        <Form.ButtonSubmit>submit</Form.ButtonSubmit>
      </Form>,
    ).debug();

    await submit();
    expect(onSubmit).toHaveBeenNthCalledWith(1, {
      cities: ['paris', 'london'],
    });

    await user.click(await getSelect('cities'));

    const lastParis = (await screen.findAllByText('Paris')).at(-1);
    lastParis && (await user.click(lastParis));

    const lastMadrid = (await screen.findAllByText('Madrid')).at(-1);
    lastMadrid && (await user.click(lastMadrid));

    await submit();
    expect(onSubmit).toHaveBeenNthCalledWith(2, {
      cities: ['london', 'madrid'],
    });
  });
});
