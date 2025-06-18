import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 18v3h-15v-3H3v3l.006-.004A1.5 1.5 0 0 0 4.5 22.5h15A1.5 1.5 0 0 0 21 21v-3zM4.5 9l1.058 1.054 5.692-5.685V18h1.5V4.369l5.693 5.685L19.5 9 12 1.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgUpload);
export default Memo;
