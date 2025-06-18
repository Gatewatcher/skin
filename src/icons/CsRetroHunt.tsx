import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsRetroHunt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-retro-hunt_svg__a)" fill="currentColor">
      <path d="M12 20.25c2.7 0 5.325-1.35 6.9-3.75H15V15h6v6h-1.5v-2.775c-1.875 2.25-4.575 3.525-7.5 3.525zM9 7.5H5.1c2.475-3.825 7.575-4.875 11.4-2.4a8.25 8.25 0 0 1 3.75 6.9h1.5c0-5.4-4.35-9.75-9.75-9.75-2.925 0-5.625 1.275-7.5 3.525V3H3v6h6z" />
      <path
        clipRule="evenodd"
        d="M7.849 18.75a2.999 2.999 0 0 1-5.198 0H.75v-1.5h1.5V15H.75v-1.5h1.595a3.001 3.001 0 0 1 5.81 0H9.75V15h-1.5v2.25h1.5v1.5zm-4.099-1.5v-3a1.5 1.5 0 0 1 3 0v3.001a1.5 1.5 0 0 1-3-.001"
        fillRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="cs-retro-hunt_svg__a">
        <path d="M24 0H0v24h24z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsRetroHunt);
export default Memo;
