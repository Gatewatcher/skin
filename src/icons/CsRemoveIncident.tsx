import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsRemoveIncident = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 18.044a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25M12.75 9.793h-1.5v6.75h1.5z"
      fill="currentColor"
    />
    <path
      d="M13.5 23.294H2.25a.75.75 0 0 1-.665-1.096l9.75-18.75A.76.76 0 0 1 12 3.042c.268 0 .536.156.665.404l5.07 9.75-1.33.692L12 5.42 3.485 21.794H13.5z"
      fill="currentColor"
    />
    <path d="M22.5 18.794H15v1.5h7.5z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgCsRemoveIncident);
export default Memo;
