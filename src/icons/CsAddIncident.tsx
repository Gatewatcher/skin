import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsAddIncident = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.75 18.044a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25M13.5 9.793H12v6.75h1.5z"
      fill="currentColor"
    />
    <path
      d="M14.25 23.294H3a.75.75 0 0 1-.665-1.096l9.75-18.75a.76.76 0 0 1 .665-.405c.268 0 .536.156.665.404l5.07 9.75-1.33.692-4.405-8.47-8.515 16.375H14.25z"
      fill="currentColor"
    />
    <path
      d="M23.25 18.794h-3v-3h-1.5v3h-3v1.5h3v3h1.5v-3h3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCsAddIncident);
export default Memo;
