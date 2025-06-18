import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgEqual = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 8.5H4v1.714h16zM20 14.786H4V16.5h16z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgEqual);
export default Memo;
