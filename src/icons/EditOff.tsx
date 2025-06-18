import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgEditOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 21.45 2.55 1.5 1.5 2.55l7.575 7.575L3 16.2V21h4.8l6.075-6.075L21.45 22.5zM7.2 19.5H4.5v-2.7l5.625-5.625 2.7 2.7zM22.05 4.65l-2.7-2.7c-.6-.6-1.5-.6-2.1 0l-6 6L12.3 9 15 6.3 17.7 9 15 11.7l1.05 1.05 6-6c.6-.6.6-1.5 0-2.1m-3.3 3.3-2.7-2.7L18.3 3 21 5.7z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgEditOff);
export default Memo;
