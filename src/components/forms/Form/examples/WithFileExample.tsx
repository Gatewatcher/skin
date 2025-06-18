import { useEffect, useState } from 'react';

import FilesList from '@/skin/feedback/FilesList';
import { Stack } from '@/skin/layout';

import { Form, Input, useForm } from '../..';

const url =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

const WithFileExample = () => {
  const [form] = useForm();
  const [files, setFiles] = useState<File[]>();
  const [initialValues, setInitialValues] = useState<object>();

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(url);
      const blob = await res.blob();
      setInitialValues({
        firstname: 'John',
        lastname: 'Doe',
        avatar: new File([blob], 'image.png', { type: 'image/png' }),
      });
    };
    fetchImage();
  }, []);

  return (
    <Form initialValues={initialValues} onFinish={data => console.log(data)}>
      <Stack direction="column" gap={10}>
        <Form.Field name="firstname">
          <Input.Text />
        </Form.Field>
        <Form.Field name="lastname">
          <Input.Text />
        </Form.Field>
        <Stack direction="column">
          <Stack.Item>
            <Form.Field name="avatar" type="files">
              <Input.File
                label="avatar"
                onChange={ev => setFiles(ev.files)}
                startIcon="Download"
                multiple
              />
            </Form.Field>
          </Stack.Item>

          <FilesList files={files}>
            {file => (
              <FilesList.Item
                key={file.name}
                file={file}
                onDelete={() => setFiles([])}
              />
            )}
          </FilesList>
        </Stack>

        <Form.Actions form={form} />
      </Stack>
    </Form>
  );
};

export default WithFileExample;
