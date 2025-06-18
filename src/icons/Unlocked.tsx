import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUnlocked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 10.5H9V6a3 3 0 1 1 6 0h1.5a4.5 4.5 0 1 0-9 0v4.5H6A1.5 1.5 0 0 0 4.5 12v9A1.5 1.5 0 0 0 6 22.5h12a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5M18 21H6v-9h12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgUnlocked);
export default Memo;
