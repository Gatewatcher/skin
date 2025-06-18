import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.5 10.757H16v-4.5a4.5 4.5 0 1 0-9 0v4.5H5.5a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5m-9-4.5a3 3 0 1 1 6 0v4.5h-6zm9 15h-12v-9h12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgLock);
export default Memo;
