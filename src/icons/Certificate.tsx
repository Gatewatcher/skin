import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCertificate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#certificate_svg__a)" fill="currentColor">
      <path d="m18 13.25 1.434 2.777 3.066.446-2.25 2.027.578 3L18 19.813 15.172 21.5l.578-3-2.25-2.027 3.15-.446zM9 12.5H4.5V14H9zM12 9.5H4.5V11H12zM12 6.5H4.5V8H12z" />
      <path d="M12 20H3V5h18v7.5h1.5V5A1.5 1.5 0 0 0 21 3.5H3A1.5 1.5 0 0 0 1.5 5v15A1.5 1.5 0 0 0 3 21.5h9z" />
    </g>
    <defs>
      <clipPath id="certificate_svg__a">
        <path d="M0 .5h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCertificate);
export default Memo;
