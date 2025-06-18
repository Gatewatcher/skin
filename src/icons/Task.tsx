import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTask = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10.5 15.135-2.692-2.692L6.75 13.5l3.75 3.75 6.75-6.75-1.058-1.065z"
      fill="currentColor"
    />
    <path
      d="M18.75 3.75H16.5V3A1.5 1.5 0 0 0 15 1.5H9A1.5 1.5 0 0 0 7.5 3v.75H5.25a1.5 1.5 0 0 0-1.5 1.5V21a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5M9 3h6v3H9zm9.75 18H5.25V5.25H7.5V7.5h9V5.25h2.25z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTask);
export default Memo;
