import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgComment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#comment_svg__a)" fill="currentColor">
      <path d="M13.305 22.5 12 21.75l3-5.25h4.5A1.5 1.5 0 0 0 21 15V6a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 3 6v9a1.5 1.5 0 0 0 1.5 1.5h6.75V18H4.5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3.63z" />
      <path d="M18 7.5H6V9h12zM13.5 12H6v1.5h7.5z" />
    </g>
    <defs>
      <clipPath id="comment_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgComment);
export default Memo;
