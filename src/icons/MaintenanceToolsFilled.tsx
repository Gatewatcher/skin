import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMaintenanceToolsFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 28 29"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="currentColor" height={28} rx={14} width={28} y={0.5} />
    <g clipPath="url(#maintenance-tools-filled_svg__a)">
      <path
        d="M11.562 5.75a6.13 6.13 0 0 0-3.375 1l4 4a1.313 1.313 0 0 1 .125 1.875 1.31 1.31 0 0 1-1.875-.125l-4.125-4a6.15 6.15 0 0 0-1.062 3.563 6.34 6.34 0 0 0 6.312 6.312 6.8 6.8 0 0 0 1.625-.187l4.188 4.187a3.138 3.138 0 1 0 4.437-4.437l-4.187-4.188c.128-.532.19-1.078.187-1.625a6.247 6.247 0 0 0-6.25-6.375m5 6.313c0 .444-.064.885-.187 1.312l-.188.688.5.5 4.188 4.187a1.8 1.8 0 0 1 .562 1.313 1.7 1.7 0 0 1-.562 1.312 1.81 1.81 0 0 1-2.625 0l-4.188-4.187-.5-.5-.687.187a4.8 4.8 0 0 1-1.313.188A5.17 5.17 0 0 1 8 15.625a4.77 4.77 0 0 1-1.5-3.562c0-.465.064-.928.187-1.376l2.75 2.75a2.59 2.59 0 0 0 3.688.126A2.586 2.586 0 0 0 13 9.875l-2.75-2.75a4 4 0 0 1 1.25-.187 5.17 5.17 0 0 1 3.562 1.437 5.3 5.3 0 0 1 1.5 3.688"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="maintenance-tools-filled_svg__a">
        <path d="M4 4.5h20v20H4z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgMaintenanceToolsFilled);
export default Memo;
