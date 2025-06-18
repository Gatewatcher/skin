import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgZoomFit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.086 15A8.14 8.14 0 0 0 18 9.75 8.25 8.25 0 1 0 9.75 18 8.14 8.14 0 0 0 15 16.086l5.69 5.664 1.06-1.06zM9.75 16.5a6.75 6.75 0 1 1 6.75-6.75 6.76 6.76 0 0 1-6.75 6.75"
      fill="currentColor"
    />
    <path
      d="M7.5 9H6V7.5A1.5 1.5 0 0 1 7.5 6H9v1.5H7.5zM13.5 9H12V7.5h-1.5V6H12a1.5 1.5 0 0 1 1.5 1.5zM9 13.5H7.5A1.5 1.5 0 0 1 6 12v-1.5h1.5V12H9zM12 13.5h-1.5V12H12v-1.5h1.5V12a1.5 1.5 0 0 1-1.5 1.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgZoomFit);
export default Memo;
