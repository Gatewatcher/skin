import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTextFont = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.75 9H15v1.5h3.75a.75.75 0 0 1 .75.75v1.5h-3A2.253 2.253 0 0 0 14.25 15v.75A2.253 2.253 0 0 0 16.5 18H21v-6.75A2.253 2.253 0 0 0 18.75 9m-2.25 7.5a.75.75 0 0 1-.75-.75V15a.75.75 0 0 1 .75-.75h3v2.25zM12 18h1.5L9 5.25H7.5L3 18h1.5l1.27-3.75h4.96zm-5.722-5.25 1.873-5.528h.2l1.871 5.528z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTextFont);
export default Memo;
