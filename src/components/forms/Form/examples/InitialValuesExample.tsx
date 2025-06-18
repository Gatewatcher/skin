import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { User } from '@/mocks/types';
import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import type { SelectOption } from '../..';
import { Form, Input, useForm } from '../..';

const InitialValuesExample = () => {
  const genders: SelectOption[] = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: '-' },
  ];

  const cities: SelectOption<number>[] = [
    { label: 'Paris', value: 0 },
    { label: 'Madrid', value: 1 },
    { label: 'London', value: 2 },
  ];

  const fetchUsers = async () => {
    const response = await fetch('/users');
    const data = await response.json();
    return {
      ...data.results[0],
      gender: 'M',
      date: new Date('December 17, 1995'),
    };
  };

  const updateUser = async (user: Partial<User>) => {
    const response = await fetch('/users-update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  };

  const [form] = useForm();

  const { data } = useQuery<User>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateUser,
    onMutate: console.log,
    onSuccess: data => {
      queryClient.setQueryData(['users'], data);
    },
  });

  return (
    <Form form={form} initialValues={data} onFinish={mutateAsync}>
      <Text>Wait 2 seconds for request response</Text>

      <Stack direction="column" gap={8} margin={{ top: 8 }}>
        <Form.Field name="city" type="multiSelect">
          {(control, meta) => (
            <Input.MultiSelect meta={meta} options={cities} {...control} />
          )}
        </Form.Field>
        <Form.Field name="gender" type="select">
          <Input.Select options={genders} />
        </Form.Field>
        <Form.Field name="firstname">
          <Input.Text />
        </Form.Field>
        <Form.Field name="lastname" required>
          <Input.Text />
        </Form.Field>
        <Form.Field name="email" rules={[{ type: 'email' }]}>
          <Input.Email />
        </Form.Field>
        <Form.Field name="date" type="date">
          <Input.Date />
        </Form.Field>

        <Form.Actions form={form} isLoading={isLoading} />
      </Stack>
    </Form>
  );
};

export default InitialValuesExample;
