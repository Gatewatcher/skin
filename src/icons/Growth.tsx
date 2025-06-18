import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgGrowth = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 6v1.5h4.94l-6.44 6.44-3.22-3.22a.75.75 0 0 0-1.06 0L1.5 18.44l1.06 1.06 7.19-7.19 3.22 3.22a.75.75 0 0 0 1.06 0L21 8.56v4.94h1.5V6z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgGrowth);
export default Memo;
