import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUserAccess = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#user-access_svg__a)" fill="currentColor">
      <path d="M12 22.5h-1.5v-3.75a2.253 2.253 0 0 0-2.25-2.25h-3A2.253 2.253 0 0 0 3 18.75v3.75H1.5v-3.75A3.755 3.755 0 0 1 5.25 15h3A3.755 3.755 0 0 1 12 18.75zM6.75 7.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5m0-1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M22.5 9q-.196.002-.384.056l-.791-.792a2.91 2.91 0 0 0 0-3.028l.791-.792a1.526 1.526 0 1 0-1.06-1.06l-.792.791a2.91 2.91 0 0 0-3.028 0l-.792-.791a1.525 1.525 0 1 0-1.06 1.06l.791.792a2.91 2.91 0 0 0 0 3.028l-.791.792a1.526 1.526 0 1 0 1.06 1.06l.792-.791a2.91 2.91 0 0 0 3.028 0l.792.791A1.497 1.497 0 1 0 22.5 9m-5.25-2.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0" />
    </g>
    <defs>
      <clipPath id="user-access_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgUserAccess);
export default Memo;
