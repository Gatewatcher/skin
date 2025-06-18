import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgVolumeUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#volume-up_svg__a)" fill="currentColor">
      <path d="m20.37 6.06-1.148.968a7.5 7.5 0 0 1-.217 9.922L20.108 18a9 9 0 0 0 .262-11.91z" />
      <path d="M16.185 9a4.5 4.5 0 0 1-.135 5.955l1.102 1.02a6 6 0 0 0 .173-7.943zM13.5 22.5a.75.75 0 0 1-.533-.225L7.253 16.5H2.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h5.003l5.714-5.775a.75.75 0 0 1 1.058 0 .75.75 0 0 1 .225.525v19.5a.75.75 0 0 1-.75.75" />
    </g>
    <defs>
      <clipPath id="volume-up_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgVolumeUp);
export default Memo;
