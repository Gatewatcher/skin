import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMonitoring = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M13.493 13.5h.007a.75.75 0 0 0 .717-.53l2.312-7.513.76 2.28A.75.75 0 0 0 18 8.25h4.5v-1.5h-3.96l-1.328-3.987a.735.735 0 0 0-.712-.513.76.76 0 0 0-.717.53l-2.256 7.333-.806-2.819A.75.75 0 0 0 12 6.75H8.25v1.5h3.184l1.345 4.706a.75.75 0 0 0 .713.544m7.507 3V12h1.5v4.5A1.5 1.5 0 0 1 21 18h-6v3h3v1.5H6V21h3v-3H3a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 3 3h5.25v1.5H3v12zM10.5 18v3h3v-3z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgMonitoring);
export default Memo;
