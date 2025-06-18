import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgZoomIn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13.5 9h-3V6H9v3H6v1.5h3v3h1.5v-3h3z" fill="currentColor" />
    <path
      d="M16.086 15A8.14 8.14 0 0 0 18 9.75 8.25 8.25 0 1 0 9.75 18 8.14 8.14 0 0 0 15 16.086l5.69 5.664 1.06-1.06zM9.75 16.5a6.75 6.75 0 1 1 6.75-6.75 6.76 6.76 0 0 1-6.75 6.75"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgZoomIn);
export default Memo;
