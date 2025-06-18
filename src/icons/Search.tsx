import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m21.75 20.69-5.664-5.665a8.263 8.263 0 1 0-1.06 1.06l5.663 5.665zM3 9.75a6.75 6.75 0 1 1 6.75 6.75A6.757 6.757 0 0 1 3 9.75"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgSearch);
export default Memo;
