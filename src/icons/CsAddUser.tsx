import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsAddUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-add-user_svg__a)" fill="currentColor">
      <path d="M20.25 22.856h-1.5v-3.75a3.75 3.75 0 0 0-3.75-3.75h-4.5a3.75 3.75 0 0 0-3.75 3.75v3.75h-1.5v-3.75a5.25 5.25 0 0 1 5.25-5.25H15a5.25 5.25 0 0 1 5.25 5.25zM14.833 3.988a3.75 3.75 0 1 0 .953 5.32h1.73a5.24 5.24 0 0 1-2.757 2.649A5.25 5.25 0 1 1 17.515 4.9h-1.732a3.8 3.8 0 0 0-.95-.913" />
      <path d="M21.75 3.356h-1.5v3h-3v1.5h3v3h1.5v-3h3v-1.5h-3z" />
    </g>
    <defs>
      <clipPath id="cs-add-user_svg__a">
        <path d="M.75.356h24v24h-24z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsAddUser);
export default Memo;
