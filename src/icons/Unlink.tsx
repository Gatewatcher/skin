import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUnlink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#unlink_svg__a)" fill="currentColor">
      <path d="m3.748 2.69-1.06 1.061L5.25 6.313l1.06-1.061zM18.747 17.683l-1.06 1.06 2.56 2.563 1.061-1.06zM9.75 1.5h-1.5v3h1.5zM4.5 8.25h-3v1.5h3zM22.5 14.25h-3v1.5h3zM15.75 19.5h-1.5v3h1.5zM12.435 15.803l-2.782 2.79a3.003 3.003 0 0 1-5.125-2.123c0-.796.317-1.56.88-2.122l2.79-2.79L7.133 10.5 4.35 13.29a4.5 4.5 0 0 0-.045 6.405A4.5 4.5 0 0 0 7.5 21a4.55 4.55 0 0 0 3.24-1.35l2.76-2.782zM11.558 8.197l2.79-2.79a3.001 3.001 0 1 1 4.245 4.245l-2.79 2.79 1.064 1.058 2.783-2.79a4.5 4.5 0 0 0 .045-6.405A4.5 4.5 0 0 0 16.5 3a4.55 4.55 0 0 0-3.24 1.35L10.5 7.132z" />
    </g>
    <defs>
      <clipPath id="unlink_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgUnlink);
export default Memo;
