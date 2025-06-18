import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSkip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#skip_svg__a)">
      <path
        d="M12 1.875a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21m1.864 11.156-6.75 3.75A.75.75 0 0 1 6 16.125v-7.5a.75.75 0 0 1 1.114-.655l6.75 3.75a.75.75 0 0 1 0 1.31M18 16.875h-1.5v-9H18z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="skip_svg__a">
        <path d="M0 .375h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgSkip);
export default Memo;
