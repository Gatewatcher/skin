import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

export type PreviewRenderProps = DataTestId & {
  content?: string;
};

export const Render = ({
  content,
  'data-testid': testId = 'wysiwyg-render',
}: PreviewRenderProps) => {
  if (!content) return;

  return (
    <div dangerouslySetInnerHTML={{ __html: content }} data-testid={testId} />
  );
};
