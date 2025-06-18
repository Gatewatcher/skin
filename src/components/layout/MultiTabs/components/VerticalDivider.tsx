import { Divider as SkinDivider } from '@/skin/displays';

export const VerticalDivider = () => {
  return (
    <div style={{ height: 30, alignSelf: 'center' }}>
      <SkinDivider direction="vertical" />
    </div>
  );
};
