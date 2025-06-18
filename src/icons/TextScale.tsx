import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTextScale = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 3.999v2.25h-6v13.5h-2.25v-13.5h-6v-2.25z"
      fill="currentColor"
    />
    <path d="M5.25 19.749v-9H1.5v-1.5h9v1.5H6.75v9z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgTextScale);
export default Memo;
