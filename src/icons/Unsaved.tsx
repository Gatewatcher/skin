import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUnsaved = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#unsaved_svg__a)" fill="currentColor">
      <path d="m22.5 14.55-1.05-1.05-2.7 2.7-2.7-2.7L15 14.55l2.7 2.7-2.7 2.7L16.05 21l2.7-2.7 2.7 2.7 1.05-1.05-2.7-2.7z" />
      <path d="M12 19.5H9v-6h3V12H9c-.825 0-1.5.675-1.5 1.5v6h-3v-15h3v3C7.5 8.325 8.175 9 9 9h6c.825 0 1.5-.675 1.5-1.5V4.8l3 3V12H21V7.5a.68.68 0 0 0-.225-.525l-3.75-3.75A.68.68 0 0 0 16.5 3h-12C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5H12zm-3-15h6v3H9z" />
    </g>
    <defs>
      <clipPath id="unsaved_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgUnsaved);
export default Memo;
