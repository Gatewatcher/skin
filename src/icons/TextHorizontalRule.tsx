import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTextHorizontalRule = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21 11.499H3v1.5h18z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgTextHorizontalRule);
export default Memo;
