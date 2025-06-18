import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFolder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m8.378 4.963 2.565 2.558.434.442H21v12H3v-15zm0-1.5H3a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 1.5 1.5h18a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5h-9L9.443 3.906a1.5 1.5 0 0 0-1.065-.443"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFolder);
export default Memo;
