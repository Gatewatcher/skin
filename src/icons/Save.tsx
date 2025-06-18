import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSave = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#save_svg__a)">
      <path
        d="m20.783 6.968-3.75-3.75A.75.75 0 0 0 16.5 3h-12A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-12a.75.75 0 0 0-.218-.532M9 4.5h6v3H9zm6 15H9v-6h6zm1.5 0v-6A1.5 1.5 0 0 0 15 12H9a1.5 1.5 0 0 0-1.5 1.5v6h-3v-15h3v3A1.5 1.5 0 0 0 9 9h6a1.5 1.5 0 0 0 1.5-1.5V4.808l3 3V19.5z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="save_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgSave);
export default Memo;
