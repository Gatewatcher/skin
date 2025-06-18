import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgScan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.75 21.75h-12a1.5 1.5 0 0 1-1.5-1.5V3.75a1.5 1.5 0 0 1 1.5-1.5h12v1.5h-12v16.5h12z"
      fill="currentColor"
    />
    <path
      d="M12.75 6.75h-1.5v10.5h1.5zM21.75 6.75h-1.5v10.5h1.5zM17.25 6.75h-1.5v10.5h1.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgScan);
export default Memo;
