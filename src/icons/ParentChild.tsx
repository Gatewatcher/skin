import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgParentChild = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 10.5h6A1.5 1.5 0 0 0 22.5 9V3A1.5 1.5 0 0 0 21 1.5h-6A1.5 1.5 0 0 0 13.5 3H6.75a1.5 1.5 0 0 0-1.5 1.5v3H3A1.5 1.5 0 0 0 1.5 9v6A1.5 1.5 0 0 0 3 16.5h1.5v3A1.5 1.5 0 0 0 6 21h7.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5h-6a1.5 1.5 0 0 0-1.5 1.5v4.5H6v-3h3a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 9 7.5H6.75v-3h6.75V9a1.5 1.5 0 0 0 1.5 1.5M15 21v-3h6v3zm6-6v1.5h-6V15zM3 15v-3h6v3zm6-4.5H3V9h6zM15 9V6h6v3zm6-6v1.5h-6V3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgParentChild);
export default Memo;
