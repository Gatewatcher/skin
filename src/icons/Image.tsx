import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgImage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.25 10.749a2.25 2.25 0 1 0 0-4.499 2.25 2.25 0 0 0 0 4.499m0-3a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5"
      fill="currentColor"
    />
    <path
      d="M19.5 3.249h-15a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-1.5-1.5m0 16.5h-15v-4.5l3.75-3.75 4.192 4.192a1.5 1.5 0 0 0 2.115 0L15.75 14.5l3.75 3.75zm0-3.622-2.693-2.693a1.5 1.5 0 0 0-2.115 0L13.5 14.627l-4.193-4.193a1.5 1.5 0 0 0-2.115 0L4.5 13.127V4.749h15z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgImage);
export default Memo;
