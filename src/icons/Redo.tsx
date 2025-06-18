import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgRedo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#redo_svg__a)">
      <path
        d="M9 7.5h9.139l-2.69-2.69L16.5 3.75l4.5 4.5-4.5 4.5-1.052-1.061L18.137 9H9a4.5 4.5 0 0 0 0 9h6v1.5H9a6 6 0 1 1 0-12"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="redo_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgRedo);
export default Memo;
