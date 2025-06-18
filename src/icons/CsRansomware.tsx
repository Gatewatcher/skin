import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsRansomware = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-ransomware_svg__a)" fill="currentColor">
      <path d="M11.625 10.5h2.625V9h-1.5v-.75h-1.5v.788a1.875 1.875 0 0 0 .375 3.712h.75a.375.375 0 0 1 0 .75H9.75V15h1.5v.75h1.5v-.788a1.875 1.875 0 0 0-.375-3.712h-.75a.375.375 0 0 1 0-.75" />
      <path
        clipRule="evenodd"
        d="M9 3.702V1.5h1.5v1.667a6.8 6.8 0 0 1 3 0V1.5H15v2.202a6.77 6.77 0 0 1 3.543 4.383l3.62-.978.392 1.448-3.807 1.029.002.166v3.115l3.873.645-.246 1.48-3.628-.605a6.7 6.7 0 0 1-.616 2.688l3.397 3.397-1.06 1.06-3.14-3.139A6.74 6.74 0 0 1 12 21a6.74 6.74 0 0 1-5.33-2.609l-3.14 3.14-1.06-1.061 3.397-3.397a6.7 6.7 0 0 1-.616-2.688l-3.628.605-.246-1.48 3.873-.645V9.75q0-.085.002-.17L1.457 8.555l.39-1.448 3.61.975A6.77 6.77 0 0 1 9 3.702m8.25 6.048v4.5a5.25 5.25 0 1 1-10.5 0v-4.5a5.25 5.25 0 1 1 10.5 0"
        fillRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="cs-ransomware_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsRansomware);
export default Memo;
