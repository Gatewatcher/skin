import { useCodeBlock } from '../../hooks/useCodeBlock';
import { BlockCodeToolbar } from './BlockCodeToolbar';
import { DefaultToolbar } from './DefaultToolbar';

export const ToolbarPlugin = () => {
  const { isCodeBlock } = useCodeBlock();

  return isCodeBlock ? <BlockCodeToolbar /> : <DefaultToolbar />;
};
