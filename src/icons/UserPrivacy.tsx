import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUserPrivacy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.25 15.75h-1.5v-1.5A2.253 2.253 0 0 1 9 12h4.5v1.5H9a.75.75 0 0 0-.75.75zM11.25 11.25a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M18 16.5a3 3 0 1 1 0-5.999 3 3 0 0 1 0 5.999m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M22.5 21H21v-1.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75V21h-1.5v-1.5a2.253 2.253 0 0 1 2.25-2.25h4.5a2.253 2.253 0 0 1 2.25 2.25z"
      fill="currentColor"
    />
    <path
      d="m10.5 20.8-3.926-2.093A6.74 6.74 0 0 1 3 12.75V3h15v4.5h1.5V3A1.5 1.5 0 0 0 18 1.5H3A1.5 1.5 0 0 0 1.5 3v9.75a8.24 8.24 0 0 0 4.368 7.28L10.5 22.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgUserPrivacy);
export default Memo;
