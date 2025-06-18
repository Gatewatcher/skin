import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleHelp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18m0-2.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25M11.625 6h1.125a3.375 3.375 0 1 1 0 6.75v1.875h-1.5V11.25h1.5a1.875 1.875 0 1 0 0-3.75h-1.125A1.875 1.875 0 0 0 9.75 9.375v.375h-1.5v-.375A3.367 3.367 0 0 1 11.625 6"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgCircleHelp);
export default Memo;
