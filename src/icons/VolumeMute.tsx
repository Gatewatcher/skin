import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgVolumeMute = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#volume-mute_svg__a)" fill="currentColor">
      <path d="M23.25 9.308 22.192 8.25 19.5 10.943 16.808 8.25 15.75 9.307 18.442 12l-2.692 2.693 1.058 1.057 2.692-2.693 2.692 2.693 1.058-1.057L20.558 12zM13.5 22.5a.75.75 0 0 1-.533-.225L7.253 16.5H2.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h5.003l5.714-5.775a.75.75 0 0 1 1.058 0 .75.75 0 0 1 .225.525v19.5a.75.75 0 0 1-.75.75" />
    </g>
    <defs>
      <clipPath id="volume-mute_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgVolumeMute);
export default Memo;
