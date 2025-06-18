import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTimer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.75 8.25h-1.5V15h1.5zM14.25 1.5h-4.5V3h4.5z"
      fill="currentColor"
    />
    <path
      d="m21 6.75-1.065-1.057-1.687 1.687a8.205 8.205 0 1 0 .884 1.237zM12 19.5A6.75 6.75 0 1 1 12 6a6.75 6.75 0 0 1 0 13.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTimer);
export default Memo;
