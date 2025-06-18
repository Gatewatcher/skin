import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgZoomReset = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.836 15.75a8.14 8.14 0 0 0 1.914-5.25A8.242 8.242 0 0 0 4.5 4.85V1.5H3v6h6V6H5.499a6.733 6.733 0 1 1-1.575 6h-1.53a8.26 8.26 0 0 0 8.106 6.75 8.14 8.14 0 0 0 5.25-1.914l5.69 5.664 1.06-1.06z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgZoomReset);
export default Memo;
