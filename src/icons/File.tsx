import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m19.275 6.975-5.25-5.25A.68.68 0 0 0 13.5 1.5H6A1.504 1.504 0 0 0 4.5 3v18A1.505 1.505 0 0 0 6 22.5h12a1.504 1.504 0 0 0 1.5-1.5V7.5a.68.68 0 0 0-.225-.525M13.5 3.3l4.2 4.2h-4.2zM18 21H6V3h6v4.5A1.505 1.505 0 0 0 13.5 9H18z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFile);
export default Memo;
