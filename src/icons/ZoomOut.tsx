import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgZoomOut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13.5 9H6v1.5h7.5z" fill="currentColor" />
    <path
      d="M16.586 15A8.14 8.14 0 0 0 18.5 9.75 8.25 8.25 0 1 0 10.25 18a8.14 8.14 0 0 0 5.25-1.914l5.69 5.664 1.06-1.06zm-6.336 1.5A6.75 6.75 0 1 1 17 9.75a6.76 6.76 0 0 1-6.75 6.75"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgZoomOut);
export default Memo;
