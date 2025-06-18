import type { TitleProps } from '@/skin/typography';
import { Title as SkinTitle } from '@/skin/typography';

export type HelperTitle = TitleProps;

const Title = ({
  as = 'h5',
  children,
  currentColor = true,
  'data-testid': testId = 'helper-title',
  ...rest
}: HelperTitle) => {
  return (
    <SkinTitle
      as={as}
      currentColor={currentColor}
      data-testid={testId}
      {...rest}
    >
      {children}
    </SkinTitle>
  );
};

export default Title;
