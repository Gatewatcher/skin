import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSortDesc = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m13.5 16.5 1.06-1.06 2.69 2.689V3h1.5v15.129l2.69-2.69L22.5 16.5 18 21zM12 4.5H1.5V6H12zM12 9H4.5v1.5H12zM12 13.5H7.5V15H12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgSortDesc);
export default Memo;
