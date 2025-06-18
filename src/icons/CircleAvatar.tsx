import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleAvatar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 6a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 6m0 6a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5"
      fill="currentColor"
    />
    <path
      d="M12 1.5A10.5 10.5 0 1 0 22.5 12 10.51 10.51 0 0 0 12 1.5M7.5 19.783V18.75a2.25 2.25 0 0 1 2.25-2.25h4.5a2.25 2.25 0 0 1 2.25 2.25v1.033a8.92 8.92 0 0 1-9 0m10.494-1.088A3.75 3.75 0 0 0 14.25 15h-4.5a3.75 3.75 0 0 0-3.744 3.695 9 9 0 1 1 11.989 0z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCircleAvatar);
export default Memo;
