import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDb2Database = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#db2-database_svg__a)">
      <path
        d="M12 2.25c-3.973 0-8.25.939-8.25 3v13.5c0 2.061 4.277 3 8.25 3s8.25-.939 8.25-3V5.25c0-2.061-4.277-3-8.25-3m0 1.5c4.348 0 6.596 1.076 6.748 1.5-.152.424-2.4 1.5-6.748 1.5-4.381 0-6.63-1.092-6.75-1.487V5.26c.12-.418 2.369-1.51 6.75-1.51M5.25 7.07c1.596.801 4.232 1.18 6.75 1.18s5.154-.379 6.75-1.18v2.67c-.12.418-2.369 1.51-6.75 1.51-4.388 0-6.637-1.095-6.75-1.5zm0 4.5c1.596.801 4.232 1.18 6.75 1.18s5.154-.379 6.75-1.18v2.67c-.12.418-2.369 1.51-6.75 1.51-4.388 0-6.637-1.095-6.75-1.5zM12 20.25c-4.388 0-6.637-1.095-6.75-1.5v-2.68c1.596.801 4.232 1.18 6.75 1.18s5.154-.379 6.75-1.18v2.67c-.12.418-2.369 1.51-6.75 1.51"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="db2-database_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDb2Database);
export default Memo;
