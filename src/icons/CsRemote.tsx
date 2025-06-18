import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsRemote = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-remote_svg__a)" fill="currentColor">
      <path d="m4.579 5.329 1.06 1.06a8.985 8.985 0 0 1 12.722 0l1.06-1.06a10.484 10.484 0 0 0-14.842 0" />
      <path d="M12 6a6.73 6.73 0 0 0-4.77 1.98l1.06 1.06a5.24 5.24 0 0 1 7.42 0l1.06-1.06A6.73 6.73 0 0 0 12 6M14.25 22.5h-4.5a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5h4.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5M9.75 12v9h4.5v-9z" />
      <rect height={1.5} rx={0.75} width={1.5} x={11.25} y={13.5} />
    </g>
    <defs>
      <clipPath id="cs-remote_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsRemote);
export default Memo;
