import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.75 16.5v-6h-3V12h1.5v4.5H9V18h6v-1.5zM12 6a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 6"
      fill="currentColor"
    />
    <path
      d="M12 22.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCircleInfo);
export default Memo;
