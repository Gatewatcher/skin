import { Section } from '@/skin/displays';
import { Grid, Stack } from '@/skin/layout';

import type { FieldsErrors } from '../..';
import { Form, Input, useForm } from '../..';

const ApiErrorExample = () => {
  const [form] = useForm();

  const initialValues = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@test.com',
    password: 'password',
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/users-error');
      const data = await res.json();

      if (!res.ok) {
        throw data;
      }
    } catch (error) {
      form.setErrors(error as FieldsErrors);
    }
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Grid columns={2} isContainer>
        <Grid isItem>
          <Section>
            <Section.Header>
              <Section.Title>Profile</Section.Title>
            </Section.Header>
            <Section.Body>
              <Stack direction="column" gap={6}>
                <Form.Field name="firstname">
                  <Input.Text />
                </Form.Field>
                <Form.Field name="lastname">
                  <Input.Text />
                </Form.Field>
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
                <Form.Field name="email">
                  <Input.Email />
                </Form.Field>
                <Form.Field name="password">
                  <Input.Password />
                </Form.Field>
              </Stack>
            </Section.Body>
          </Section>
        </Grid>
      </Grid>

      <Form.Actions form={form} />
    </Form>
  );
};

export default ApiErrorExample;
