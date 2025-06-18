import { Form, Input, useForm } from '../..';

const SectionExample = () => {
  const [form] = useForm();

  return (
    <Form form={form}>
      <Form.Section>
        <Form.SectionTitle>Section 1</Form.SectionTitle>
        <Form.SectionBody>
          <Input.Text label="Firstname" meta={{ errors: ['errors'] }} />

          <Form.Field name="lastname">
            <Input.Text meta={{ helpers: ['help me'] }} />
          </Form.Field>
        </Form.SectionBody>
      </Form.Section>

      <Form.Section>
        <Form.SectionTitle>Section 2</Form.SectionTitle>
        <Form.SectionBody>
          <Form.Field name="first">
            <Input.Text />
          </Form.Field>

          <Form.Field name="last">
            <Input.Text />
          </Form.Field>
        </Form.SectionBody>
      </Form.Section>
    </Form>
  );
};

export default SectionExample;
