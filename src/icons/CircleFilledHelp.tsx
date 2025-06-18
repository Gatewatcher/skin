import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleFilledHelp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#circle-filled-help_svg__a)">
      <path
        d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21m0 17.25a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25m.857-5.815v1.876h-1.688V11.25h1.594a1.783 1.783 0 0 0 0-3.564h-1.125a1.783 1.783 0 0 0-1.781 1.78v.479H8.169v-.478A3.47 3.47 0 0 1 11.638 6h1.125a3.468 3.468 0 0 1 .094 6.935"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="circle-filled-help_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCircleFilledHelp);
export default Memo;
