import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.25 2.499H3.75a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5v-16.5a1.5 1.5 0 0 0-1.5-1.5m0 1.5v3H3.75v-3zm-7.5 4.5h7.5v5.25h-7.5zm-1.5 5.25h-7.5v-5.25h7.5zm-7.5 1.5h7.5v5.25h-7.5zm9 5.25v-5.25h7.5v5.25z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTable);
export default Memo;
