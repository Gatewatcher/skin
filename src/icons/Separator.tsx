import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSeparator = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M15.313 8.503H2.188v1.094h13.125z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgSeparator);
export default Memo;
