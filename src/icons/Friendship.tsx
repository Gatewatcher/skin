import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFriendship = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.75 7.5H5.25A2.253 2.253 0 0 0 3 9.75v4.5a1.5 1.5 0 0 0 1.5 1.5V21A1.5 1.5 0 0 0 6 22.5h3a1.5 1.5 0 0 0 1.5-1.5v-9H9v9H6v-6.75H4.5v-4.5A.75.75 0 0 1 5.25 9h13.5a.75.75 0 0 1 .75.75v4.5H18V21h-3v-9h-1.5v9a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-5.25a1.5 1.5 0 0 0 1.5-1.5v-4.5a2.253 2.253 0 0 0-2.25-2.25M7.5 6.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M16.5 6.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFriendship);
export default Memo;
