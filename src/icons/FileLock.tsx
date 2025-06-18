import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFileLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.624 6.814 12.53 1.72A.75.75 0 0 0 12 1.5H4.5A1.504 1.504 0 0 0 3 3v18a1.504 1.504 0 0 0 1.5 1.5h6V21h-6V3h6v4.5A1.5 1.5 0 0 0 12 9h4.719a1.28 1.28 0 0 0 .905-2.186M12 7.5V3.31l4.189 4.19z"
      fill="currentColor"
    />
    <path
      d="M21 15.75h-4.5V13.5a1.5 1.5 0 1 1 3 0H21a3 3 0 0 0-6 0v2.25a1.5 1.5 0 0 0-1.5 1.5V21a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-3.75a1.5 1.5 0 0 0-1.5-1.5M15 21v-3.75h6V21z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFileLock);
export default Memo;
