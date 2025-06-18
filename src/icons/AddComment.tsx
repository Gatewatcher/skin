import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgAddComment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#add-comment_svg__a)" fill="currentColor">
      <path d="M13.305 22.5 12 21.75l3-5.25h4.5A1.5 1.5 0 0 0 21 15V6a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 3 6v9a1.5 1.5 0 0 0 1.5 1.5h6.75V18H4.5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3.63z" />
      <path d="M12.75 6.75h-1.5v3h-3v1.5h3v3h1.5v-3h3v-1.5h-3z" />
    </g>
    <defs>
      <clipPath id="add-comment_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgAddComment);
export default Memo;
