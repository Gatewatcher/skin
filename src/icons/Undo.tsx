import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUndo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#undo_svg__a)">
      <path
        d="M15 7.5H5.861l2.69-2.69L7.5 3.75 3 8.25l4.5 4.5 1.052-1.061L5.863 9H15a4.5 4.5 0 1 1 0 9H9v1.5h6a6 6 0 1 0 0-12"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="undo_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgUndo);
export default Memo;
