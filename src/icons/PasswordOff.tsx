import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPasswordOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#password-off_svg__a)" fill="currentColor">
      <path d="M11.303 6.837a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
      <path
        clipRule="evenodd"
        d="m9.452 10.688 5.153 5.15.943-.944L2.246 1.602l-.943.943 5.148 5.144-5.148 5.148v3h3zm-.707-.707L7.159 8.396 2.303 13.25v1.586H3.89l1.104-1.104-.69-.689.707-.707.69.69.793-.793-.69-.69.707-.707.69.69z"
        fillRule="evenodd"
      />
      <path d="M13.212 10.14a4.5 4.5 0 0 1-.835.413l-.802-.802A3.5 3.5 0 1 0 7.39 5.566l-.803-.803a4.5 4.5 0 0 1 6.09-2.518 4.5 4.5 0 0 1 .535 7.894" />
    </g>
    <defs>
      <clipPath id="password-off_svg__a">
        <path d="M.303.837h16v16h-16z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgPasswordOff);
export default Memo;
