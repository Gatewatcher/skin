import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCloudExport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 61 34"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.366 25.426a7.733 7.733 0 0 0 7.158 7.71h43.765a9.087 9.087 0 0 0 .849-18.133 15.303 15.303 0 0 0-29.66-4.787 9.086 9.086 0 0 0-13.13 7.552 7.5 7.5 0 0 0-1.255-.104 7.733 7.733 0 0 0-7.727 7.762"
      fill="#407BFF"
    />
    <path
      clipRule="evenodd"
      d="M26.423 19.93H23.71l6.664-6.647 6.664 6.647h-2.713v6.78h-7.902z"
      fill="#fff"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgCloudExport);
export default Memo;
