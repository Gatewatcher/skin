import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleFilledInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#circle-filled-info_svg__a)">
      <path
        d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21M12 6a1.125 1.125 0 1 1 0 2.25A1.125 1.125 0 0 1 12 6m3 12.094H9v-1.688h2.156v-4.312H9.75v-1.688h3.094v6H15z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="circle-filled-info_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCircleFilledInfo);
export default Memo;
