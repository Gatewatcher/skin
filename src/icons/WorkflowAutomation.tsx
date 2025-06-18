import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgWorkflowAutomation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#workflow-automation_svg__a)">
      <path d="M12 20.25c-2.7 0-5.325-1.35-6.9-3.75H9V15H3v6h1.5v-2.775c1.875 2.25 4.575 3.525 7.5 3.525z" />
      <path
        d="M23.25 17.25v-1.5h-1.575c-.075-.45-.3-.9-.525-1.35l1.125-1.125-1.05-1.05L20.1 13.35c-.375-.225-.825-.45-1.35-.525V11.25h-1.5v1.575c-.45.075-.9.3-1.35.525l-1.125-1.125-1.05 1.05L14.85 14.4c-.225.375-.45.825-.525 1.35H12.75v1.5h1.575c.075.45.3.9.525 1.35l-1.125 1.125 1.05 1.05L15.9 19.65c.375.225.825.45 1.35.525v1.575h1.5v-1.575c.45-.075.9-.3 1.35-.525l1.125 1.125 1.05-1.05L21.15 18.6c.225-.375.45-.825.525-1.35zM18 18.75c-1.275 0-2.25-.975-2.25-2.25s.975-2.25 2.25-2.25 2.25.975 2.25 2.25-.975 2.25-2.25 2.25"
        fill="currentColor"
      />
      <path d="M15 7.5h3.9c-2.475-3.825-7.575-4.875-11.4-2.4A8.25 8.25 0 0 0 3.75 12h-1.5c0-5.4 4.35-9.75 9.75-9.75 2.925 0 5.625 1.275 7.5 3.525V3H21v6h-6z" />
    </g>
    <defs>
      <clipPath id="workflow-automation_svg__a">
        <path d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgWorkflowAutomation);
export default Memo;
