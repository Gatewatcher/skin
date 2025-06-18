import type { SVGProps } from 'react';
import { memo } from 'react';

const Svg3DCurve = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.125 6h7.95a3.75 3.75 0 1 0 0-1.5h-7.95a4.125 4.125 0 0 0 0 8.25h8.25a2.625 2.625 0 0 1 0 5.25h-6.45a3.75 3.75 0 1 0 0 1.5h6.45a4.125 4.125 0 0 0 0-8.25h-8.25a2.625 2.625 0 0 1 0-5.25M18.75 3a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5M5.25 21a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(Svg3DCurve);
export default Memo;
