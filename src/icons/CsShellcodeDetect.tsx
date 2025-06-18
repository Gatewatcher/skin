import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsShellcodeDetect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-shellcode-detect_svg__a)" fill="currentColor">
      <path
        clipRule="evenodd"
        d="M12.566 2.152a.75.75 0 0 0-1.132 0L9.75 4.091V13.5h-1.5v-2.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v2.25h-1.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h4.5V21c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75v-1.5h4.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-1.5v-2.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v2.25h-1.5V4.09zm.184 2.5L12 3.787l-.75.863V15h-4.5v-3h-1.5v3H3v3h5.25v2.25h7.5V18H21v-3h-2.25v-3h-1.5v3h-4.5z"
        fillRule="evenodd"
      />
      <path d="M13.5 17.25h-3v1.5h3zM6.75 9V5.25h-1.5V9zM6.75 3V1.5h-1.5V3zM18.75 3V1.5h-1.5V3zM18.75 9V5.25h-1.5V9z" />
    </g>
    <defs>
      <clipPath id="cs-shellcode-detect_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsShellcodeDetect);
export default Memo;
