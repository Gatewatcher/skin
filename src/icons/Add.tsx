import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.875 11.125V5h-1.75v6.125H5v1.75h6.125V19h1.75v-6.125H19v-1.75z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgAdd);
export default Memo;
