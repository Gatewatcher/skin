import { useMutation } from '@tanstack/react-query';

import { Section } from '@/skin/displays';
import { Grid, Stack } from '@/skin/layout';

import { Form, Input, useForm } from '../..';

const GroupExample = () => {
  const [form] = useForm();

  const initialValues = {
    profile: {
      firstname: 'John',
      lastname: 'Doe',
    },
    account: {
      email: 'john.doe@test.com',
      password: 'password',
    },
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await fetch('/users-error');
      const error = await res.json();
      form.setErrors(error, { prefix: 'profile' });
    },
  });

  return (
    <Form form={form} initialValues={initialValues} onFinish={mutate}>
      <Grid columns={2} isContainer>
        <Grid isItem>
          <Section>
            <Section.Header>
              <Section.Title>Profile</Section.Title>
            </Section.Header>
            <Section.Body>
              <Stack direction="column" gap={6}>
                <Form.Group name="profile">
                  <Form.Field name="firstname" rules={[{ required: true }]}>
                    <Input.Text />
                  </Form.Field>
                  <Form.Field name="lastname" rules={[{ required: true }]}>
                    <Input.Text />
                  </Form.Field>
                </Form.Group>
              </Stack>
            </Section.Body>
          </Section>
        </Grid>

        <Grid isItem>
          <Section>
            <Section.Header>
              <Section.Title>Account</Section.Title>
            </Section.Header>
            <Section.Body>
              <Stack direction="column" gap={6}>
                <Form.Group name="account">
                  <Form.Field name="email" rules={[{ required: true }]}>
                    <Input.Email />
                  </Form.Field>
                  <Form.Field name="password" rules={[{ required: true }]}>
                    <Input.Password />
                  </Form.Field>
                </Form.Group>
              </Stack>
            </Section.Body>
          </Section>
        </Grid>
      </Grid>

      <Form.Actions form={form} isLoading={isLoading} />
    </Form>
  );
};

export default GroupExample;
