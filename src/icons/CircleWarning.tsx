import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18"
      fill="currentColor"
    />
    <path
      d="M12.75 6h-1.5v8.25h1.5zM12 16.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCircleWarning);
export default Memo;
