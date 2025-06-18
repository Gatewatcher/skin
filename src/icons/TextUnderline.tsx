import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTextUnderline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 19.749H3v1.5h18zM12 17.499a5.25 5.25 0 0 1-5.25-5.25v-8.25h1.5v8.25a3.75 3.75 0 1 0 7.5 0v-8.25h1.5v8.25a5.25 5.25 0 0 1-5.25 5.25"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTextUnderline);
export default Memo;
