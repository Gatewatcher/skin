import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMalcoreRetroanalyzer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#malcore-retroanalyzer_svg__a)" fill="currentColor">
      <path d="M12 20.25c-2.7 0-5.325-1.35-6.9-3.75H9V15H3v6h1.5v-2.775c1.875 2.25 4.575 3.525 7.5 3.525zM15 7.5h3.9c-2.475-3.825-7.575-4.875-11.4-2.4A8.25 8.25 0 0 0 3.75 12h-1.5c0-5.4 4.35-9.75 9.75-9.75 2.925 0 5.625 1.275 7.5 3.525V3H21v6h-6z" />
      <path
        clipRule="evenodd"
        d="M16.151 18.75a2.999 2.999 0 0 0 5.198 0h1.901v-1.5h-1.5V15h1.5v-1.5h-1.594a3.001 3.001 0 0 0-5.811 0H14.25V15h1.5v2.25h-1.5v1.5zm4.099-1.5v-3a1.5 1.5 0 0 0-3 0v3.001a1.5 1.5 0 0 0 3-.001"
        fillRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="malcore-retroanalyzer_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgMalcoreRetroanalyzer);
export default Memo;
