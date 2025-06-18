import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgWiki = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#wiki_svg__a)">
      <path
        d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21m9 9.75h-4.5a18.2 18.2 0 0 0-2.092-7.912A9 9 0 0 1 21 11.25M12 21a4 4 0 0 1-.502 0A16.4 16.4 0 0 1 9 12.75h6A16.4 16.4 0 0 1 12.525 21 4 4 0 0 1 12 21m-3-9.75c.075-2.921.93-5.77 2.475-8.25a4.5 4.5 0 0 1 1.005 0A16.4 16.4 0 0 1 15 11.25zm.57-7.912A18.2 18.2 0 0 0 7.5 11.25H3a9 9 0 0 1 6.592-7.912zM3.037 12.75h4.5c.079 2.76.784 5.466 2.063 7.913a9 9 0 0 1-6.562-7.913m11.37 7.913A18.2 18.2 0 0 0 16.5 12.75H21a9 9 0 0 1-6.592 7.913"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="wiki_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgWiki);
export default Memo;
