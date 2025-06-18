import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 10.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0-.003 3A1.5 1.5 0 0 0 7.5 6"
      fill="currentColor"
    />
    <path
      d="M12.483 22.06 1.939 11.518a1.5 1.5 0 0 1-.439-1.061V3A1.5 1.5 0 0 1 3 1.5h7.456a1.5 1.5 0 0 1 1.06.44l10.545 10.543a1.5 1.5 0 0 1 0 2.121l-7.457 7.457a1.5 1.5 0 0 1-2.121 0M3 3v7.456L13.543 21 21 13.543 10.456 3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTag);
export default Memo;
