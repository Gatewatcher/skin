import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsEyeSynchro = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-eye-synchro_svg__a)" fill="currentColor">
      <path d="M12 20.25c-2.7 0-5.325-1.35-6.9-3.75H9V15H3v6h1.5v-2.775c1.875 2.25 4.575 3.525 7.5 3.525zM15 7.5h3.9c-2.475-3.825-7.575-4.875-11.4-2.4A8.25 8.25 0 0 0 3.75 12h-1.5c0-5.4 4.35-9.75 9.75-9.75 2.925 0 5.625 1.275 7.5 3.525V3H21v6h-6zM18 17.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
      <path d="M23.833 15.359A6.48 6.48 0 0 0 18 11.25a6.48 6.48 0 0 0-5.833 4.109L12 15.75l.167.391A6.48 6.48 0 0 0 18 20.25a6.48 6.48 0 0 0 5.833-4.109L24 15.75zM18 18.75a3 3 0 1 1 0-5.999 3 3 0 0 1 0 5.999" />
    </g>
    <defs>
      <clipPath id="cs-eye-synchro_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsEyeSynchro);
export default Memo;
