import { isFunction } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { CircularLoader, Placeholder } from '@/skin/feedback';

import Section from '../Section';
import type { FileTextContent, Status } from './types';
import { readFile } from './utils';

export type FileContentProps = DataTestId & {
  errorPlaceholder?: ReactNode | ((error: unknown) => ReactNode);
  file?: File;
  name?: string;
  noDataPlaceholder?: ReactNode;
};

const FileContent = ({
  'data-testid': testId = 'file-content',
  errorPlaceholder: ErrorPlaceholder = (
    <Placeholder>
      <Placeholder.Illustration name="Error" />
      <Placeholder.Title>Unexpected error</Placeholder.Title>
    </Placeholder>
  ),
  file,
  name,
  noDataPlaceholder: NoDataPlaceholder = (
    <Placeholder>
      <Placeholder.Illustration name="FolderEmpty" />
      <Placeholder.Title>No files</Placeholder.Title>
    </Placeholder>
  ),
}: FileContentProps) => {
  const [fileContent, setFileContent] = useState<FileTextContent>();
  const [error, setError] = useState<unknown>();
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    if (!file) {
      setStatus('success');
      return;
    }

    const getFileValue = async () => {
      setStatus('loading');

      try {
        const content = await readFile(file);
        setFileContent(content);
        setStatus('success');
      } catch (err) {
        setError(err);
        setStatus('error');
      }
    };

    getFileValue();
  }, [file]);

  return (
    <Section data-testid={testId}>
      <Section.Header>
        <Section.Title>{name || file?.name}</Section.Title>
      </Section.Header>

      <Section.Body>
        <>{status === 'loading' && <CircularLoader />}</>
        <>
          {status === 'error' &&
            (isFunction(ErrorPlaceholder)
              ? ErrorPlaceholder(error)
              : ErrorPlaceholder)}
        </>
        <>{status === 'success' && (fileContent || NoDataPlaceholder)}</>
      </Section.Body>
    </Section>
  );
};

export default FileContent;
